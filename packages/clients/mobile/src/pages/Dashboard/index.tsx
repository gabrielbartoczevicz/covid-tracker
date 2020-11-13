import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { format, formatISO } from 'date-fns';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import { IDatePicker, IFormData, INotifications, IResponse } from './dtos';

import client from '../../services/client';
import options from '../../utils/getDatePickerOptions';

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
import Input from '../../components/Input';


const Dashboard: React.FC = () => {
  const [notificationsSummary, setNotificationsSummary] = useState<INotifications>();
  const [selectedDate, setSelectedDate] = useState<IDatePicker>(options[0]);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: IFormData) => {
    const { city_name, state_name } = data;
    const { interval } = selectedDate;

    const dataToSubmit = {
      state_name,
      city_name,
      interval,
    }

    const schema = Yup.object().shape({
      city_name: Yup.string().required('Município obrigatório'),
      interval: Yup.object().shape({
        start: Yup.date().required('Data de início obrigatória'),
        end: Yup.date().required('Data de fim obrigatória'),
      })
    });

    try {
      await schema.validate(dataToSubmit, { abortEarly: true });

      const res = await client.post<IResponse>('/notifications', dataToSubmit);

      const { meta, notifications } = res.data;

      const notificationsParsed = {
        meta,
        notifications: notifications.map(({ date, ...rest }) => ({
          date: new Date(date),
          ...rest,
        }))
      }

      setNotificationsSummary(notificationsParsed);

      console.log(notificationsSummary);
    } catch (err) {
      Alert.alert('Erro', err);
    }

  }, [notificationsSummary])

  const handleSelectDate = useCallback((date: IDatePicker) => {
    setSelectedDate(date);
  }, [selectedDate]);

  const notificationsFormatted = useMemo(() => {
    if (!notificationsSummary) {
      return null;
    }

    const { notifications } = notificationsSummary;

    const data = notifications.map(({ date, notifications }) => ({
      label: format(date, 'dd MM'),
      values: notifications
    }));

    console.log(JSON.stringify(data));

    return data;
  }, [notificationsSummary])

  return (
    <Container>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Header>
          <HeaderTitle>Covid Tracker</HeaderTitle>
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
                  isSelected={item.dateFormatted === selectedDate.dateFormatted}
                  isLast={options.length - 1 === index}
                >
                  <DatePickerText
                    isSelected={item.dateFormatted === selectedDate.dateFormatted}
                  >
                    {item.dateFormatted}
                  </DatePickerText>
                </DatePicker>
              )}
            />
          </DatePickerContainer>
        </Content>
      </Form>
    </Container>
  );
};

export default Dashboard;
