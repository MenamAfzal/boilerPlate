import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import SelectionBox from '@/components/drop-down';
import { ScreenHeader } from '@/components/screen-header';
import { useSoftKeyboardEffect } from '@/hooks';
import { queryClient } from '@/services/api/api-provider';
import { useJobCategories } from '@/services/api/settings';
import { useAddUser, useGetUser } from '@/services/api/user';
import { useUser } from '@/store/user';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';
import { showErrorMessage, showSuccessMessage } from '@/utils';

const schema = z.object({
  userName: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  role: z.string({
    required_error: 'Role is required',
  }),
});

export type AddUserFormType = z.infer<typeof schema>;

export const AddUser = () => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();

  useSoftKeyboardEffect();

  // const roles = useUser((state) => state?.roles);
  const company = useUser((state) => state?.company);

  const { mutate: addUserApi, isLoading } = useAddUser();

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AddUserFormType>({
    resolver: zodResolver(schema),
  });

  const { data: jobCategores } = useJobCategories();

  // @ts-ignore
  const onSubmit = (data: AddUserFormType) => {
    addUserApi(
      {
        name: data?.userName,
        email: data?.email,
        role_id: 1,
        user_id: 0,
        company_user_id: 0,
        company_id: company?.id,
      },
      {
        onSuccess: (responseData) => {
          if (responseData?.status === 200) {
            showSuccessMessage(responseData?.message);
            queryClient.invalidateQueries(useGetUser.getKey());
            goBack();
          } else {
            showErrorMessage(responseData?.message);
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
      <ScreenHeader title="Add User" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View paddingTop={'large'} gap={'medium'} paddingHorizontal={'large'}>
          <ControlledInput
            placeholder="Enter user name"
            label="User Name"
            control={control}
            name="userName"
          />
          <ControlledInput
            placeholder="Enter email"
            label="User Email"
            control={control}
            name="email"
          />

          <View>
            <SelectionBox
              label="Role"
              placeholder="Select role"
              data={jobCategores}
              onChange={(data) => {
                setValue('role', `${data?.id}`);
                setError('role', {
                  type: 'custom',
                  message: '',
                });
              }}
            />
            {errors?.role?.message && (
              <Text paddingTop={'small'} variant="regular14" color={'error'}>
                {errors?.role?.message}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View
        paddingVertical={'large'}
        borderTopWidth={1}
        borderTopColor={'grey400'}
      >
        <Button
          label="Send an invite"
          marginHorizontal={'large'}
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(100),
  },
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});
