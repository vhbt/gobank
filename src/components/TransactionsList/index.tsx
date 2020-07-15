import React from 'react';
import { View, ActivityIndicator, FlatList, Animated } from 'react-native';
import { parseISO, format } from 'date-fns';
import * as Animatable from 'react-native-animatable';

import { useAuth } from '../../hooks/auth';

import empty from '../../assets/empty.png';

import {
  Container,
  HeaderContainer,
  Title,
  TransactionEntry,
  Date,
  Week,
  Day,
  Month,
  Meta,
  Value,
  Description,
  Separator,
  EmptyImage,
  EmptyText,
} from './styles';

interface Transaction {
  id: string;
  from_id: string;
  to_id: string;
  value: number;
  created_at: string;
}

interface TransactionsData {
  data: Transaction[];
  loading: boolean;
  refreshing: boolean;
  scrollY: Animated.Value;
  onRefresh(): void;
}

const TransactionsList: React.FC<TransactionsData> = ({
  data,
  loading,
  refreshing,
  scrollY,
  onRefresh,
}) => {
  const { user } = useAuth();

  const LoadingElement: React.FC = () => {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const EmptyElement: React.FC = () => {
    return (
      <View>
        <EmptyImage source={empty} resizeMode="contain" />
        <EmptyText>Nothing to see here</EmptyText>
      </View>
    );
  };

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY,
          },
        },
      },
    ],
    { useNativeDriver: true },
  );

  const HeaderComponent = () => (
    <Title style={{ marginTop: 100, marginBottom: 10 }}>Transactions</Title>
  );

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  return (
    <Container>
      <AnimatedFlatList
        data={data}
        keyExtractor={(transaction: Transaction) => transaction.id}
        ListHeaderComponent={<HeaderComponent />}
        ListEmptyComponent={loading ? <LoadingElement /> : <EmptyElement />}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onScroll={animatedEvent}
        renderItem={({ item: transaction, index }) => {
          const dateParsed = parseISO(transaction.created_at);
          const weekDay = format(dateParsed, 'E');
          const day = format(dateParsed, 'dd');
          const month = format(dateParsed, 'LLL');

          const valueFormatted = Number(transaction.value / 100).toFixed(2);
          const transactionFromUser = transaction.from_id === user.id;

          return (
            <Animatable.View animation="bounceInUp">
              <TransactionEntry>
                <Date>
                  <Week>{weekDay}</Week>
                  <Day>{day}</Day>
                  <Month>{month}</Month>
                </Date>
                <Meta>
                  <Value transactionFromUser={transactionFromUser}>
                    {transactionFromUser ? '-' : '+'}
                    &#36;
                    {valueFormatted}
                  </Value>
                  <Description>
                    {transactionFromUser
                      ? `To: ${transaction.to_id}`
                      : `From: ${transaction.from_id}`}
                  </Description>
                </Meta>
              </TransactionEntry>
              {data.length - 1 - index ? <Separator /> : null}
            </Animatable.View>
          );
        }}
      />
    </Container>
  );
};

export default TransactionsList;
