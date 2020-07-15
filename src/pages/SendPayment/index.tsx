import React, { useState, useCallback, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Container, Card, BalanceText } from './styles';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';
import GoBackHeader from '../../components/GoBackHeader';

interface SendPaymentData {
  id: string;
  amount: string;
}

const SendPayment: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const formikRef = useRef() as any;

  const { navigate } = useNavigation();
  const { user } = useAuth();

  const userBalanceFormated = user.balance / 100;

  const validationSchema = Yup.object({
    id: Yup.string().required(),
    amount: Yup.number()
      .required()
      .test(
        'balance',
        'amount must be less or equal than balance',
        value => value <= userBalanceFormated,
      ),
  });

  const askForCameraPermission = useCallback(async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    return status === 'granted';
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
    if (data.startsWith('gobank://payment/')) {
      const id = data.replace('gobank://payment/', '');
      if (formikRef.current) {
        formikRef.current.setFieldValue('id', id);
      }
      setOpenCamera(false);
    }
  };

  const cameraIdElement: React.FC = () => (
    <TouchableOpacity onPress={handleScanId}>
      <Ionicons name="ios-camera" color="#312e38" size={32} />
    </TouchableOpacity>
  );

  const handleScanId = () => {
    if (hasPermission) {
      setOpenCamera(true);
      Keyboard.dismiss();
    } else {
      askForCameraPermission().then(granted => {
        if (granted) {
          setOpenCamera(true);
          Keyboard.dismiss();
        } else {
          Alert.alert(
            'Oopss...',
            "Looks like you didn't allow our app to use your camera. If you want, you can change that in your OS settings.",
          );
        }
      });
    }
  };

  const sendPayment = useCallback(async (data: SendPaymentData) => {
    setLoading(true);

    try {
      let amountFormated: number;

      if (data.amount.includes('.')) {
        const amountFixed = Number(data.amount).toFixed(2).replace('.', '');
        amountFormated = Number(amountFixed);
      } else {
        amountFormated = Number(data.amount) * 100;
      }

      await api.post('/transactions', {
        to_id: data.id,
        value: amountFormated,
      });

      navigate('SuccessPayment', {
        id: data.id,
        amount: amountFormated,
      });
    } catch (error) {
      Alert.alert(
        'Oopss...',
        error.response.data.message || 'Something went wrong.',
      );
    }
    setLoading(false);
  }, []);

  const handleSend = (data: SendPaymentData) => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to send $${data.amount} to ${data.id}?`,
      [
        { text: 'Yes', onPress: () => sendPayment(data) },
        { text: 'No', style: 'cancel' },
      ],
    );
  };

  return (
    <>
      {openCamera ? (
        <SafeAreaView
          style={{
            flex: 1,
            zIndex: 2,
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
        >
          <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={handleBarCodeScanned}
          />

          <TouchableOpacity
            style={{
              marginLeft: 15,
              marginTop: 10,
              paddingVertical: 15,
              paddingHorizontal: 20,
              width: 140,
              borderRadius: 24,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#312e38',
            }}
            onPress={() => setOpenCamera(false)}
          >
            <Ionicons name="ios-arrow-back" color="#fff" size={24} />

            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto_500Medium',
                fontSize: 24,
                marginLeft: 15,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : null}
      <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 40 : 0 }}>
        <GoBackHeader />
        <Container>
          <Formik
            initialValues={{ id: '', amount: '' }}
            onSubmit={handleSend}
            validationSchema={validationSchema}
            innerRef={formikRef}
          >
            {({ handleChange, handleSubmit, values, errors }) => {
              return (
                <Card>
                  <Text
                    style={{
                      fontFamily: 'Roboto_500Medium',
                      fontSize: 32,
                      marginBottom: 30,
                    }}
                  >
                    Send Payment
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="User ID"
                      onChangeText={handleChange('id')}
                      value={values.id}
                      error={errors.id}
                      extra={cameraIdElement}
                    />
                  </View>
                  <View>
                    <Input
                      placeholder="Amount"
                      keyboardType="numbers-and-punctuation"
                      onChangeText={handleChange('amount')}
                      value={values.amount}
                      error={errors.amount}
                    />
                  </View>
                  <View>
                    <BalanceText>
                      Available: ${userBalanceFormated.toFixed(2)}
                    </BalanceText>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Button onPress={() => handleSubmit()} loading={loading}>
                      Send
                    </Button>
                  </View>
                </Card>
              );
            }}
          </Formik>
        </Container>
      </View>
    </>
  );
};

export default SendPayment;
