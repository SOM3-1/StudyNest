/* eslint-disable no-undef */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import { CustomTabBar } from './CustomTabBar';
import { theme } from 'src/utils/theme';
import { menuStyles } from './menuStyles';
import { HomeNavigator } from '@components/Navigators/HomeNavigator';
import { ProfileNavigator } from '@components/Navigators/ProfileNavigator';

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
        name="HomeNavigator2"
        component={HomeNavigator}
        options={{title: 'dashboard', headerTitle: 'Dashboard'}}
        listeners={tabPressListener}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{title: 'person', headerTitle: 'Account'}}
        listeners={tabPressListener}
      />
    </Tab.Navigator>
  );
};
