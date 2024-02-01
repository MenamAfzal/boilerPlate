import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/ui';

type JobMenueProps = {
  img: string;
  title: string;
};
const JobMenue = ({ img, title }: JobMenueProps) => {
  return (
    <View flexDirection={'row'} marginHorizontal={'large'} margin={'small'}>
      <View flexDirection={'column'}>
        <Image source={img} style={style.image} />
      </View>
      <View flexDirection={'column'} marginLeft={'large'}>
        <Text variant={'medium14'} fontWeight={'500'}>
          {title}
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
});

export default JobMenue;
