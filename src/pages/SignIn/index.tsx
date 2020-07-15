import React, { useCallback, useState } from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../../components/Input';
import logo from '../../assets/logo.png';

import {
  Container,
  Image,
  LoginBox,
  Text,
  LoginButton,
  SignUpButton,
  SignUpText,
} from './styles';

import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);
      await signIn({
        email: data.email,
        password: data.password,
      }).catch(() => setLoading(false));
    },
    [signIn],
  );

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1, justifyContent: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container>
        <Image source={logo} />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => handleSignIn(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <LoginBox>
              <Text>What is your e-mail?</Text>
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={handleChange('email')}
                value={values.email}
                error={errors.email}
              />
              <Text>What is your password?</Text>
              <Input
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                returnKeyType="done"
                onChangeText={handleChange('password')}
                value={values.password}
                error={errors.password}
              />
              <LoginButton
                loading={loading}
                onPress={() => handleSubmit()}
                enabled={isValid}
              >
                CONTINUE
              </LoginButton>
              <SignUpButton onPress={() => navigation.navigate('SignUp')}>
                <SignUpText>Not registered already?</SignUpText>
              </SignUpButton>
            </LoginBox>
          )}
        </Formik>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
