import type { ImageProps } from 'expo-image';
import { Image } from 'expo-image';
import React from 'react';
import { scale } from 'react-native-size-matters';

import { PressableScale } from '@/ui';

export type AvatarProps = {
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
} & ImageProps;

const AVATAR_SIZES = {
  small: scale(36),
  medium: scale(48),
  large: scale(56),
};

export const Avatar = ({ size = 'medium', onPress, ...rest }: AvatarProps) => {
  return (
    <PressableScale onPress={onPress}>
      <Image
        style={{
          height: AVATAR_SIZES[size],
          width: AVATAR_SIZES[size],
          borderRadius: AVATAR_SIZES[size] / 2,
        }}
        {...rest}
      />
    </PressableScale>
  );
};
