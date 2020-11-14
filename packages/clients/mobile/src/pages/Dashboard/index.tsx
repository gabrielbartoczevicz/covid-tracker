import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { FormHandles } from '@unform/core';
import { format } from 'date-fns';
import { LineChart } from 'react-native-chart-kit';
import { Form } from '@unform/mobile';

import { IDatePicker, IFormData, INotifications, IResponse } from './dtos';

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
  LoadingChartText,
} from './styles';

const Dashboard: React.FC = () => {
  const [notificationsSummary, setNotificationsSummary] = useState<INotifications>();
  const [selectedDate, setSelectedDate] = useState<IDatePicker>();
  const [selectedLocation, setSelectedLocation] = useState<string>();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    console.log(JSON.stringify({ selectedDate, selectedLocation }));

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

        setNotificationsSummary(notificationsParsed);

        console.log(JSON.stringify(notificationsSummary));
      })
      .catch(err => {
        Alert.alert('Erro', err);
      })
  }, [selectedLocation, selectedDate]);

  const handleSelectLocation = useCallback((data: IFormData) => {
    setSelectedLocation(data.city_name);
  }, [])

  const handleSelectDate = useCallback((date: IDatePicker) => {
    setSelectedDate(date);
  }, []);

  const notificationsFormatted = useMemo(() => {
    if (!notificationsSummary) {
      return null;
    }

    const { notifications } = notificationsSummary;

    return notifications.map(({ date, notifications }) => ({
      labels: format(date, 'dd/MM'),
      notifications,
    }));
  }, [notificationsSummary]);

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

        {!notificationsFormatted && (
          <LoadingChartText>
            Selecione uma cidade e um período{'\n'}de tempo acima para a consulta.
          </LoadingChartText>
        )}

        {notificationsFormatted && (
          <LineChart
            data={{
              labels: notificationsFormatted.map(({ labels }) => labels),
              datasets: [
                {
                  data: notificationsFormatted.map(({ notifications }) => notifications),
                }
              ]
            }}
            width={Dimensions.get("window").width - 18} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: "#93c572",
              backgroundGradientTo: "#93c572",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 8
              },
              propsForDots: {
                r: 4,
                strokeWidth: 1,
                stroke: "#9bcf79"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              marginHorizontal: 8,
              borderRadius: 16
            }}
          />
        )}
      </Content>

    </Container>
  );
};

export default Dashboard;
