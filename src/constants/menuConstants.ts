
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import { theme } from 'src/utils/theme';
import { BackButton } from 'src/commom/BackButton';
import CustomHeaderBackground from 'src/commom/CustomHeaderBackground';

const headerTitlePosition = Platform.select({
  ios: {
    left: 0,
  },
  android: {
    left: -10,
  },
});

export const imageSize = 22;

export const headerLeftContainerStyle = {
  paddingBottom: 10,
} as const;

export const headerRightContainerStyle = {
  paddingBottom: 10,
  paddingRight: 10,
} as const;

interface HeaderOptions {
  headerShown: boolean;
  headerStyle: {
    backgroundColor: string;
  };
  headerTintColor: string;
  headerBackTitleVisible: boolean;
  headerTitleAlign: 'left' | 'center' | undefined;
  headerStatusBarHeight: number;
  headerTitleStyle: {
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    paddingBottom: number;
  };
  headerTitleContainerStyle: {
    left?: number;
  };
  headerLeftContainerStyle: {
    paddingBottom: number;
  };
  headerRightContainerStyle: {
    paddingBottom: number;
    paddingRight: number;
  };

  headerBackground: typeof CustomHeaderBackground;
}

export const headerOptions: HeaderOptions = {
  headerShown: true,
  headerStyle: {backgroundColor: theme.colors.secondary},
  headerTintColor: theme.colors.white,
  headerBackTitleVisible: false,
  headerTitleAlign: 'left',
  headerStatusBarHeight: DeviceInfo.hasDynamicIsland() ? 10 : 10,
  headerTitleStyle: {
    fontSize: (24),
    lineHeight: 24,
    paddingBottom: 10,
    fontFamily: ''
  },
  headerBackground: CustomHeaderBackground,
  headerTitleContainerStyle: {
    ...headerTitlePosition,
  },
  headerLeftContainerStyle: headerLeftContainerStyle,
  headerRightContainerStyle: headerRightContainerStyle,
};

export const headerShown = {
  headerShown: false,
};

export const headerLeft = {
  headerTitleContainerStyle: {
    left: 10,
  },
};
