import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { ScreenHeader } from '@/components/screen-header';
import { useSoftKeyboardEffect } from '@/hooks';
import { queryClient } from '@/services/api/api-provider';
import { useAddRole, useGetRoles } from '@/services/api/roles';
import {
  onChange,
  resetData,
  usePermissionHandler,
} from '@/store/permission-handler';
import { useUser } from '@/store/user';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';
import { showErrorMessage, showSuccessMessage } from '@/utils';

import PermissionManager from './permission-manager';

const schema = z.object({
  userName: z.string({
    required_error: 'Role Name is required',
  }),
});

export type AddRoleFormType = z.infer<typeof schema>;

export const AddRole = () => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();

  useSoftKeyboardEffect();

  const company = useUser((state) => state?.company);
  const permissions = usePermissionHandler((state) => state?.data);

  const { mutate: AddRoleApi, isLoading } = useAddRole();

  const { handleSubmit, control } = useForm<AddRoleFormType>({
    resolver: zodResolver(schema),
  });

  // @ts-ignore
  const onSubmit = (data: AddRoleFormType) => {
    let rolePermissions = permissions?.map((element) => {
      return {
        module_id: element?.key,
        is_create: element?.create ? 1 : 0,
        is_read: element?.read ? 1 : 0,
        is_update: element?.update ? 1 : 0,
        is_delete: element?.delete ? 1 : 0,
      };
    });

    AddRoleApi(
      {
        name: data?.userName,
        company_id: company?.id,
        permissions: rolePermissions,
      },
      {
        onSuccess: (responseData) => {
          console.log('responseData', JSON.stringify(responseData, null, 2));

          if (responseData?.status === 200) {
            showSuccessMessage(responseData?.message);
            queryClient.invalidateQueries(useGetRoles.getKey());
            goBack();
            resetData();
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
      <ScreenHeader title="Add Role" showBorder={true} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View paddingTop={'large'} gap={'medium'} paddingHorizontal={'large'}>
          <ControlledInput
            placeholder="Enter role name"
            label="Role Name"
            control={control}
            name="userName"
          />
          <View>
            <Text
              paddingTop={'small'}
              paddingBottom={'small'}
              variant={'medium24'}
              color={'black'}
            >
              Set Permissions
            </Text>
            <View gap={'small'}>
              {permissions?.map((element, index) => {
                return (
                  <PermissionManager
                    key={index}
                    data={element}
                    onChange={(data, onChangeKey) =>
                      onChange(data, onChangeKey)
                    }
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        paddingVertical={'large'}
        borderTopWidth={1}
        borderTopColor={'grey400'}
      >
        <Button
          label="Save Role"
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
