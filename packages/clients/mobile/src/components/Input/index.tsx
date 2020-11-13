import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { TextInputProps, ViewStyle } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: ViewStyle;
}

interface InputValueReference {
  value: string;
}

interface InputReference {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputReference, InputProps> = (
  { name, containerStyle, icon, ...rest }, ref
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);
  
  return (
    <Container 
      style={containerStyle}
      isFocused={isFocused}
      isErrored={!!error}
    >
      <Icon 
        name={icon} 
        size={20} 
        isFilled={isFilled} 
        isFocused={isFocused}
      />
      
      <TextInput
        ref={inputElementRef}
        placeholderTextColor="#b7b7cc"
        defaultValue={defaultValue}
        onChangeText={val => {
          inputValueRef.current.value = val;
        }}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...rest}
      />
    </Container>
  );
}

export default forwardRef(Input);
