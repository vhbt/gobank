import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import SendPayment from '../pages/SendPayment';
import ReceivePayment from '../pages/ReceivePayment';
import SuccessPayment from '../pages/SuccessPayment';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />

    <App.Screen name="SendPayment" component={SendPayment} />
    <App.Screen name="ReceivePayment" component={ReceivePayment} />
    <App.Screen name="SuccessPayment" component={SuccessPayment} />
  </App.Navigator>
);

export default AppRoutes;
