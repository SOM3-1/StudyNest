import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from 'src/utils/theme';

interface CustomTextInputProps extends TextInputProps {
}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  return (
    <TextInput
      {...props} 
      placeholderTextColor={props.placeholderTextColor || theme.colors.grey}
      style={props.style} 
    />
  );
};

export default CustomTextInput;
