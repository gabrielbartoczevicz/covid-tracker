import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, RectButton } from 'react-native-gesture-handler';

import { IDatePicker } from './dtos';
import { Dimensions } from 'react-native';

interface IDatePickerTextProps {
  isSelected: boolean;
}

interface IDatePickerProps {
  isSelected: boolean;
  isLast: boolean;
}

interface IChartTextProps {
  isErrored?: boolean;
}

interface IStatusCountTextProps {
  textColor: '#93c572' | '#cd5c5c' | '#fdb814';
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  ${Platform.OS === 'ios'
  && css`
    padding-top: ${getStatusBarHeight() + 24}px;
  `}
  background: #93c572;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 24px;
  color: #f3f3f3;
`;

export const Content = styled.ScrollView``;

export const DatePickerContainer = styled.View`
  height: 112px;
`;

export const DatePickerList = styled(
  FlatList as new () => FlatList<IDatePicker>,
)`
  padding: 32px 24px;
`;

export const DatePicker = styled(RectButton) <IDatePickerProps>`
  background: ${(props) => (props.isSelected ? '#93c572' : '#f0f0f5')};
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 8px 12px;
  margin-right: 16px;
  margin-right: ${(props) => ((props.isLast) ? 46 : 16)}px;
`;

export const DatePickerText = styled.Text<IDatePickerTextProps>`
  color: ${(props) => (props.isSelected ? '#ffffff' : '#b7b7cc')};
  font-family: 'Poppins-Medium';
  font-size: 18px;
`;

export const ChartText = styled.Text<IChartTextProps>`
  color: ${(props) => (props.isErrored) ? '#cd5c5c' : '#b7b7cc'};
  font-family: 'Roboto-Regular';
  font-size: 16px;
  text-align: center;
`;

export const ChartContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StatusListContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const StatusCount = styled.View`
  background-color: #f0f0f5;
  border-radius: 8px;
  margin: 8px 0;
  padding: 10px 12px;
  width: 200px;
`

export const StatusTextCount = styled.Text<IStatusCountTextProps>`
  color: ${({ textColor }) => textColor};
  text-align: center;
  font-family: 'Poppins-Medium';
  font-size: 18px;
`