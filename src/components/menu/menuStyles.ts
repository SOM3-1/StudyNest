import {StyleSheet} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import { theme } from 'src/utils/theme';

const bottomPadding = initialWindowMetrics?.insets?.bottom
  ? initialWindowMetrics.insets.bottom / 3
  : 0;

export const menuStyles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    marginRight: 10,
  },
  linearGradient: {
    borderTopColor: theme.colors.blue,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 60 + bottomPadding,
    justifyContent: 'space-around',
    paddingBottom: bottomPadding,
    paddingHorizontal: 20,
  },
  menuContainer: {
    borderTopWidth: 1,
    paddingTop: 0,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabelContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.transparent,
    borderRadius: 18,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 5,
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
