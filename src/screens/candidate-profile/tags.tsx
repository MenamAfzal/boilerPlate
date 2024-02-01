import React from 'react';
import { FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Text, View } from '@/ui';

const skills = [
  { name: 'MongoDB' },
  { name: 'ReactJs' },
  { name: 'PHP' },
  { name: 'My SQL' },
  { name: 'My SQL' },
];

const Tags = () => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={skills}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <View
          backgroundColor={'tertiary'}
          borderRadius={scale(8)}
          paddingVertical={'small'}
          paddingHorizontal={'medium'}
          marginHorizontal={'tiny'}
          alignSelf={'flex-start'}
          marginLeft={'medium'}
        >
          <Text variant={'regular12'}>{item.name}</Text>
        </View>
      )}
    />
  );
};

export default Tags;
