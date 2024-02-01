import type { ColorProps } from '@shopify/restyle';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
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

export const ImageButton = ({
  icon,
  size = scale(40),
  imageSize = scale(18),
  onPress,
  backgroundColor,
}: ImageButtonProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View
        // @ts-ignore
        backgroundColor={backgroundColor}
        style={[
          styles.container,
          { height: size, width: size, borderRadius: scale(8) },
        ]}
      >
        <Image
          source={icons[icon]}
          style={{
            height: imageSize,
            width: imageSize,
          }}
          resizeMode="contain"
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
