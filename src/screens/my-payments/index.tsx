import { useTheme } from '@shopify/restyle';
import React from 'react';
import { scale } from 'react-native-size-matters';

import { CompanyButton } from '@/components/company-button';
import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { PressableScale, Screen, Text, View } from '@/ui';

const data = [
  {
    date: 'Decemember',
    data: [
      { name: 'VFairs', date: 'Today 1:15 PM', price: 100 },
      { name: 'Streamed.io', date: 'Today 1:15 PM', price: 150 },
    ],
  },
  {
    date: 'November',
    data: [
      { name: 'VFairs', date: 'Today 1:15 PM', price: 100 },
      { name: 'Streamed.io', date: 'Today 1:15 PM', price: 150 },
    ],
  },
];

export const MyPayments = () => {
  const { colors } = useTheme<Theme>();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title={'Your Payments'} showBorder={true} icon="close" />
      <View flex={1}>
        <View paddingTop={'large'}>
          {data?.map((element, index) => {
            return (
              <View key={index}>
                <View
                  backgroundColor={'grey500'}
                  paddingHorizontal={'large'}
                  paddingVertical={'medium'}
                >
                  <Text variant={'medium12'} color={'grey200'}>
                    {element.date}
                  </Text>
                </View>

                {element?.data?.map((transaction, tranIndex) => {
                  return (
                    <PressableScale key={tranIndex}>
                      <View
                        backgroundColor={'white'}
                        paddingHorizontal={'large'}
                        flexDirection={'row'}
                        paddingVertical={'medium'}
                        borderBottomColor={'grey500'}
                        borderBottomWidth={1}
                      >
                        <View>
                          <CompanyButton
                            icon="company"
                            onPress={() => null}
                            size={scale(44)}
                            imageSize={scale(44)}
                          />
                        </View>
                        <View flex={1} paddingHorizontal={'medium'}>
                          <Text variant={'semiBold14'} color={'black'}>
                            {transaction?.name}
                          </Text>
                          <Text
                            variant={'regular12'}
                            paddingTop={'small'}
                            color={'grey100'}
                          >
                            {transaction?.date}
                          </Text>
                        </View>
                        <View alignItems={'flex-end'}>
                          <Text variant={'semiBold14'} color={'black'}>
                            ${transaction?.price}
                          </Text>
                          <Text
                            variant={'regular12'}
                            paddingTop={'small'}
                            color={'grey100'}
                          >
                            Promotion
                          </Text>
                        </View>
                      </View>
                    </PressableScale>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </Screen>
  );
};
