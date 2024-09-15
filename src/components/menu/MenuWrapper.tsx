import {NavigationContainer} from '@react-navigation/native';
import React,  {useRef} from 'react';
import {View} from 'react-native';
import useMenuStyles from './useMenuStyle';
import { TabNavigator } from './TabNavigator';

export const MenuWrapperComponent = () => {
  const styles = useMenuStyles();

  const navigationRef =
    useRef<ReturnType<typeof NavigationContainer.prototype.ref>>();


  return (
    <View style={styles.safeArea}>
      <NavigationContainer
        ref={navigationRef}>
        <TabNavigator />
      </NavigationContainer>
    </View>
  );
};
