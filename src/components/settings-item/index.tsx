import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import { PressableScale, Text, View } from '@/ui';

type SettingsItemProps = {
  icon: IconTypes;
  title: string;
  onPress: () => void;
};

const SettingsItem = ({ icon, title, onPress }: SettingsItemProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={'large'}
        backgroundColor={'grey500'}
        borderRadius={scale(8)}
        height={scale(56)}
      >
        <View flex={1} flexDirection={'row'} alignItems={'center'}>
          <Image
            source={icons[icon]}
            style={styles.image}
            contentFit="contain"
          />

          <View paddingLeft={'small'}>
            <Text variant={'medium14'} color={'grey200'}>
              {title}
            </Text>
          </View>
        </View>
        <Image source={icons['arrow-right']} style={styles.image} />
      </View>
    </PressableScale>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  image: { height: scale(24), width: scale(24) },
});
