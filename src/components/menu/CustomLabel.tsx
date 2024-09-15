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
        isFocused && { backgroundColor: theme.colors.white },
      ]}>
      <Icon
        name={iconSource}
        size={isFocused ? 24 : 20} 
        color={isFocused ? theme.colors.red : theme.colors.white}
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
