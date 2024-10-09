import {Dimensions, PixelRatio} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const theme = {
  colors: {
    primary: '#96ca4e',
    secondary: '#00402e',
    white: '#fff',
    black: '#000',
    transparent: 'transparent',
    grey: '#6d6d6d',
    smokyGrey: '#4a4a4a',
    lightGrey: '#e8e8e8',
    darkGrey: '#333333',
    darkGreen: '#004E42',
    lightGreen: '#97CA3D',
    offWhite: '#F1F1F1',
    paleGreen: '#484D4C',
    paleGrey: '#CCCCCC',
    shadowColor: 'rgba(0, 0, 0, 0.20)',
    tealGrey: '#808285',
    borderGrey: '#D9D9D9',
    smokyRed: '#B3261E1A',
    red: '#B3261E',
    modalBackground: '#00000099',
    disabled: '#AAAAAA',
    forestGreen: '#417C3D',
    blue: '#0059A7',
    green: '#00703C',
    bgBlue: '#83d2f3',
    lightBlue: '#caedfa',
    accent: '#FF4081'
  },
  fontWeight: {
    bold: 'bold',
    normal: 'normal',
    '900': '900',
    '800': '800',
    '700': '700',
    '600': '600',
    '500': '500',
    '400': '400',
  },
  borderBottom: {
    thin: 3,
    thick: 5,
    noBorder: 0,
  },
  fontSize: {
    default: 12,
    large: 14,
  },
  marginValues: {
    max: 60,
    min: 0,
  },
} as const;
