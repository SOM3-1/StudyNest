import React, { useRef } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import useMenuStyles from './useMenuStyle';
import { TabNavigator } from './TabNavigator';
import { AppState } from '@ourtypes/AppState';
import { UserSelection } from '@components/user/UserSelection';
import { Notifications } from 'src/commom/notifications/Notifications';
import { trackScreenName } from 'src/analytics/trackScreenName';

export const MenuWrapperComponent = () => {
  const styles = useMenuStyles();

  const isLoggedIn = useSelector((state: AppState) => state.isLoggedIn);

  const navigationRef =
    useRef<ReturnType<typeof NavigationContainer.prototype.ref>>();
  const routeNameRef = useRef<string | undefined>();
  const logScreenView = async () => {
    if (navigationRef.current) {
      routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
      trackScreenName(routeNameRef.current);
    }
  };

  const stateChange = async () => {
    const previousRouteName = routeNameRef?.current;
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;
    if ((previousRouteName && currentRouteName) && previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
      trackScreenName(routeNameRef.current);
    }
  };

  return (
    <View style={styles.safeArea}>
      <NavigationContainer ref={navigationRef}
        onReady={logScreenView}
        onStateChange={stateChange}>
        {isLoggedIn ?<TabNavigator />: <UserSelection />}
      </NavigationContainer>
    </View>
  );
};
