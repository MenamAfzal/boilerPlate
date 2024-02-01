import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import { scale } from 'react-native-size-matters';

import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import { AppFonts } from '@/constants/fonts';
import type { Theme } from '@/theme';
import { View } from '@/ui';

type SearchFieldProps = {
  icon?: IconTypes;
  showBorder?: boolean;
} & TextInputProps;

export const SearchField = ({
  icon,
  showBorder,
  ...rest
}: SearchFieldProps) => {
  const { colors } = useTheme<Theme>();

  return (
    <View
      flexDirection={'row'}
      alignItems={'center'}
      paddingHorizontal={'small'}
      borderRadius={scale(8)}
      backgroundColor={'white'}
      borderWidth={showBorder ? 1 : 0}
      borderColor={'grey300'}
    >
      <Image
        source={icon ?? icons.search}
        style={styles.icon}
        contentFit="contain"
      />
      <TextInput
        placeholderTextColor={colors.grey300}
        style={[styles.input, { color: colors.black }]}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: scale(40),
    marginHorizontal: scale(4),
    flex: 1,
    fontSize: 12,
    fontFamily: AppFonts.APP_FONT_REGULAR,
  },
  icon: {
    height: scale(16),
    width: scale(16),
  },
});
