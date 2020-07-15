import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding-top: 30%;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 26px;
  font-family: 'Roboto_500Medium';
`;

export const Description = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Roboto_400Regular';
  text-align: center;
  margin: 5px 0;
`;

export const Amount = styled.Text`
  color: #70b683;
  font-size: 18px;
  font-family: 'Roboto_500Medium';
`;

export const Id = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Roboto_500Medium';
`;

export const Button = styled.TouchableOpacity`
  background: #fff;
  margin-top: 32px;
  padding: 16px 32px;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: 18px;
`;
