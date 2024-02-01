import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import { PressableScale, View } from '@/ui';
type IconButtonProps = {
  icon: IconTypes;

  onPress: () => void;
};

export const IconBox = ({ icon, onPress }: IconButtonProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View style={[styles.container]}>
        <Image source={icons[icon]} style={styles.image} contentFit="contain" />
      </View>
    </PressableScale>
  );
};

export const MessageBox = ({ icon, onPress }: IconButtonProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View style={[styles.containermessage]}>
        <Image
          source={icons[icon]}
          style={styles.imageMessage}
          contentFit="contain"
        />
      </View>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  containermessage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(50),
    height: scale(50),
    backgroundColor: 'black',
    borderRadius: scale(8),
  },
  imageMessage: {
    height: scale(30),
    width: scale(30),
    tintColor: 'white',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(50),
    height: scale(50),
    backgroundColor: '#F2F2F3',
    borderRadius: scale(8),
  },
  image: {
    height: scale(30),
    width: scale(30),
    tintColor: 'tint',
  },
});
