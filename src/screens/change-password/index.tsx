import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useForm } from 'react-hook-form';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { ScreenHeader } from '@/components/screen-header';
import { useSoftKeyboardEffect } from '@/hooks';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, View } from '@/ui';

const schema = z.object({
  password: z.string({
    required_error: 'Password is required',
  }),
  confirmPassword: z.string({
    required_error: 'Confirm Password is required',
  }),
  newPasswors: z.string({
    required_error: 'New Password is required',
  }),
});

export type ChangePasswordFormType = z.infer<typeof schema>;

export const ChangePassword = () => {
  const { colors } = useTheme<Theme>();

  useSoftKeyboardEffect();

  const { handleSubmit, control } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ChangePasswordFormType) => {
    console.log('data', data);
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader showBorder={true} title="Change Password" />

      <View flex={1} paddingHorizontal={'large'}>
        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter password"
            label="Current Password"
            control={control}
            name="password"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter password"
            label="New Password"
            control={control}
            name="newPasswors"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter Cofirm Password"
            label="Cofirm Password"
            control={control}
            name="confirmPassword"
          />
          <View height={scale(8)} />
        </View>
        <View height={scale(24)} />
        <View flex={1} justifyContent={'flex-end'}>
          <Button label="Update" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </Screen>
  );
};
