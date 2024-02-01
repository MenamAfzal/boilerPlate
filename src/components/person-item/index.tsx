import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import type { Candidate } from '@/services/api/candidate';
import { PressableScale, Text, View } from '@/ui';

import { Avatar } from '../avatar';

type PersonItemProps = {
  data: Candidate;
};

export const PersonItem = ({ data }: PersonItemProps) => {
  const navigation = useNavigation();

  return (
    <PressableScale
      onPress={() => {
        navigation?.navigate('Job', { id: data?.unique_id });
      }}
    >
      <View
        flexDirection={'row'}
        marginBottom={'large'}
        paddingHorizontal={'large'}
      >
        <View>
          <Avatar
            source={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
            placeholder={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
            transition={1000}
          />
        </View>
        <View flex={1} paddingHorizontal={'medium'}>
          <Text variant={'semiBold14'} color={'black'}>
            {data?.full_name}
          </Text>
          <View flexDirection={'row'} marginTop={'tiny'} alignItems={'center'}>
            <Text variant={'regular13'} color={'grey300'}>
              Applied For:{' '}
            </Text>
            <Text variant={'regular13'} color={'grey100'}>
              {'React Native Developer'}
            </Text>
          </View>

          <View flexDirection={'row'} marginTop={'tiny'} alignItems={'center'}>
            <Text variant={'regular13'} color={'grey300'}>
              Applied on:{' '}
            </Text>
            <Text variant={'regular13'} color={'grey100'}>
              {data?.applied_on}
            </Text>
          </View>
          <View
            flexDirection={'row'}
            gap={'medium'}
            alignItems={'center'}
            paddingTop={'small'}
          >
            {/* {tags.map((item, index) => {
            return <Tag key={index} name={item} icon="cv" />;
          })} */}
          </View>
        </View>

        <PressableScale>
          <Image
            source={icons['more-horizontal']}
            contentFit="contain"
            style={styles.image}
          />
        </PressableScale>
      </View>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  image: {
    height: scale(24),
    width: scale(24),
  },
});
