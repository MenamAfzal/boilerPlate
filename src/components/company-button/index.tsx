import type { ColorProps } from '@shopify/restyle';
import React from 'react';
import { Image } from 'react-native';
import { scale } from 'react-native-size-matters';

import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import type { Theme } from '@/theme';
import { PressableScale, View } from '@/ui';

type ImageButtonProps = {
  icon: IconTypes;
  onPress: () => void;
  size?: number;
  imageSize?: number;
  backgroundColor?: ColorProps<Theme>['color'];
};

export const CompanyButton = ({
  icon,
  size = scale(36),
  imageSize = scale(18),
  onPress,
  backgroundColor,
}: ImageButtonProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View
        backgroundColor={backgroundColor}
        justifyContent={'center'}
        alignItems={'center'}
        height={size}
        width={size}
        borderRadius={scale(8)}
      >
        <Image
          source={icons[icon]}
          style={{
            height: imageSize,
            width: imageSize,
            borderRadius: scale(8),
          }}
          resizeMode="contain"
        />
      </View>
    </PressableScale>
  );
};
