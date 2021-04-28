import React, { SelectHTMLAttributes, useCallback, useEffect, useRef, useState } from  'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { SelectContainer } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<SelectProps> = ({
  name, icon: Icon, ...rest
}) => {
  const inputRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const {
    fieldName, registerField, defaultValue, error,
  } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);

  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value)
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <SelectContainer
      isFocused={isFocused}
      isFilled={isFilled}
      isErrored={!!error}
    >
      {Icon && <Icon size={20} />}

      <select
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </SelectContainer>
  )
}

export default Select;
