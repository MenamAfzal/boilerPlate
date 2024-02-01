import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

export const EducationItem = ({ item }) => {
  return (
    <View
      backgroundColor="white"
      paddingHorizontal={'large'}
      flexDirection={'row'}
      paddingVertical={'2xl'}
      borderBottomColor={'grey500'}
      borderBottomWidth={1}
    >
      <Image source={icons.indesign} style={candidateStyles.image} />
      <View flex={1} paddingLeft={'medium'}>
        <Text variant="medium14" color="black">
          {item?.institute ?? 'Institue Name'}
        </Text>
        <Text variant="medium12" marginVertical={'tiny'} color={'grey100'}>
          {item?.education_level}{' '}
          <Text variant={'regular12'} color={'grey300'}>
            {item?.education_field}
          </Text>
        </Text>
        <Text variant="regular10" marginVertical={'tiny'} color={'grey100'}>
          {item?.from_date}-{item?.to_date}
        </Text>
      </View>
    </View>
  );
};

const candidateStyles = StyleSheet.create({
  image: {
    width: scale(48),
    height: scale(48),
  },
});
