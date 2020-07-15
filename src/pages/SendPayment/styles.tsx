import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
})`
  flex: 1;
  justify-content: flex-end;
`;

export const Card = styled.View`
  background: #f5f6fa;
  padding: 50px 30px 15px 30px;
  height: 90%;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

export const BalanceText = styled.Text`
  font-family: 'Roboto_400Regular';
  font-size: 16px;
`;
