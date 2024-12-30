import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from 'src/utils/theme';
import { menuStyles } from './menuStyles';
import { CustomTabLabel } from './CustomLabel';

export const CustomTabBar: React.FC<{
  state: any;
  descriptors: any;
  navigation: any;
}> = ({state, descriptors, navigation}) => {


  const handleTabPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });
    if (!isFocused && !event.defaultPrevented) {
     
        navigation.navigate(route.name);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.blue, theme.colors.grey]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={menuStyles.linearGradient}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const iconSource = options?.title || route.name;
        const label = (options?.headerTitle || options?.title || route.name)
        .charAt(0).toUpperCase() + (options?.headerTitle || options?.title || route.name).slice(1).toLowerCase();
      
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={index}
            style={menuStyles.tabButton}
            accessible={true}
            accessibilityLabel={label}
            onPress={() => handleTabPress(route, isFocused)}>
            <CustomTabLabel
              label={label}
              isFocused={isFocused}
              iconSource={iconSource}
            />
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};
