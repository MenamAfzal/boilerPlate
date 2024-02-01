import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
import { usePayments } from '@/store/payment';
import type { Theme } from '@/theme';
import { Button, PressableScale, Screen, Text, View } from '@/ui';

export const PaymentMethods = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const cards = usePayments((state) => state.cards);

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title={'Payment Methods'} showBorder={true} icon="close" />
      <View flex={1}>
        {cards?.length ? (
          <ScrollView>
            <View paddingHorizontal={'large'} paddingVertical={'xLarge'}>
              <Text
                variant={'regular17'}
                textAlign={'center'}
                color={'grey200'}
              >
                Add and manage your payment methods using our secure payment
                system
              </Text>
            </View>

            {cards?.map((element, index) => {
              return (
                <PressableScale key={index}>
                  <View
                    flexDirection={'row'}
                    paddingHorizontal={'large'}
                    alignItems={'center'}
                    borderBottomColor={'grey400'}
                    borderBottomWidth={1}
                    paddingBottom={'medium'}
                  >
                    <Image
                      source={icons['credit-card']}
                      style={{ height: scale(24), width: scale(24) }}
                    />

                    <View flex={1} paddingHorizontal={'medium'}>
                      <Text variant={'medium14'} color={'black'}>
                        master card****8888
                      </Text>
                      <View
                        backgroundColor={'grey400'}
                        paddingHorizontal={'medium'}
                        paddingVertical={'tiny'}
                        borderRadius={scale(4)}
                        alignSelf={'flex-start'}
                        marginTop={'small'}
                      >
                        <Text variant={'medium12'}>default</Text>
                      </View>
                      <Text
                        variant={'medium14'}
                        marginTop={'small'}
                        color={'black'}
                      >
                        Epiration: {element?.expiry}
                      </Text>
                    </View>
                    {/* <View>
                      <Text>{element?.card}</Text>
                    </View> */}
                  </View>
                </PressableScale>
              );
            })}
          </ScrollView>
        ) : null}

        {cards?.length === 0 ? (
          <View
            flex={1}
            backgroundColor={'grey500'}
            justifyContent={'center'}
            alignItems={'center'}
            paddingHorizontal={'large'}
          >
            <Image
              source={icons.payment}
              style={{ height: scale(182), width: scale(155) }}
              contentFit="contain"
            />

            <Text
              paddingTop={'large'}
              paddingHorizontal={'large'}
              textAlign={'center'}
              paddingBottom={'xLarge'}
              variant={'regular16'}
              color={'grey100'}
            >
              Add a payment method using our secure payment system
            </Text>

            <View paddingHorizontal={'medium'} width={scale(250)}>
              <Button
                label="Add Payment Method"
                onPress={() => navigate('AddPaymentCard')}
              />
            </View>
          </View>
        ) : null}
      </View>
    </Screen>
  );
};
