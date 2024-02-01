import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { PressableScale, Text, View } from '@/ui';

type ApplicantListProps = {
  data: {
    title: string;
    detail: string;
    address: string;
    status: string;
    time: string;
    color: string;
  };
  showStatus?: boolean;
  onPress: () => void;
  onOptionPress: () => void;
};

const ApplicantList = ({
  data,
  onPress,
  onOptionPress,
}: ApplicantListProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View
        flexDirection={'row'}
        paddingHorizontal={'large'}
        borderBottomColor={'grey400'}
        borderBottomWidth={StyleSheet.hairlineWidth}
        backgroundColor={'white'}
        paddingVertical={'medium'}
      >
        <View flex={1} paddingLeft={'medium'}>
          <View
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text variant={'medium14'} color={'grey200'}>
              {data?.title}
            </Text>
            <PressableScale onPress={() => onOptionPress?.()}>
              <Image
                source={icons['more-horizontal']}
                style={style.dot}
                contentFit="contain"
              />
            </PressableScale>
          </View>
        </View>
      </View>
    </PressableScale>
  );
};

const style = StyleSheet.create({
  dot: {
    width: scale(24),
    height: scale(24),
  },
});
export default ApplicantList;
