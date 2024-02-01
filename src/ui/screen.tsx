/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import type { StatusBarProps } from 'react-native';
import { StatusBar } from 'react-native';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Theme } from '@/theme';
import { View } from '@/ui';

export const FocusAwareStatusBar = ({
  barStyle = 'dark-content',
  ...props
}: StatusBarProps) => {
  const isFocused = useIsFocused();

  // render
  return isFocused ? <StatusBar barStyle={barStyle} {...props} /> : null;
};

type Props = {
  children: React.ReactNode;
  statusBarColor?: StatusBarProps['backgroundColor'];
  barStyle?: StatusBarProps['barStyle'];
  translucent?: StatusBarProps['translucent'];
  backgroundColor?: string;
} & SafeAreaViewProps;

export const Screen = ({
  children,
  statusBarColor = '#FFFFFF',
  barStyle = 'dark-content',
  translucent = false,
  backgroundColor = 'background',
  ...rest
}: Props) => {
  let theme = useTheme<Theme>();

  const bgColor = backgroundColor ?? theme?.colors.background;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }} {...rest}>
      <FocusAwareStatusBar
        backgroundColor={statusBarColor}
        barStyle={barStyle}
        translucent={translucent}
      />
      <View flex={1} backgroundColor="background">
        {children}
      </View>
    </SafeAreaView>
  );
};
