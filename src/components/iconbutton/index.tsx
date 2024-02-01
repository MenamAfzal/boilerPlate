import type { ColorProps } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import type { Theme } from '@/theme';
import { PressableScale, View } from '@/ui';

type IconButtonProps = {
  icon: IconTypes;

  onPress: () => void;
  size?: number;
  disabled?: boolean;
  imageSize?: number;
  color?: ColorProps<Theme>['color'];
};

export const IconButton = ({
  icon,
  size = scale(34),
  imageSize = scale(18),
  disabled,
  onPress,
  color,
}: IconButtonProps) => {
  return (
    <PressableScale onPress={onPress} disabled={disabled}>
      <View
        backgroundColor={color}
        style={[
          styles.container,
          // @ts-ignore
          {
            height: size,
            width: size,
            borderRadius: size / 2,
            // backgroundColor: color,
          },
        ]}
      >
        <Image
          source={icons[icon]}
          style={{
            height: imageSize,
            width: imageSize,
          }}
          contentFit="contain"
        />
      </View>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: scale(18),
    width: scale(18),
  },
});
