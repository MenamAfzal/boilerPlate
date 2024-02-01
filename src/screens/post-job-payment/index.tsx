import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import StepIndicator from '@/components/indicator-2';
import { RadioButton } from '@/components/radiobutton';
import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { Button, PressableScale, Screen, Text, View } from '@/ui';

const labels = ['Job Detail', 'Post Detail', 'Preview', 'Payment'];

export const PostJobPayment = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const [isChecked, setIsChecked] = useState(false);

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title={'Payment Methods'} showBorder={true} icon="close" />

      <View
        paddingHorizontal={'large'}
        backgroundColor={'grey500'}
        paddingBottom={'medium'}
      >
        <StepIndicator stepCount={4} currentPosition={3} labels={labels} />
      </View>

      <View flex={1}>
        <ScrollView>
          <View
            paddingHorizontal={'large'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            paddingVertical={'xLarge'}
            alignItems={'center'}
          >
            <Text variant={'medium24'} color={'black'}>
              Pay by Card
            </Text>

            <PressableScale>
              <Text
                variant={'regular13'}
                color={'primary'}
                textDecorationLine={'underline'}
              >
                Add New Card
              </Text>
            </PressableScale>
          </View>

          {[0]?.map((element, index) => {
            console.log('element', element);

            return (
              <PressableScale key={index}>
                <View
                  flexDirection={'row'}
                  paddingHorizontal={'large'}
                  alignItems={'center'}
                  paddingVertical={'medium'}
                  marginHorizontal={'large'}
                  backgroundColor={'grey400'}
                  borderRadius={scale(8)}
                >
                  <Image
                    source={icons['master-card']}
                    style={{ height: scale(24), width: scale(24) }}
                    contentFit="contain"
                  />

                  <View flex={1} paddingHorizontal={'medium'}>
                    <Text variant={'medium14'} color={'black'}>
                      master card****8888
                    </Text>
                    <View
                      backgroundColor={'grey300'}
                      paddingHorizontal={'medium'}
                      //paddingVertical={"small"}
                      height={scale(20)}
                      borderRadius={scale(4)}
                      alignSelf={'flex-start'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      marginTop={'small'}
                    >
                      <Text variant={'medium10'}>default</Text>
                    </View>
                    <Text
                      variant={'medium14'}
                      marginTop={'small'}
                      color={'black'}
                    >
                      Epiration: 12/25
                    </Text>
                  </View>

                  <View>
                    <RadioButton
                      unActiveColor="grey"
                      value={isChecked}
                      onToggle={(value) => {
                        setIsChecked(value);
                      }}
                    />
                  </View>
                </View>
              </PressableScale>
            );
          })}
        </ScrollView>

        <View
          paddingVertical={'large'}
          paddingBottom={'large'}
          borderTopWidth={1}
          borderTopColor={'grey400'}
        >
          <Button
            label="Pay $12"
            marginHorizontal={'large'}
            onPress={() => {
              navigate('JobPosted');
            }}
          />
          <View height={bottom} />
        </View>
      </View>
    </Screen>
  );
};
