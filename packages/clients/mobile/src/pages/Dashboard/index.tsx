import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { FormHandles } from '@unform/core';
import { format, isSameMonth, setMonth } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import { LineChart } from 'react-native-chart-kit';
import { Form } from '@unform/mobile';

import { IDatePicker, IFormData, INotifications, IResponse, IFormatted } from './dtos';

import client from '../../services/client';
import options from '../../utils/getDatePickerOptions';

import Input from '../../components/Input';

import {
  Container,
  Header,
  HeaderTitle,
  Content,
  DatePickerContainer,
  DatePickerList,
  DatePicker,
  DatePickerText,
  ChartText,
  ChartContainer,
} from './styles';
import { addHours } from 'date-fns/esm';

const Dashboard: React.FC = () => {
  const [notificationsSummary, setNotificationsSummary] = useState<INotifications>();
  const [selectedDate, setSelectedDate] = useState<IDatePicker>();
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [hasErrors, setHasErrors] = useState(false);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (!selectedDate || !selectedLocation) {
      return;
    }

    const filter = {
      city_name: selectedLocation,
      interval: selectedDate.interval,
    }

    client.post<IResponse>('/notifications', filter)
      .then(response => {
        const { meta, notifications } = response.data;

        const notificationsParsed = {
          meta,
          notifications: notifications.map(({ date, ...rest }) => ({
            date: new Date(date),
            ...rest,
          }))
        }

        setHasErrors(false);
        setNotificationsSummary(notificationsParsed);
      })
      .catch(() => setHasErrors(true));
  }, [selectedLocation, selectedDate]);

  const handleSelectLocation = useCallback((data: IFormData) => {
    setSelectedLocation(data.city_name);
  }, [])

  const handleSelectDate = useCallback((date: IDatePicker) => {
    setSelectedDate(date);
  }, []);

  // TODO: fix date comparation from TZ server and application
  const notificationsFormatted = useMemo(() => {
    if (!notificationsSummary) {
      return null;
    }

    const { notifications } = notificationsSummary;

    let formatted: IFormatted[];

    if (notifications.length > 30) {
      const now = new Date();

      const dates = [
        ...new Set(
          notifications.map(({ date }) => now.setMonth(date.getMonth()))
        )
      ];

      console.log(JSON.stringify(dates.map(d => new Date(d))));

      let dateToAddHour: Date;

      formatted = dates.map(m => {
        dateToAddHour = addHours(m, 3);

        return {
          label: format(dateToAddHour, 'MMM', { locale }),
          value: notifications.reduce((acc, { date, notifications }) => (
            acc + (isSameMonth(date, dateToAddHour) ? notifications : 0)
          ), 0)
        }
      });
    } else {
      formatted = notifications.map(({ date, notifications }) => ({
        label: format(addHours(date, 3), 'dd/MMM', { locale }),
        value: notifications,
      }));
    }

    return formatted;
  }, [notificationsSummary]);

  const messageContent = useMemo(() => {
    if (hasErrors) {
      return 'Ocorreu algum erro com a consulta\nTente novamente';
    }

    if (notificationsSummary?.notifications.length === 0) {
      return 'Não há notificações no filtro usado';
    }

    if (!notificationsFormatted) {
      return 'Selecione uma cidade e um período\nde tempo acima para a consulta.';
    }
  }, [notificationsSummary, notificationsFormatted, hasErrors])

  const verticalLabelRotationDegree = useMemo(() => {
    if (!notificationsSummary) {
      return 0;
    }

    const { notifications } = notificationsSummary;

    const count = notifications.length;

    if (count > 7 && count < 30) {
      return 90;
    }

    return 0;
  }, [notificationsSummary])

  return (
    <Container>
      <Header>
        <HeaderTitle>Covid Tracker</HeaderTitle>
        <Form onSubmit={handleSelectLocation} ref={formRef}>
          <Input
            name="city_name"
            icon="map-pin"
            placeholder="Busque por uma localização"
            autoCorrect={false}
            autoCapitalize="words"
            keyboardType="default"
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
      </Header>

      <Content>
        <DatePickerContainer>
          <DatePickerList
            data={options}
            keyExtractor={(date) => date.dateFormatted}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <DatePicker
                onPress={() => handleSelectDate(item)}
                isSelected={item.dateFormatted === selectedDate?.dateFormatted}
                isLast={options.length - 1 === index}
              >
                <DatePickerText
                  isSelected={item.dateFormatted === selectedDate?.dateFormatted}
                >
                  {item.dateFormatted}
                </DatePickerText>
              </DatePicker>
            )}
          />
        </DatePickerContainer>

        {messageContent && (
          <ChartText isErrored={hasErrors}>
            {messageContent}
          </ChartText>
        )}

        {(notificationsFormatted && !messageContent) && (
          <ChartContainer>
            <LineChart
              data={{
                labels: notificationsFormatted.map(({ label }) => label),
                datasets: [
                  {
                    data: notificationsFormatted.map(({ value }) => value),
                  }
                ]
              }}
              width={Dimensions.get("window").width - 40} // from react-native
              height={250}
              yLabelsOffset={26}
              verticalLabelRotation={verticalLabelRotationDegree}
              chartConfig={{
                backgroundGradientFrom: "#f0f0f5",
                backgroundGradientTo: "#f0f0f5",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: () => `#b7b7cc`,
                labelColor: () => `#b7b7cc`,
                horizontalOffset: 100,
                propsForDots: {
                  r: 4,
                  strokeWidth: 1,
                }
              }}
              withVerticalLines={false}
              style={{
                borderRadius: 8,
                paddingBottom: 2 * verticalLabelRotationDegree,
              }}
            />
          </ChartContainer>
        )}
      </Content>

    </Container>
  );
};

export default Dashboard;
