import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import useMenuStyles from './useMenuStyle';
import { TabNavigator } from './TabNavigator';
import { AppState } from '@ourtypes/AppState';
import { UserSelection } from '@components/user/UserSelection';
import { trackScreenName } from 'src/analytics/trackScreenName';
import { initializeSessions, initializeUsers } from '@store/appSlice';

import NetInfo from '@react-native-community/netinfo';
import { setNetworkStatus } from '@store/appSlice';

export const MenuWrapperComponent = () => {
  const styles = useMenuStyles();

  const isLoggedIn = useSelector((state: AppState) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigationRef =
    useRef<ReturnType<typeof NavigationContainer.prototype.ref>>();
  const routeNameRef = useRef<string | undefined>();
  const logScreenView = async () => {
    if (navigationRef.current) {
      routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
      trackScreenName(routeNameRef.current);
    }
  };
  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeSessions());
  }, [dispatch]);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus({ isConnected: state.isConnected ?? false }));
    });

    return () => unsubscribe();
  }, [dispatch]);

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
        {isLoggedIn ? <TabNavigator /> : <UserSelection />}
      </NavigationContainer>
    </View>
  );
};
