import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, Platform, StyleSheet, Animated } from 'react-native';

import { BottomCard, BodyCard } from './styles';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import DashboardHeader from '../../components/DashboardHeader';
import TopCard from '../../components/TopCard';
import BalanceCard from '../../components/BalanceCard';
import TransactionsList from '../../components/TransactionsList';

interface Transaction {
  id: string;
  from_id: string;
  to_id: string;
  value: number;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();

  const getTransactions = useCallback(async () => {
    api
      .get('/transactions')
      .then(response => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    getTransactions();
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getTransactions();
    setRefreshing(false);
  }, []);

  const scrollY = new Animated.Value(0);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <DashboardHeader user={user} />
      <TopCard />
      <BottomCard>
        <BodyCard>
          <BalanceCard refresh={refreshing} scrollY={scrollY} />
          <TransactionsList
            data={transactions}
            loading={loading}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            scrollY={scrollY}
          />
        </BodyCard>
      </BottomCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export default Dashboard;
