import React from 'react';
import { scale } from 'react-native-size-matters';

import { Text, View } from '@/ui';

type StatusProps = {
  status: 'Pending' | 'Active';
};

export function Status({ status }: StatusProps) {
  return (
    <View
      height={scale(15)}
      width={scale(42)}
      backgroundColor={status === 'Active' ? 'primary' : 'warning'}
      borderRadius={scale(14)}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Text variant={'semiBold8'} color={'white'}>
        {status}
      </Text>
    </View>
  );
}
