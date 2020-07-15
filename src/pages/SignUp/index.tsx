import React, { useState, useCallback } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../../components/Input';
import logo from '../../assets/logo.png';

import api from '../../services/api';

import {
  Container,
  Image,
  LoginBox,
  Text,
  LoginButton,
  SignUpButton,
  SignUpText,
} from './styles';

interface SignUpFormData {
  full_name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      setLoading(true);
      await api.post('/users', {
        full_name: data.full_name,
        email: data.email,
        password: data.email,
      });

      Alert.alert('All good!', 'You can now log in with your credentials.');
      navigate('SignIn');
    } catch (error) {
      if (error.response?.data) {
        Alert.alert(
          'Oopss...',
          error.response.data.message || 'Something went wrong.',
        );
      }
    }
    setLoading(false);
  }, []);

  const validationSchema = Yup.object({
    full_name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirm_passowrd: Yup.string()
      .required()
      .oneOf([Yup.ref('password')]),
  });

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1, justifyContent: 'flex-end' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}
        bounces={false}
      >
        <Container>
          <Image source={logo} />
          <Formik
            initialValues={{
              full_name: '',
              email: '',
              password: '',
              confirm_passowrd: '',
            }}
            onSubmit={values => handleSignUp(values)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              isValid,
              handleBlur,
            }) => (
              <LoginBox>
                <Text>Tell us more about you...</Text>
                <Input
                  returnKeyType="next"
                  placeholder="Full Name"
                  onChangeText={handleChange('full_name')}
                  onBlur={handleBlur('full_name')}
                  value={values.full_name}
                  error={errors.full_name}
                />
                <Input
                  keyboardType="email-address"
                  returnKeyType="next"
                  placeholder="E-mail"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={errors.email}
                />
                <Input
                  secureTextEntry
                  returnKeyType="next"
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={errors.password}
                />
                <Input
                  secureTextEntry
                  returnKeyType="done"
                  placeholder="Confirm password"
                  onChangeText={handleChange('confirm_passowrd')}
                  onBlur={handleBlur('confirm_passowrd')}
                  value={values.confirm_passowrd}
                  error={errors.confirm_passowrd}
                />
                <LoginButton
                  enabled={isValid}
                  loading={loading}
                  onPress={() => handleSubmit()}
                >
                  FINISH
                </LoginButton>
                <SignUpButton onPress={() => navigate('SignIn')}>
                  <SignUpText>Go back to the login screen</SignUpText>
                </SignUpButton>
              </LoginBox>
            )}
          </Formik>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
