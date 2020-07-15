import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Container, Button, Text, IconContainer } from './styles';

const TopCard: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <Button onPress={() => navigate('SendPayment')}>
        <IconContainer>
          <Ionicons
            name="ios-send"
            size={32}
            color="#322E38"
            style={{ alignSelf: 'center' }}
          />
        </IconContainer>
        <Text>Send</Text>
      </Button>
      <Button onPress={() => navigate('ReceivePayment')}>
        <IconContainer>
          <Ionicons
            name="ios-cash"
            size={32}
            color="#322E38"
            style={{ alignSelf: 'center' }}
          />
        </IconContainer>
        <Text>Receive</Text>
      </Button>
    </Container>
  );
};

export default TopCard;
