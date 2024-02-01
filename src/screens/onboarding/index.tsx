import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React, { useCallback, useRef, useState } from 'react';
import {} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { scale } from 'react-native-size-matters';

import { useIsFirstTime } from '@/hooks';
import type { Theme } from '@/theme';
import { Button, Screen, Text, View } from '@/ui';

import { Slides } from './slides';

// render slider item
const _renderItem = ({ item }) => {
  return (
    <View flex={1}>
      <Image
        source={item?.slide}
        style={{ height: scale(368), width: '100%' }}
        contentFit="contain"
      />
      <View paddingTop={'2xl'}>
        <Text variant={'semiBold28'} color={'black'} lineHeight={42}>
          {item?.heading}
        </Text>
        <Text
          variant={'regular16'}
          paddingTop={'small'}
          color={'grey200'}
          lineHeight={24}
        >
          {item?.content}
        </Text>
      </View>
    </View>
  );
};

const _renderPagination = (activeIndex) => {
  return (
    <View
      position={'absolute'}
      zIndex={100}
      bottom={25}
      flexDirection={'row'}
      alignItems={'center'}
    >
      {Slides?.map((element, index) => {
        let size = index === activeIndex ? scale(10) : scale(8);

        return (
          <View
            key={index}
            marginRight={'small'}
            height={size}
            width={size}
            borderRadius={scale(5)}
            backgroundColor={index === activeIndex ? 'black' : 'grey300'}
          />
        );
      })}
    </View>
  );
};

export const Onboarding = () => {
  const { colors } = useTheme<Theme>();
  const [_, setIsFirstTime] = useIsFirstTime();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const ref = useRef(undefined);

  const handleButtonPress = useCallback(() => {
    if (activeIndex === 2) {
      setIsFirstTime(false);
      return;
    }

    ref?.current?.goToSlide(activeIndex + 1, true);
  }, [activeIndex, setIsFirstTime]);

  return (
    <Screen edges={['top']} backgroundColor={colors.white}>
      <View
        paddingHorizontal={'large'}
        paddingTop={'4xl'}
        flex={1}
        backgroundColor={'white'}
      >
        <AppIntroSlider
          ref={ref}
          data={Slides}
          bottomButton={true}
          renderItem={_renderItem}
          renderPagination={_renderPagination}
          onSlideChange={(index) => {
            setActiveIndex(index);
          }}
        />
        <View marginVertical={'3xl'}>
          <Button
            label={activeIndex === 2 ? 'Oky, Got it' : 'Next'}
            onPress={handleButtonPress}
          />
        </View>
      </View>
    </Screen>
  );
};
