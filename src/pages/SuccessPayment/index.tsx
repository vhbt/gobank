import React from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {
  Container,
  ContentContainer,
  Title,
  Description,
  Amount,
  Id,
  Button,
  ButtonText,
} from './styles';

import success from '../../assets/success.json';

interface RouteParams {
  amount: number;
  id: string;
}

const SuccessPayment: React.FC = () => {
  const { amount, id } = useRoute().params as RouteParams;
  const { reset } = useNavigation();

  const amountFormatted = Number(amount / 100).toFixed(2);

  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  return (
    <Container>
      <ContentContainer>
        <LottieView source={success} autoPlay loop={false} autoSize />
        <Title>Payment Sent</Title>
        <Description>
          You sent <Amount>${amountFormatted}</Amount> to <Id>{id}</Id>
        </Description>
        <Animatable.View animation={fadeIn}>
          <Button
            onPress={() => reset({ routes: [{ name: 'Dashboard' }], index: 0 })}
          >
            <ButtonText>Go Back</ButtonText>
          </Button>
        </Animatable.View>
      </ContentContainer>
    </Container>
  );
};

export default SuccessPayment;
