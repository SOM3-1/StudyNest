import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from 'src/utils/theme';

const CustomHeaderBackground = () => (
  <LinearGradient
  colors={[theme.colors.blue, theme.colors.grey]}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    style={{
      flex: 1,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    }}
  />
);

export default CustomHeaderBackground;
