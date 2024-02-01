import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
import { useSoftKeyboardEffect } from '@/hooks';
import { useChangePassword } from '@/services/api/auth';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';
import { showErrorMessage } from '@/utils';

const schema = z
  .object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .regex(
        /^(?=.*[0-9])(?=.*\W)(?!.* ).{10,16}$/,
        'Password must be at least 10 characters and one specail character'
      ),
    password_confirmation: z.string({
      required_error: 'Confirm Password is required',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

export type ResetPasswordFormType = z.infer<typeof schema>;

export const ResetPassword = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const { params } = useRoute<any>();

  useSoftKeyboardEffect();

  const { mutate: resetPasswordApi, isLoading } = useChangePassword();

  const { handleSubmit, control } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ResetPasswordFormType) => {
    resetPasswordApi(
      {
        email: params?.email,
        password: data?.password,
        password_confirmation: data?.password_confirmation,
        token: params?.token,
      },
      {
        onSuccess: (responseData) => {
          console.log('data', JSON.stringify(responseData, null, 2));

          if (responseData?.response?.status === 200) {
            Alert.alert('Success', 'Password has been updated, Please login', [
              {
                text: 'Ok',
                onPress: () => navigate('Login'),
                style: 'default',
              },
            ]);
          } else {
            showErrorMessage(responseData?.response?.message);
          }
        },
        onError: (error) => {
          //@ts-ignore
          showErrorMessage(error?.response?.data?.message);
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader />

      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(24)} />
        <Image source={icons.logo} contentFit="contain" style={styles.logo} />
        <View paddingTop={'large'}>
          <Text variant={'semiBold24'} color={'black'}>
            Reset Password 👍
          </Text>
          <Text variant={'regular14'} paddingTop={'small'} color={'grey100'}>
            Let’s ResetPassword.
          </Text>
        </View>

        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter password"
            label="Password"
            control={control}
            name="password"
            isSecure={true}
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter confirm password"
            label="Confirm Password"
            control={control}
            name="password_confirmation"
            isSecure={true}
          />
        </View>
        <View height={scale(24)} />
        <Button
          label="Reset Password"
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
