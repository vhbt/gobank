import React, { useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent, AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';

import AppProvider from './hooks';
import Routes from './routes';

import logo from './assets/logo.png';

function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium });

  Asset.fromModule(logo).downloadAsync();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
