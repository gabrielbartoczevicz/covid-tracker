import React, { useCallback, useMemo, useState } from 'react';
import {
  VictoryAxis,
  VictoryChart, VictoryLine, VictoryTheme,
} from 'victory-native';

import { subDays, format, startOfMonth } from 'date-fns';
import { startOfWeek } from 'date-fns/esm';
import ptBR from 'date-fns/locale/pt-BR';

import { Dimensions } from 'react-native';
import IDatePickerDTO from '../../dtos/IDatePickerDTO';

import firstCharToUppercase from '../../utils/firstCharToUppercase';

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

      <Content style={{ maxHeight: 120 }}>
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

      <Content>
        <VictoryChart
          theme={VictoryTheme.material}
          width={Dimensions.get('screen').width}
        >
          <VictoryAxis tickCount={2} />
          <VictoryLine
            style={{
              data: {
                stroke: '#93c572',
              },
              parent: { border: '1px solid #ffffff' },
            }}
            data={[
              {
                x: 'Segunda',
                y: 0,
                label: 0,
              },
              {
                x: 'Terça',
                y: 100,
                label: 100,
              },
              {
                x: 'Quarta',
                y: 320,
                label: 320,
              },
              {
                x: 'Quinta',
                y: 290,
                label: 290,
              },
              {
                x: 'Sexta',
                y: 50,
                label: 50,
              },
              {
                x: 'Sábado',
                y: 300,
                label: 300,
              },
              {
                x: 'Domingo',
                y: 100,
                label: 100,
              },
            ]}
          />
        </VictoryChart>
      </Content>

    </Container>
  );
};

export default Dashboard;
