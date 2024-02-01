import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { IconButton } from '@/components';
import { ScreenHeader } from '@/components/screen-header';
import { setCompanyType } from '@/store/app';
import type { Theme } from '@/theme';
import { Screen, Text, View } from '@/ui';

const data = [
  {
    id: 1,
    icon: 'research',
    name: 'Company',
    text: 'Looking to hire',
    text2: 'people',
  },
  {
    id: 2,
    icon: 'finance',
    name: 'Recruiter',
    text: 'Matching people',
    text2: 'with employers',
  },
];

export const RegisterOptions = () => {
  const { colors } = useTheme<Theme>();

  const { navigate } = useNavigation();

  const goToNext = useCallback(
    (element) => {
      if (element?.id === 1) {
        navigate('Register');
        setCompanyType('company');
      }

      if (element?.id === 2) {
        setCompanyType('recruiter');
        navigate('Register');
      }
    },
    [navigate]
  );

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader />
      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(72)} />
        <Image source={icons.logo} contentFit="contain" style={styles.logo} />
        <View paddingTop={'large'}>
          <Text variant={'semiBold24'} color={'black'}>
            Registration 👍
          </Text>
          <Text variant={'regular14'} paddingTop={'small'} color={'grey100'}>
            Let’s Register. Apply to jobs!
          </Text>
        </View>

        <View height={scale(80)} />

        <View>
          <Text variant={'medium20'} color={'black'}>
            Select Account Type
          </Text>

          <View flexDirection={'row'} paddingTop={'large'} columnGap={'medium'}>
            {data?.map((element, index) => {
              return (
                <Pressable
                  style={styles.button}
                  key={index}
                  onPress={() => goToNext(element)}
                >
                  <View
                    height={scale(143)}
                    borderRadius={scale(8)}
                    flex={1}
                    backgroundColor={'grey500'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <IconButton
                      // @ts-ignore
                      icon={element?.icon}
                      color={'white'}
                      onPress={() => null}
                    />
                    <Text
                      variant={'medium14'}
                      color={'black'}
                      marginTop={'medium'}
                    >
                      {element?.name}
                    </Text>
                    <Text
                      variant={'regular12'}
                      marginTop={'small'}
                      color={'grey200'}
                    >
                      {element.text}
                    </Text>
                    <Text
                      variant={'regular12'}
                      color={'grey200'}
                      paddingTop={'tiny'}
                    >
                      {element.text2}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
  button: {
    flex: 1,
    height: scale(143),
    borderRadius: scale(8),
  },
});
