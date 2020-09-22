import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

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
