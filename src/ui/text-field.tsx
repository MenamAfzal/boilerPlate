import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import * as React from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { StyleSheet, TextInput as NTextInput } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import type { Theme } from '@/theme';
import { PressableScale, Text, View } from '@/ui';

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  isSecure?: boolean;
  icon?: React.ReactElement;
}

export const TextField = React.forwardRef<TextInput, NInputProps>(
  (props, ref) => {
    const { label, error, isSecure, icon, ...inputProps } = props;

    const theme = useTheme<Theme>();

    const [isFocussed, setIsFocussed] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(isSecure);

    const onBlur = React.useCallback(() => setIsFocussed(false), []);
    const onFocus = React.useCallback(() => setIsFocussed(true), []);

    const togglePassword = React.useCallback(
      () => setShowPassword(!showPassword),
      [showPassword]
    );

    return (
      <View>
        {label && (
          <Text paddingVertical={'small'} variant="medium14" color={'black'}>
            {label}
          </Text>
        )}
        <View
          flexDirection={'row'}
          alignItems={'center'}
          borderRadius={scale(8)}
          height={scale(49)}
          paddingHorizontal={'medium'}
          borderColor={error ? 'error' : isFocussed ? 'black' : 'grey500'}
          borderWidth={1}
          backgroundColor={isFocussed ? 'white' : 'grey500'}
        >
          <NTextInput
            testID="STextInput"
            ref={ref}
            placeholderTextColor={theme.colors.grey300}
            onBlur={onBlur}
            onFocus={onFocus}
            {...inputProps}
            style={styles.input}
            secureTextEntry={showPassword}
          />
          {isSecure ? (
            <PressableScale onPress={togglePassword}>
              <Image
                source={showPassword ? icons.eye : icons['eye-closed']}
                style={styles.icon}
                contentFit="contain"
              />
            </PressableScale>
          ) : null}
          {icon && icon}
        </View>
        {error && (
          <Text paddingTop={'small'} variant="regular14" color={'error'}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    height: scale(49),
    flex: 1,
    borderRadius: scale(8),
    paddingRight: scale(4),
  },
  icon: { height: 24, width: 24 },
});
