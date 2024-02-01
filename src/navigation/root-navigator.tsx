import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useIsFirstTime } from '@/hooks';
import { Onboarding } from '@/screens';
import { useAuth } from '@/store/auth';

import type { AppStackParamList } from './app-navigator';
import { AppNavigator } from './app-navigator';
import { AuthNavigator } from './auth-navigator';
import { NavigationContainer } from './navigation-container';

export type RootAppStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  App: AppStackParamList;
};

const Stack = createNativeStackNavigator<RootAppStackParamList>();

export const Root = () => {
  const status = useAuth((state) => state.status);
  const [isFirstTime] = useIsFirstTime();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}
    >
      {isFirstTime ? (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      ) : status === 'signOut' ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="App" component={AppNavigator} />
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
