import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";

import { Container, ButtonContainer, ButtonText } from "./styles";

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container>
      <ButtonContainer {...rest}>
        <ButtonText>{children}</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default Button;
