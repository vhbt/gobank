import React from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonContainer, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  enabled?: boolean;
  loading?: boolean;
  children: string;
  containerStyle?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  enabled = true,
  loading = false,
  containerStyle,
  children,
  ...rest
}) => {
  return (
    <Container enabled={enabled} style={{ ...containerStyle }}>
      <ButtonContainer {...rest} enabled={enabled}>
        {!loading ? (
          <ButtonText>{children}</ButtonText>
        ) : (
          <ActivityIndicator color="#fff" size="large" />
        )}
      </ButtonContainer>
    </Container>
  );
};

export default Button;
