import type {
  BackgroundColorProps,
  BorderProps,
  SpacingProps,
  VariantProps,
} from '@shopify/restyle';
import {
  backgroundColor,
  border,
  composeRestyleFunctions,
  createRestyleComponent,
  createVariant,
  spacing,
  useRestyle,
} from '@shopify/restyle';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import type { Theme } from '@/theme';

import { PressableScale } from './moti-pressable';
import type { TextProps } from './text';
import { Text } from './text';
import { View } from './view';

const buttonVariant = createVariant({ themeKey: 'buttonVariants' });

const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof View>,
  Theme
>([buttonVariant], View);

const restyleFunctions = composeRestyleFunctions([
  buttonVariant as any,
  spacing,
  border,
  backgroundColor,
]);

type Props = SpacingProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    label?: string;
    outline?: boolean;
    loading?: boolean;
    buttonTextProps?: TextProps;
  };

export const Button = ({
  onPress,
  label,
  loading = false,
  variant = 'primary',
  buttonTextProps,
  ...rest
}: Props) => {
  // @ts-ignore
  const props = useRestyle(restyleFunctions, { ...rest, variant });

  const BaseButton = () => {
    return (
      <ButtonContainer {...props}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === 'primary'
                ? 'white'
                : variant === 'error'
                ? 'error'
                : 'primary'
            }
          />
        ) : (
          <Text
            {...buttonTextProps}
            color={
              variant === 'primary'
                ? 'white'
                : variant === 'error'
                ? 'error'
                : 'primary'
            }
            variant={'medium16'}
          >
            {label}
          </Text>
        )}
      </ButtonContainer>
    );
  };

  return (
    <PressableScale onPress={onPress} disabled={loading}>
      <BaseButton />
    </PressableScale>
  );
};
