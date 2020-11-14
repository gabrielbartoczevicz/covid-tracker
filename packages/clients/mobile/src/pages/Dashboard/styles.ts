import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit';

import { IDatePicker } from './dtos';

interface IDatePickerTextProps {
  isSelected: boolean;
}

interface IDatePickerProps {
  isSelected: boolean;
  isLast: boolean;
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

export const InputContainer = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #F0F0F5;
  border-radius: 8px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-family: 'Roboto-Regular';
  color: #b7b7cc;
  font-size: 16px;
`;

export const Content = styled.ScrollView`
  border: 1px crimson dashed;
`;

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

export const LoadingChartText = styled.Text`
  color: #b7b7cc;
  font-family: 'Poppins-Medium';
  font-size: 18px;
  text-align: center;
`;
