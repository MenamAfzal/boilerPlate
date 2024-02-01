import { Image } from 'expo-image';
import React from 'react';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { PressableScale, Text, View } from '@/ui';

type AddButtonProps = {
  onPress: () => void;
  label: string;
};

export const AddButton = ({ onPress, label }: AddButtonProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View
        backgroundColor={'primary'}
        width={scale(87)}
        height={scale(32)}
        borderRadius={scale(8)}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'row'}
      >
        <Image
          source={icons.pluss}
          style={{ height: 16, width: 16 }}
          contentFit="contain"
        />
        <Text color={'white'} marginLeft={'small'}>
          {label}
        </Text>
      </View>
    </PressableScale>
  );
};
