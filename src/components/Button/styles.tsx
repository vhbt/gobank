import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient).attrs({
  colors: ["#F78707", "#FE5F0C"],
})`
  width: 100%;
  height: 60px;
  border-radius: 4px;
`;

export const ButtonContainer = styled(RectButton)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: "Roboto_500Medium";
  font-size: 18px;
  color: #fff;
`;
