import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Image = styled.Image`
  align-self: center;
`;

export const LoginBox = styled.View`
  width: 100%;
  padding: 30px 30px;
  background-color: #f5f6fa;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  justify-content: flex-end;
`;

export const Text = styled.Text`
  color: #666;
  font-family: 'Roboto_500Medium';
  font-size: 16px;
  margin-bottom: 5px;
`;

export const LoginButton = styled(Button)``;

export const LoginButtonText = styled.Text``;

export const SignUpButton = styled.TouchableOpacity`
  padding: 25px 0;
  align-self: center;
`;

export const SignUpText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: 16px;
  color: #666;
`;
