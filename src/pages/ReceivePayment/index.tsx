import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Container, CenterView } from './styles';
import { useAuth } from '../../hooks/auth';
import GoBackHeader from '../../components/GoBackHeader';

const ReceivePayment: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();

  const qrContent = `gobank://payment/${user.id}`;

  useEffect(() => {
    setOpened(true);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBackHeader />
      <Container>
        <CenterView>
          {opened ? (
            <QRCode
              value={qrContent}
              color="#312e38"
              size={230}
              quietZone={5}
            />
          ) : null}
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'Roboto_500Medium',
              }}
            >
              {user.id}
            </Text>
          </View>
        </CenterView>
      </Container>
    </SafeAreaView>
  );
};

export default ReceivePayment;
