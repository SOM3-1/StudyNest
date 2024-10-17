import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from 'src/utils/theme';
import { menuStyles } from './menuStyles';

export const CustomTabLabel: React.FC<{
  label: string;
  isFocused: boolean;
  iconSource: string;
}> = ({ label, isFocused, iconSource }) => {
  return (
    <View
      style={[
        menuStyles.menuLabelContainer,
        isFocused && {  },
      ]}>
      <Icon
        name={iconSource}
        size={isFocused ? 26 : 26} 
        color={isFocused ? theme.colors.white : theme.colors.black}
      />
      {isFocused && (
        <Text
        style={menuStyles.menuLabelContainer}
          numberOfLines={1}
          ellipsizeMode="tail">
          {label}
        </Text>
      )}
    </View>
  );
};
