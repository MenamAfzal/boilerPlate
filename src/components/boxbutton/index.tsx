import React from 'react';
import { scale } from 'react-native-size-matters';

import { PressableScale, Text, View } from '@/ui';

type TextButtonProps = {
  label: string;
  onPress: () => void;
};

export const BoxButton = ({ label, onPress }: TextButtonProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View
        width={scale(200)}
        height={scale(50)}
        borderRadius={scale(5)}
        borderColor={'primary'}
        borderWidth={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text color={'primary'}>{label}</Text>
      </View>
    </PressableScale>
  );
};
