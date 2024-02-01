import type { BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import type { FC } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { View } from '@/ui';

interface HandleProps extends BottomSheetHandleProps {
  style?: StyleProp<ViewStyle>;
}

export const BottomSheetHandle: FC<HandleProps> = ({ style }) => {
  return (
    <View
      backgroundColor={'grey300'}
      style={[styles.header, style]}
      renderToHardwareTextureAndroid={true}
    >
      <View
        // @ts-ignore
        style={styles.indicator}
        bg="grey200"
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  header: {
    alignContent: 'center',
    alignItems: 'center',
    // height: '30@vs',
    // paddingTop: '8@vs',
  },
  indicator: {
    width: '30@s',
    height: '3@vs',
    borderRadius: '46@vs',
  },
});
