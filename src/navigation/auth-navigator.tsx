import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import {
  AgencyInformation,
  CompanyInformation,
  ForgotPassword,
  Login,
  Register,
  RegisterOptions,
  ResetPassword,
  SendInvite,
  VerifyCode,
} from '@/screens';

export type AuthStackParamList = {
  Login: undefined;
  RegisterOptions: undefined;
  Register: undefined;
  VerifyCode: { email: string; password: string };
  CompanyInformation: undefined;
  SendInvite: undefined;
  AgencyInformation: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string; token: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterOptions"
        component={RegisterOptions}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifyCode"
        component={VerifyCode}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CompanyInformation"
        component={CompanyInformation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SendInvite"
        component={SendInvite}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgencyInformation"
        component={AgencyInformation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
