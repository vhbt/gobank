import React, { forwardRef } from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  error?: string | undefined;
  extra?: React.ElementType;
}

const Input: React.FC<InputProps> = (
  { error = '', extra: Extra, ...rest },
  ref,
) => {
  return (
    <Container hasExtra={!!Extra} error={error}>
      <TextInput hasExtra={!!Extra} {...rest} ref={ref} />
      {Extra ? <Extra /> : null}
    </Container>
  );
};

export default forwardRef(Input);
