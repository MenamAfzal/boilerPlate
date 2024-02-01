import { useTheme } from '@shopify/restyle';
import * as React from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { StyleSheet, TextInput as NTextInput } from 'react-native';
import { scale } from 'react-native-size-matters';

import type { Theme } from '@/theme';
import { Text, View } from '@/ui';

export interface NMultiInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
}

export const MultiTextField = React.forwardRef<TextInput, NMultiInputProps>(
  (props, ref) => {
    const { label, error, value, ...inputProps } = props;

    const theme = useTheme<Theme>();

    const [isFocussed, setIsFocussed] = React.useState(false);

    const onBlur = React.useCallback(() => setIsFocussed(false), []);
    const onFocus = React.useCallback(() => setIsFocussed(true), []);

    return (
      <View>
        {label && (
          <Text paddingVertical={'small'} variant="medium14" color={'black'}>
            {label}
          </Text>
        )}
        <View
          //flexDirection={"row"}
          //alignItems={"center"}
          borderRadius={scale(8)}
          height={scale(160)}
          paddingHorizontal={'medium'}
          borderColor={error ? 'error' : isFocussed ? 'black' : 'grey500'}
          borderWidth={1}
          backgroundColor={isFocussed ? 'white' : 'grey500'}
          paddingTop={'small'}
        >
          <NTextInput
            testID="STextInput"
            ref={ref}
            placeholderTextColor={theme.colors.grey300}
            onBlur={onBlur}
            onFocus={onFocus}
            {...inputProps}
            style={styles.input}
            textAlignVertical="top"
            multiline={true}
          />
          <View padding={'small'} alignSelf={'flex-end'}>
            <Text variant={'regular12'} color={'grey300'}>
              {`${value?.length ?? 0}/500`}
            </Text>
          </View>
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
    height: scale(160),
    flex: 1,
    //padding: scale(16),
    // borderRadius: scale(8),
    // paddingRight: scale(4),
    //backgroundColor: "red",
  },
});
