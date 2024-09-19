import React, { useRef } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import useMenuStyles from './useMenuStyle';
import { TabNavigator } from './TabNavigator';
import { AppState } from '@ourtypes/AppState';
import { UserSelection } from '@components/user/UserSelection';

export const MenuWrapperComponent = () => {
  const styles = useMenuStyles();
  const navigationRef = useRef<ReturnType<typeof NavigationContainer.prototype.ref>>();

  const isLoggedIn = useSelector((state: AppState) => state.isLoggedIn);

  return (
    <View style={styles.safeArea}>
      <NavigationContainer ref={navigationRef}>
        {isLoggedIn ? <TabNavigator /> : <UserSelection />}
      </NavigationContainer>
    </View>
  );
};
