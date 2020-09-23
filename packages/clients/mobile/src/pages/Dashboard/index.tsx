import React, { useCallback, useMemo, useState } from 'react';
import { subDays, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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
      date: subDays(new Date(), 1),
      currentWeek: false,
      currentMonth: false,
      allTime: false,
      dateFormatted: firstCharToUppercase(format(subDays(new Date(), 1), 'dddd', { locale: ptBR })),
    },
  );

  const handleSelectDate = useCallback((date: IDatePickerDTO) => {
    setSelectedDate(date);
  }, [selectedDate]);

  const dateToSelect = useMemo(() => {
    const yesterday = subDays(new Date(), 1);

    const datesToSelect: IDatePickerDTO[] = [
      {
        date: yesterday,
        currentWeek: false,
        currentMonth: false,
        allTime: false,
        dateFormatted: firstCharToUppercase(format(yesterday, 'iiii', { locale: ptBR })),
      },
      {
        currentWeek: true,
        currentMonth: false,
        allTime: false,
        dateFormatted: 'Esta semana',
      },
      {
        currentWeek: false,
        currentMonth: true,
        allTime: false,
        dateFormatted: firstCharToUppercase(format(new Date(), 'MMMM', { locale: ptBR })),
      },
      {
        currentWeek: false,
        currentMonth: false,
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
