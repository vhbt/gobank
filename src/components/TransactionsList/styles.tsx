import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 30px 0 30px;
`;

export const HeaderContainer = styled(Animated.View)`
  position: relative;
  top: 40px;
  bottom: 0px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Roboto_500Medium';
  /* margin-bottom: 15px;
  margin-top: 80px; */
`;

export const TransactionEntry = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 8px 5px;
`;

export const Date = styled.View`
  color: #333;
  align-items: center;
  margin-right: 15px;
`;

export const Week = styled.Text`
  color: #333;
  font-family: 'Roboto_400Regular';
  font-size: 16px;
`;

export const Day = styled.Text`
  color: #333;
  font-family: 'Roboto_500Medium';
  font-size: 24px;
`;

export const Month = styled.Text`
  color: #333;
  font-family: 'Roboto_400Regular';
  font-size: 16px;
`;

export const Meta = styled.View``;

export const Value = styled.Text<{ transactionFromUser: boolean }>`
  font-size: 18px;
  color: ${props => (props.transactionFromUser ? 'red' : 'green')};
`;

export const Description = styled.Text`
  color: #666;
`;

export const Separator = styled.View`
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
`;

export const EmptyImage = styled.Image`
  height: 200px;
  width: 200px;
  align-self: center;
`;

export const EmptyText = styled.Text`
  color: #999;
  font-size: 16px;
  font-family: 'Roboto_400Regular';
  align-self: center;
`;
