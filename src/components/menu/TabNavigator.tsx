/* eslint-disable no-undef */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import { CustomTabBar } from './CustomTabBar';
import { theme } from 'src/utils/theme';
import { menuStyles } from './menuStyles';
import { HomeNavigator } from '@components/navigators/HomeNavigator';
import { ProfileNavigator } from '@components/navigators/ProfileNavigator';
import { DashboardNavigator } from '@components/navigators/DashboardNavigator';

const Tab = createBottomTabNavigator();

const tabHeaderOptions = {headerShown: false};

export const TabNavigator = () => {
  const tabPressListener = ({navigation, route}) => ({
    tabPress: () => {navigation.navigate(route.name);
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="HomeScreenNavigator"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => {
        return {
          tabBarActiveTintColor: undefined,
          tabBarLabelStyle: {
            fontSize: (theme.fontSize.default),
            fontWeight: theme.fontWeight.normal,
          },
          tabBarStyle: menuStyles.menuContainer,
          ...tabHeaderOptions,
        };
      }}>
      <Tab.Screen
        name="HomeScreenNavigator"
        component={HomeNavigator}
        options={{title: 'home', headerTitle: 'Home'}}
        listeners={tabPressListener}
      />

      <Tab.Screen
        name="DashboardNavigator"
        component={DashboardNavigator}
        options={{title: 'dashboard', headerTitle: 'Dashboard'}}
        listeners={tabPressListener}
      />

      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{title: 'person', headerTitle: 'Settings'}}
        listeners={tabPressListener}
      />
    </Tab.Navigator>
  );
};
