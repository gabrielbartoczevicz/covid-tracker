import styled, { css } from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

interface IconProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #F0F0F5;
  border-radius: 8px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #93c572;
    `};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'Roboto-Regular';
  color: #b7b7cc;
  font-size: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  margin-right: 16px;
  color: #b7b7cc;
  ${({ isFocused, isFilled }) =>
    (isFocused || isFilled) &&
    css`
      color: #93c572;
    `}
`;
