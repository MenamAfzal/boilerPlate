import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
import { useForgotPassword } from '@/services/api/auth';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';
import { showErrorMessage } from '@/utils';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
});

export type ForgotPasswordFormType = z.infer<typeof schema>;

export const ForgotPassword = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const { mutate: forgotPasswordApi, isLoading } = useForgotPassword();

  const { handleSubmit, control } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (body: ForgotPasswordFormType) => {
    forgotPasswordApi(
      { email: body?.email },
      {
        onSuccess: (data) => {
          console.log('data', JSON.stringify(data, null, 2));
          if (data?.response?.status === 200) {
            navigate('ResetPassword', {
              email: body?.email,
              token: data?.response?.token,
            });
          } else {
            showErrorMessage(data?.response?.message);
          }
        },
        onError: (error) => {
          // An error happened!
          console.log(`rolling back optimistic update with id ${error}`);
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader />

      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(72)} />

        <View alignItems={'center'} justifyContent={'center'}>
          <Image source={icons.logo} contentFit="contain" style={styles.logo} />
          <View height={scale(16)} />
          <View
            paddingTop={'large'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text variant={'semiBold24'} textAlign={'center'} color={'black'}>
              Forgot Password
            </Text>
            <Text
              variant={'regular14'}
              paddingTop={'small'}
              textAlign={'center'}
              color={'grey100'}
            >
              Enter your email or phone number, we will send you verification
              code
            </Text>
          </View>
        </View>

        <View height={scale(32)} />

        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter email"
            label="Email"
            control={control}
            name="email"
          />
          <View height={scale(8)} />
        </View>
        <View height={scale(24)} />
        <Button
          label="Verify"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
});
