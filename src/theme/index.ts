import { DefaultTheme } from '@react-navigation/native';
import { createTheme } from '@shopify/restyle';
import { scale } from 'react-native-size-matters';

import { AppFonts } from '@/constants/fonts';

export const palette = {
  primary: '#01C96C',
  secondary: '#ECFDF5',
  tertiary: '#D0FBE6',
  backgroundLight: '#FFFFFF',
  black: '#0D0D26',
  white: '#FFFFFF',
  grey100: '#494A50',
  grey200: '#7A7C85',
  grey300: '#AFB0B6',
  grey400: '#CACBCE',
  grey500: '#F2F2F3',
  error: '#FE6D73',
  info: '#5386E4',
  warning: '#FFBC42',
  transparent: 'transparent',
};

export const theme = createTheme({
  navigation: {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: palette.primary,
    },
  },
  colors: {
    primary: palette.primary,
    secondary: palette.secondary,
    tertiary: palette.tertiary,
    background: palette.backgroundLight,
    black: palette.black,
    white: palette.white,
    grey100: palette.grey100,
    grey200: palette.grey200,
    grey300: palette.grey300,
    grey400: palette.grey400,
    grey500: palette.grey500,
    error: palette.error,
    info: palette.info,
    warning: palette.warning,
    transparent: 'transparent',
  },
  spacing: {
    tiny: scale(2),
    xSmall: scale(4),
    small: scale(8),
    medium: scale(12),
    large: scale(16),
    xLarge: scale(20),
    '2xl': scale(24),
    '3xl': scale(28),
    '4xl': scale(32),
  },

  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    // common
    primary: {
      color: 'textColor',
      fontSize: 10,
    },

    regular28: {
      fontSize: 28,
      fontFamily: AppFonts.APP_FONT_REGULAR,
    },
    regular24: {
      fontSize: 24,
      fontFamily: AppFonts.APP_FONT_REGULAR,
    },
    regular20: {
      fontSize: 20,
      fontFamily: AppFonts.APP_FONT_REGULAR,
    },
    regular17: {
      fontSize: 17,
      fontFamily: AppFonts.APP_FONT_REGULAR,
    },
    regular16: {
      fontSize: 16,
      fontFamily: AppFonts.APP_FONT_REGULAR,
    },
    regular14: {
      fontSize: 14,
      fontFamily: AppFonts.APP_FONT_REGULAR,
    },
    regular13: {
      fontSize: 13,
      fontFamily: AppFonts.APP_FONT_REGULAR,
    },
    regular12: {
      fontSize: 12,
      fontFamily: AppFonts.APP_FONT_REGULAR,
    },
    regular10: {
      fontSize: 10,
      fontFamily: AppFonts.APP_FONT_REGULAR,
    },
    medium28: {
      fontSize: 28,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
    },
    medium24: {
      fontSize: 24,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
    },
    medium20: {
      fontSize: 20,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
    },
    medium17: {
      fontSize: 17,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
    },
    medium16: {
      fontSize: 16,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
    },
    medium14: {
      fontSize: 14,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
    },
    medium13: {
      fontSize: 13,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
    },
    medium12: {
      fontSize: 12,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
    },
    medium10: {
      fontSize: 10,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
    },
    semiBold28: {
      fontSize: 28,
      fontFamily: AppFonts.APP_FONT_SEMI_BOLD,
    },
    semiBold24: {
      fontSize: 24,
      fontFamily: AppFonts.APP_FONT_SEMI_BOLD,
    },
    semiBold20: {
      fontSize: 20,
      fontFamily: AppFonts.APP_FONT_SEMI_BOLD,
    },
    semiBold17: {
      fontSize: 17,
      fontFamily: AppFonts.APP_FONT_SEMI_BOLD,
    },
    semiBold16: {
      fontSize: 16,
      fontFamily: AppFonts.APP_FONT_SEMI_BOLD,
    },
    semiBold14: {
      fontSize: 14,
      fontFamily: AppFonts.APP_FONT_SEMI_BOLD,
    },
    semiBold13: {
      fontSize: 13,
      fontFamily: AppFonts.APP_FONT_SEMI_BOLD,
    },
    semiBold12: {
      fontSize: 12,
      fontFamily: AppFonts.APP_FONT_SEMI_BOLD,
    },

    semiBold8: {
      fontSize: 8,
      fontFamily: AppFonts.APP_FONT_SEMI_BOLD,
    },

    heading: {
      fontSize: 16,
      fontFamily: AppFonts.APP_FONT_BOLD,
      color: 'black',
    },
    title: {
      fontSize: 14,
      fontFamily: AppFonts.APP_FONT_BOLD,
      color: 'textColor',
    },
    body: {
      fontSize: 12,
      fontFamily: AppFonts.APP_FONT_MEDIUM,
      color: 'textColor',
    },
  },
  buttonVariants: {
    defaults: {
      borderRadius: 'xSmall',
      height: scale(44),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'primary',
    },
    primary: {
      borderRadius: scale(4),
      height: scale(44),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'primary',
    },

    outline: {
      borderRadius: scale(4),
      height: scale(44),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'primary',
    },
    error: {
      borderRadius: scale(4),
      height: scale(44),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'error',
    },
  },

  inputVariants: {
    default: {
      borderRadius: 'tiny',
      backgroundColor: 'white',
      borderColor: 'borderColor',
      borderWidth: 1,
    },
    underline: {
      borderBottomWidth: 2,
      borderBottomColor: 'border',
    },
    none: {
      borderBottomWidth: 0,
    },
  },
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    primary: palette.primary,
    secondary: palette.secondary,
    tertiary: palette.tertiary,
    background: palette.backgroundLight,
    black: palette.black,
    white: palette.white,
    grey100: palette.grey100,
    grey200: palette.grey200,
    grey300: palette.grey300,
    grey400: palette.grey400,
    grey500: palette.grey500,
    error: palette.error,
    info: palette.info,
    warning: palette.info,
    transparent: 'transparent',
  },
};
