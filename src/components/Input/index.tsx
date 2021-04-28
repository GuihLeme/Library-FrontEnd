import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from  'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertOctagon } from 'react-icons/fi';
import { useField } from '@unform/core';

import { phoneMask } from './mask';

import { InputContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
  mask?: 'phone';
}

const Input: React.FC<InputProps> = ({
  name, mask, icon: Icon, ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const {
    fieldName, registerField, defaultValue, error,
  } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback((phoneNumber) => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value)
  }, []);

  const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if(mask === 'phone') {
      phoneMask(e)
    }
  },[mask])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer
      isFocused={isFocused}
      isFilled={isFilled}
      isErrored={!!error}
    >
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyUp={handleKeyUp}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error &&
        <Error title={error}>
          <FiAlertOctagon color="#e83f5b" size="20" />
        </Error>
      }
    </InputContainer>
  )
}

export default Input;
