import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Dashboard from '../pages/Dashboard';
import Hospitals from '../pages/Hospitals';

const App = createMaterialBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    initialRouteName="Dashboard"
    activeColor="#93c572"
    inactiveColor="#b7b7cc"
    barStyle={{ backgroundColor: '#ffffff' }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Hospitals" component={Hospitals} />
  </App.Navigator>
);

export default AppRoutes;
