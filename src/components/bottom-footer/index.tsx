import React from 'react';

import { Button, View } from '@/ui';

type BottomFooterProps = {
  onButtonPress: () => void;
};

export const BottomFooter = ({ onButtonPress }: BottomFooterProps) => {
  return (
    <View
      paddingVertical={'large'}
      borderTopWidth={1}
      borderTopColor={'grey400'}
    >
      <Button label="Show Results" onPress={onButtonPress} />
    </View>
  );
};
