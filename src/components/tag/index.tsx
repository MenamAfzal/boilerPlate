import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

type TagProps = {
  name: string;
  icon?: IconTypes;
};

export const Tag = ({ name, icon }: TagProps) => {
  return (
    <View
      backgroundColor={'grey500'}
      borderRadius={scale(16)}
      height={scale(31)}
      paddingHorizontal={'medium'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'row'}
    >
      <Image source={icons[icon]} contentFit="contain" style={styles.icon} />
      <Text variant={'regular13'} color={'grey100'}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: scale(12),
    width: scale(12),
    marginRight: scale(5),
  },
});
