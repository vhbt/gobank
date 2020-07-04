import React from "react";
import { SafeAreaView } from "react-native";

import Input from "../../components/Input";

import logo from "../../assets/logo.png";

import { Container, Image, LoginBox, Text, LoginButton } from "./styles";

const SignIn: React.FC = () => {
  return (
    <SafeAreaView>
      <Container>
        <Image source={logo} />
        <LoginBox>
          <Text>Qual sua conta?</Text>
          <Input
            name="conta"
            keyboardType="numeric"
            maxLength={8}
            placeholder="Conta com dígito"
          />
          <LoginButton onPress={() => {}}>CONTINUAR</LoginButton>
        </LoginBox>
      </Container>
    </SafeAreaView>
  );
};

export default SignIn;
