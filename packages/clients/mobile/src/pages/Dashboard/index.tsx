import React, { useCallback, useMemo, useState } from 'react';
import { subDays, format, startOfMonth } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { startOfWeek } from 'date-fns/esm';
import {
  Container,
  Header,
  HeaderTitle,
  InputContainer,
  Input,
  Content,
  DatePickerContainer,
  DatePickerList,
  DatePicker,
  DatePickerText,
} from './styles';
import IDatePickerDTO from '../../dtos/IDatePickerDTO';

import firstCharToUppercase from '../../utils/firstCharToUppercase';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<IDatePickerDTO>(
    {
      timeInterval: {
        start: subDays(new Date(), 1),
        end: new Date(),
      },
      allTime: false,
      dateFormatted: firstCharToUppercase(format(subDays(new Date(), 1), 'iiii', { locale: ptBR })),
    },
  );

  const handleSelectDate = useCallback((date: IDatePickerDTO) => {
    setSelectedDate(date);

    console.log(date);
  }, [selectedDate]);

  const dateToSelect = useMemo(() => {
    const datesToSelect: IDatePickerDTO[] = [
      {
        timeInterval: {
          start: subDays(new Date(), 1),
          end: new Date(),
        },
        allTime: false,
        dateFormatted: firstCharToUppercase(format(subDays(new Date(), 1), 'iiii', { locale: ptBR })),
      },
      {
        timeInterval: {
          start: startOfWeek(new Date()),
          end: new Date(),
        },
        allTime: false,
        dateFormatted: 'Esta semana',
      },
      {
        timeInterval: {
          start: startOfMonth(new Date()),
          end: new Date(),
        },
        allTime: false,
        dateFormatted: firstCharToUppercase(format(new Date(), 'MMMM', { locale: ptBR })),
      },
      {
        allTime: true,
        dateFormatted: 'Todo tempo',
      },
    ];

    return datesToSelect;
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Covid Tracker</HeaderTitle>
        <InputContainer>
          <Input placeholder="Busque por uma localização" />
        </InputContainer>
      </Header>

      <Content>
        <DatePickerContainer>
          <DatePickerList
            data={dateToSelect}
            keyExtractor={(date) => date.dateFormatted}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <DatePicker
                onPress={() => handleSelectDate(item)}
                isSelected={item.dateFormatted === selectedDate.dateFormatted}
                isLast={dateToSelect.length - 1 === index}
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

    </Container>
  );
};

export default Dashboard;
