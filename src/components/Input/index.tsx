import React, { InputHTMLAttributes, useRef, useEffect, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FunctionComponent<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name)

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!! inputRef.current?.value) // transformando em booleano
  }, [])

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, [])


  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      { Icon && <Icon size={ 20 } /> }
      <input
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      ref={inputRef}
      type="text" {...rest} />
      { error &&
      <Error title={error}>
        <FiAlertCircle size={20} color={'#c53030'} />
      </Error>}
    </Container>
  );
}

export default Input;
