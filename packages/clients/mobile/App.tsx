import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

import { Container } from './src/styles/global';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />
      <Container>
        <Routes />
      </Container>
    </NavigationContainer>
  );
};

export default App;
