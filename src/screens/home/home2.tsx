import { useTheme } from '@shopify/restyle';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import { PersonItem } from '@/components/person-item';
import { TopHeader } from '@/components/top-header';
import type { Theme } from '@/theme';
import { palette } from '@/theme';
import { FocusAwareStatusBar, View } from '@/ui';

import { HomeSliderContainer } from './home-slider';
import { SegmentContainer } from './segment-container';

const HEADER_MAX_HEIGHT = 310;
const HEADER_MIN_HEIGHT = 100;

const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DATA = Array(100)
  .fill(null)
  .map((_, idx) => ({
    id: idx,
    title: 'John wick',
    avatar: 'avatar',
    tags: ['cv', 'cover letter'],
    appliedFor: 'Frontend designer',
    appliedOn: '27 Aug 2023',
  }));

export const Home = () => {
  const { colors } = useTheme<Theme>();

  const { top } = useSafeAreaInsets();
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = withTiming(event.contentOffset.y);
  });

  const stylez = useAnimatedStyle(() => {
    const translate2 = interpolate(
      translationY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -HEADER_SCROLL_DISTANCE],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    return {
      transform: [
        {
          translateY: translate2,
        },
      ],
    };
  });

  return (
    <View flex={1} backgroundColor={'white'}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors?.primary}
      />
      <View style={styles.topHeader}>
        <TopHeader />
      </View>
      <Animated.View style={[styles.maxHeader, stylez]}>
        <HomeSliderContainer />
        <View paddingTop={'large'} alignItems={'center'}>
          <SegmentContainer
            onChangeSegment={(index) => {
              console.log(index);
            }}
          />
        </View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
        style={{
          marginTop: top,
        }}
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT + scale(72) + scale(10),
          paddingHorizontal: scale(16),
        }}
      >
        <View>
          {DATA?.map((element, index) => {
            return (
              <PersonItem
                key={index}
                //@ts-ignore
                data={element}
              />
            );
          })}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  maxHeader: {
    position: 'absolute',
    top: scale(72),
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: palette.white,
    height: HEADER_MAX_HEIGHT,
    zIndex: 1,
  },
});
