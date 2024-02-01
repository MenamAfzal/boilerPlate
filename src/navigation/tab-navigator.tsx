import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';

import { AppDrawer } from '@/components/app-drawer';
import { AddPost, Candidates, Home, Settings, Vacancies } from '@/screens';

import { AppBottomTab } from './bottom-tab';

type TabParamList = {
  Home: undefined;
  Vacancies: undefined;
  AddPost: undefined;
  Candidates: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

export const TabNavigator = () => {
  return (
    <AppDrawer>
      <Tab.Navigator tabBar={(props) => <AppBottomTab {...props} />}>
        <Tab.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            name={'Home'}
            component={Home}
            options={{
              title: 'Home',
            }}
          />
          <Tab.Screen
            name={'Vacancies'}
            component={Vacancies}
            options={{
              title: 'Vacancies',
            }}
          />
          <Tab.Screen
            name={'AddPost'}
            component={AddPost}
            options={{
              title: 'Post A Job',
            }}
          />
          <Tab.Screen
            name={'Candidates'}
            component={Candidates}
            options={{
              title: 'Candidates',
            }}
          />
          <Tab.Screen
            name={'Settings'}
            component={Settings}
            options={{
              title: 'More',
            }}
          />
        </Tab.Group>
      </Tab.Navigator>
    </AppDrawer>
  );
};
