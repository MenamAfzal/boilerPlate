import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import type { Theme } from '@/theme';
import { PressableScale, Screen, Text, View } from '@/ui';

export const JobPosted = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  return (
    <Screen
      backgroundColor={colors.primary}
      edges={['top']}
      statusBarColor={colors.primary}
    >
      <View
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        backgroundColor={'primary'}
      >
        <Image
          source={icons['success-icon']}
          style={{ height: scale(128), width: scale(128) }}
        />
        <View paddingHorizontal={'large'} paddingVertical={'xLarge'}>
          <Text textAlign={'center'} variant={'medium24'} color={'white'}>
            Your Job is Posted!
          </Text>
          <Text
            paddingTop={'medium'}
            textAlign={'center'}
            variant={'regular14'}
            color={'white'}
          >
            Congratulations! Your job has been successfully posted and is now
            visible to potential candidates. Good luck in your recruitment
            process!
          </Text>
        </View>
        <PressableScale onPress={() => navigate('TabNavigator')}>
          <View
            height={scale(56)}
            width={scale(200)}
            borderRadius={scale(8)}
            backgroundColor={'white'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text variant={'medium16'} color={'primary'}>
              Manage Jobs
            </Text>
          </View>
        </PressableScale>
      </View>
    </Screen>
  );
};
