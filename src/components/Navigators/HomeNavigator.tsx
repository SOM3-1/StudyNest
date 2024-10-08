import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Home } from '@components/home/Home';
import { headerLeft, headerOptions } from '@constants/menuConstants';

export const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...headerOptions,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
            ...headerOptions,
          headerTitle: 'Home',
          ...headerLeft,
        }}
      />
    </Stack.Navigator>
  );
};
