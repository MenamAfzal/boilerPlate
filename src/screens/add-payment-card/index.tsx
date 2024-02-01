import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import cardValidator from 'card-validator';
import { Image } from 'expo-image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
import { addCard } from '@/store/payment';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, View } from '@/ui';

const schema = z.object({
  cardNumber: z
    .string({
      required_error: 'Card number is required',
    })
    .refine(
      (cardNumber) => {
        const { isValid } = cardValidator.number(cardNumber);

        return isValid;
      },
      {
        message: 'Invalid card number',
      }
    ),

  cvc: z
    .string({
      required_error: 'cvc is required',
    })
    .refine(
      (cvc) => {
        const { isValid } = cardValidator.cvv(cvc);
        return isValid;
      },
      {
        message: 'Enter correct cvc',
      }
    ),
  expiry: z
    .string({
      required_error: 'expiry is required',
    })
    .refine(
      (expiry) => {
        const { isValid } = cardValidator.expirationDate(expiry);
        return isValid;
      },
      {
        message: 'Enter correct expiry date',
      }
    ),
});

export type PaymentFormType = z.infer<typeof schema>;

export const AddPaymentCard = () => {
  const { colors } = useTheme<Theme>();

  const { goBack } = useNavigation();

  const { handleSubmit, control } = useForm<PaymentFormType>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = (data: PaymentFormType) => {
    let data2 = {
      card: data?.cardNumber,
      expiry: data?.expiry,
      cvc: data?.cvc,
    };

    addCard(data2);

    goBack();
  };

  return (
    <Screen backgroundColor={colors.white} edges={['top', 'bottom']}>
      <ScreenHeader title={'Add Debit/Credit Card'} showBorder={true} />
      <View flex={1}>
        <View paddingHorizontal={'large'} gap={'small'} paddingTop={'large'}>
          <ControlledInput
            label="Card"
            placeholder="0000-0000-0000-0000"
            name="cardNumber"
            control={control}
            icon={
              <Image
                source={icons['credit-card']}
                style={{ height: scale(24), width: scale(24) }}
              />
            }
          />
          <View columnGap={'medium'} flexDirection={'row'}>
            <View flex={0.7}>
              <ControlledInput
                label="Expiration"
                placeholder="MM/YY"
                name="expiry"
                control={control}
                icon={<Image source={icons.calendar} style={styles.image} />}
              />
            </View>
            <View flex={0.3}>
              <ControlledInput
                label="CVC"
                placeholder="***"
                name="cvc"
                control={control}
              />
            </View>
          </View>
        </View>

        <View
          paddingHorizontal={'large'}
          paddingBottom={'2xl'}
          justifyContent={'flex-end'}
          flex={1}
        >
          <Button label="Add Card" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: {
    height: scale(24),
    width: scale(24),
  },
});
