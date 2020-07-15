import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

interface ContainerProps {
  enabled: boolean;
}

export const Container = styled(LinearGradient).attrs({
  colors: ['#322E38', '#322E38'],
})<ContainerProps>`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  opacity: ${props => (props.enabled ? 1 : 0.85)};
`;

export const ButtonContainer = styled(RectButton)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto_500Medium';
  font-size: 18px;
  color: #fff;
`;
