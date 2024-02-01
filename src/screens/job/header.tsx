import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Avatar } from '@/components/avatar';
import type { CandidateProfile } from '@/services/api/candidate';
import { Text, View } from '@/ui';

type HeaderProps = {
  data: CandidateProfile;
};

const Header = ({ data }: HeaderProps) => {
  return (
    <View>
      <Image
        source={require('src/assets/images/header.png')}
        style={styles.image}
        contentFit="contain"
      />
      <View
        alignSelf={'center'}
        style={{
          marginTop: -scale(30),
        }}
      >
        <Avatar
          source={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
          placeholder={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
          size="large"
        />
      </View>

      <View
        justifyContent={'center'}
        paddingVertical={'large'}
        alignItems={'center'}
      >
        <Text variant={'medium20'} color={'black'}>
          {data?.full_name}
        </Text>
        <Text variant={'regular13'} paddingVertical={'tiny'} color={'grey100'}>
          {data?.job_title}
        </Text>
        <Text
          variant={'regular13'}
          textTransform={'capitalize'}
          color={'grey200'}
        >
          {data?.contact?.city_name}, {data?.contact?.country_name}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: scale(90),
  },
});
