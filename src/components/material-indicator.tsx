import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";

export const MaterialIndicator = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
    return () => cancelAnimation(rotation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);
  // @ts-ignore
  return <Animated.View style={[styles.spinner, animatedStyles]} />;
};

const styles = ScaledSheet.create({
  spinner: {
    backgroundColor: "transparent",
    height: "36@s",
    width: "36@s",
    borderRadius: "18@s",
    borderWidth: "4@s",
    borderTopColor: "#266EFF", //'rgba(255, 255, 255, 0.4)',
    borderRightColor: "#266EFF", // 'rgba(255, 255, 255, 0.4)',
    borderBottomColor: "#266EFF", //'rgba(255, 255, 255, 0.4)',
    borderLeftColor: "white",
  },
});
