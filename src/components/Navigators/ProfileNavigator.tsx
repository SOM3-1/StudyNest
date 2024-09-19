import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Home } from '@components/home/Home';
import { headerLeft, headerOptions, } from '@constants/menuConstants';
import { Profile } from '@components/profile/Profile';

export const ProfileNavigator: React.FC = () => {

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        ...headerOptions,
      }}>
      <Stack.Screen
        name="account"
        component={Profile}
        options={{
            ...headerOptions,
          headerTitle: 'Profile',
          ...headerLeft,
        }}
      />
    </Stack.Navigator>
  );
};
