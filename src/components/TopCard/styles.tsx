import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 0 30px;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

export const IconContainer = styled.View`
  justify-content: center;
  border-radius: 25px;
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  background: #fff;
`;

export const Text = styled.Text`
  font-size: 18px;
  font-family: 'Roboto_400Regular';
  color: #fff;
`;
