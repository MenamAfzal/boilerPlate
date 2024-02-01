import React, { forwardRef } from "react";
import { Dimensions, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { View } from "@/ui";
import { scale } from "react-native-size-matters";

export const AnimatedBox = Animated.createAnimatedComponent(View);

type ProgressProps = {
  /**
   * The progress value
   * If null makes it indeterminate
   * @default null
   */
  value: number | null;
  /**
   * The progress track style
   */
  trackStyle?: ViewStyle;
  /**
   * Label for the Meter
   */
  label?: string | null;
  /**
   * Hint for the Meter
   */
  hint?: string;
};

const SPRING_CONFIG = {
  mass: 1,
  damping: 15,
  stiffness: 130,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

const width = Dimensions.get("window").width;

const ProgressBar = ({ value, trackStyle = {}, label, hint }: ProgressProps) => {
  // Loop Translation progress when value is null
  const progressTranslate = useSharedValue(-1);

  const isIndeterminate = React.useMemo(() => value === null || value === undefined, [value]);

  const progressValue = useDerivedValue(() => (!isIndeterminate ? `${value || 0}%` : "0%"));

  // @ts-ignore
  const animatingWidth = useAnimatedStyle(() => {
    return {
      width: withSpring(progressValue.value, SPRING_CONFIG),
    };
  });

  React.useEffect(() => {
    progressTranslate.value = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [progressTranslate]);

  const translatingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            progressTranslate.value,
            [-1, 0, 1],
            //[-width, 0, width]
            [-250, 0, 250]
          ),
        },
      ],
      width: interpolate(progressTranslate.value, [-1, 0, 1], [30, 60, 30]),
    };
  });

  return (
    <View flex={1}>
      <AnimatedBox
        width="100%"
        height={scale(6)}
        borderRadius={scale(60)}
        overflow="hidden"
        backgroundColor={"background"}
      >
        {isIndeterminate && (
          <AnimatedBox
            backgroundColor={"primary"}
            position={"absolute"}
            borderRadius={scale(60)}
            height={scale(6)}
            style={[translatingStyle]}
          />
        )}
        {!isIndeterminate && (
          <AnimatedBox
            backgroundColor={"primary"}
            position={"absolute"}
            borderRadius={scale(60)}
            height={scale(6)}
            style={[animatingWidth]}
          />
        )}
      </AnimatedBox>
    </View>
  );
};

export default ProgressBar;
