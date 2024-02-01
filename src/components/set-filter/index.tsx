import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Text, View } from '@/ui';

import SelectionBox from '../drop-down';

const SetFilter = () => {
  return (
    <View flexDirection={'column'} flex={1}>
      <View
        flexDirection={'row'}
        justifyContent={'center'}
        style={style.header}
      >
        <Text variant={'medium17'} fontWeight={'500'}>
          Set filters
        </Text>
      </View>
      <View marginHorizontal={'2xl'} paddingTop={'3xl'}>
        <View>
          <Text variant={'medium14'} fontWeight={'500'}>
            Vacancy Type
          </Text>
        </View>
        <View flexDirection={'row'} marginTop={'small'}>
          <SelectionBox />
        </View>
        <View marginTop={'medium'}>
          <Text variant={'medium14'} fontWeight={'500'}>
            Categories
          </Text>
        </View>
        <View flexDirection={'row'} marginTop={'small'}>
          <SelectionBox />
        </View>
        <View marginTop={'medium'}>
          <Text variant={'medium14'} fontWeight={'500'}>
            Posted On
          </Text>
        </View>
        <View flexDirection={'row'} marginTop={'small'}>
          <SelectionBox />
        </View>
        <View marginTop={'medium'}>
          <Text variant={'medium14'} fontWeight={'500'}>
            Job Status
          </Text>
        </View>
        <View flexDirection={'row'} marginTop={'small'}>
          <SelectionBox />
        </View>
      </View>
      <View marginTop={'4xl'} />
      <View
        flexDirection={'row'}
        borderTopWidth={1}
        borderColor={'grey100'}
        width={'auto'}
        marginTop={'4xl'}
      />
      <View paddingTop={'large'} marginHorizontal={'2xl'}>
        <Button label="Show Results" onPress={() => null} />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
});

export default SetFilter;
