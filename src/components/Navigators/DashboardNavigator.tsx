import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import { headerLeft, headerOptions, } from '@constants/menuConstants';
import { UserDashBoard } from '@components/dashboard/UserDashBoard';

export const DashboardNavigator: React.FC = () => {

  return (
    <Stack.Navigator
      initialRouteName="UserDashboard"
      screenOptions={{
        ...headerOptions,
      }}>
      <Stack.Screen
        name="dashboard"
        component={UserDashBoard}
        options={{
            ...headerOptions,
          headerTitle: 'Dashboard',
          ...headerLeft,
        }}
      />
    </Stack.Navigator>
  );
};
