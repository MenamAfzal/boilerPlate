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
import { IconButton } from '@/components';
import { useLogin } from '@/services/api/auth/login';
import { login } from '@/store/auth';
import { setUserData } from '@/store/user';
import type { Theme } from '@/theme';
import {
  Button,
  ControlledInput,
  PressableScale,
  Screen,
  Text,
  View,
} from '@/ui';
import { showErrorMessage } from '@/utils';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export const Login = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const { mutate: loginApi, isLoading } = useLogin();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    loginApi(
      { email: data?.email, password: data?.password },
      {
        onSuccess: (data) => {
          // console.log("data?.response?.data", JSON.stringify(data?.response?.data, null, 2));

          if (data?.response?.status === 200) {
            login(data?.response?.data?.token);
            setUserData(data?.response?.data);
          } else {
            showErrorMessage(data.response.message);
          }
        },
        onError: (error) => {
          // An error happened!
          console.log(`error`, error?.response?.data);
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(72)} />
        <Image source={icons.logo} contentFit="contain" style={styles.logo} />
        <View paddingTop={'large'}>
          <Text variant={'semiBold24'} color={'black'}>
            Welcome Back 👋
          </Text>
          <Text variant={'regular14'} paddingTop={'small'} color={'grey100'}>
            Let’s log in. Apply to jobs!
          </Text>
        </View>

        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter email address"
            label="Email"
            control={control}
            name="email"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter password"
            label="Password"
            isSecure={true}
            control={control}
            name="password"
          />
        </View>
        <View height={scale(24)} />
        <Button
          label="Log in"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />

        <View paddingVertical={'2xl'} alignSelf={'center'}>
          <PressableScale onPress={() => navigate('ForgotPassword')}>
            <Text>Forgot password?</Text>
          </PressableScale>
        </View>

        <Image
          source={icons.continue}
          style={{ height: scale(24), width: '100%' }}
          contentFit="contain"
        />

        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'medium'}
          marginVertical={'large'}
        >
          <IconButton icon="apple" onPress={() => null} color={'grey500'} />
          <IconButton icon="google" onPress={() => null} color={'grey500'} />
          <IconButton icon="facebook" onPress={() => null} color={'grey500'} />
        </View>

        <View paddingVertical={'2xl'} alignSelf={'center'}>
          <PressableScale onPress={() => navigate('RegisterOptions')}>
            <Text variant={'regular14'} color={'grey200'}>
              Haven’t an account?{' '}
              <Text variant={'semiBold14'} color={'primary'}>
                Register
              </Text>
            </Text>
          </PressableScale>
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
});
