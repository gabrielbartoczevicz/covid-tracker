import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { FormHandles } from '@unform/core';
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
} from './styles';

const Dashboard: React.FC = () => {
  const [notificationsSummary, setNotificationsSummary] = useState<INotifications>();
  const [selectedDate, setSelectedDate] = useState<IDatePicker>();
  const [selectedLocation, setSelectedLocation] = useState<string>();

  const formRef = useRef<FormHandles>(null);

  const handleSelectLocation = useCallback((data: IFormData) => {
    setSelectedLocation(data.city_name);
  }, [])

  const handleSelectDate = useCallback((date: IDatePicker) => {
    setSelectedDate(date);
  }, []);

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
      </Content>
    </Container>
  );
};

export default Dashboard;
