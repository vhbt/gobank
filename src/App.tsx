import { StatusBar } from "expo-status-bar";
import React from "react";
import { registerRootComponent, AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

import Routes from "./routes";

function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Routes />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
