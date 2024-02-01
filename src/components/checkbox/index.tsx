import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { icons } from '@/assets/icons';

import { useMix, useSharedTransition } from '../animated';
import { execFunc } from '../common';
import { styles } from './styles';
import type { CheckboxProps } from './type';

export const CheckBox = ({
  value,
  style,
  outlineStyle: outlineStyleOverwrite,
  onToggle,
  disable = false,
  initialValue = false,
  fillStyle,
}: CheckboxProps) => {
  // state
  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const progress = useSharedTransition(value ?? localValue);
  const scale = useMix(progress, 0, 1);
  const opacity = useMix(progress, 0, 1);

  // function
  const onPress = useCallback(() => {
    if (typeof value === 'boolean') {
      execFunc(onToggle, !value);
    } else {
      execFunc(onToggle, !localValue);
      setLocalValue((v) => !v);
    }
  }, [localValue, onToggle, value]);

  // reanimated style
  const styleAnimated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  // render
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disable}
      onPress={onPress}
      style={[styles.root, style]}
    >
      <>
        <View style={[styles.outline, outlineStyleOverwrite]}>
          <Animated.View style={[styles.fill, fillStyle, styleAnimated]}>
            <Image
              source={icons['check-mark-white']}
              style={{ height: 12, width: 12 }}
              contentFit="contain"
            />
          </Animated.View>
        </View>
      </>
    </TouchableOpacity>
  );
};
