import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { headerLeft, headerOptions } from '@constants/menuConstants';
import { AccountSettings } from '@components/profile/AccountSettings';
import { ViewProfile } from '@components/profile/ViewProfile';
import { ProfileScreen } from '@components/profile/ProfileScreen';

const Stack = createStackNavigator();

export const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={headerOptions}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: 'Settings',
          ...headerLeft,
        }}
      />
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{
          headerTitle: 'View Profile',
          ...headerLeft,
        }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          headerTitle: 'Account Settings',
          ...headerLeft,
        }}
      />
    </Stack.Navigator>
  );
};
