import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useCallback, useMemo } from 'react';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
export const BottomBackdrop = ({
  style,
  animatedIndex,
  pressBehavior = 'collapse',
}: BottomSheetDefaultBackdropProps) => {
  // NOTE: currently use dismissAll is fine for this project when only 1 modal is showing up at the time
  // Enhance to use dismiss with name
  const { dismissAll } = useBottomSheetModal();
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0.5, 1],
      [0, 0.5, 1],
      Extrapolate.CLAMP
    ),
  }));
  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'black',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );
  const _onBackdropPress = useCallback(() => {
    switch (pressBehavior) {
      case 'close':
      case 'collapse': {
        dismissAll();
        // Keyboard.dismiss();
        // setTimeout(() => {
        //   dismissAll();
        // }, 150);

        break;
      }
    }
  }, [dismissAll, pressBehavior]);
  return (
    <TouchableWithoutFeedback onPress={_onBackdropPress}>
      <Animated.View style={containerStyle} />
    </TouchableWithoutFeedback>
  );
};
