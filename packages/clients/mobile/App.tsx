import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="default" />
    <Routes />
  </NavigationContainer>
);

export default App;
