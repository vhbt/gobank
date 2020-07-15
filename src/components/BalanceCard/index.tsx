import React, { useState, useEffect, useCallback } from 'react';
import { View, Animated } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { Container, Title, Balance } from './styles';

interface BalanceCardProps {
  refresh?: boolean;
  scrollY: Animated.Value;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ refresh, scrollY }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const balanceFormatted = Number(balance / 100).toFixed(2);

  const { updateBalance } = useAuth();

  const getBalance = useCallback(async () => {
    api
      .get('/profile/balance')
      .then(response => {
        setBalance(response.data.balance);
        updateBalance(response.data.balance);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    if (refresh) {
      getBalance();
    }
  }, [refresh]);

  return (
    <Container>
      <Animated.View
        style={{
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 350],
                outputRange: [50, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
        }}
      >
        <Title>Balance</Title>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Balance>
              &#36;
              {balanceFormatted}
            </Balance>
          </View>
        </View>
      </Animated.View>
    </Container>
  );
};

export default BalanceCard;
