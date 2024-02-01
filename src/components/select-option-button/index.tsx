import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import { PressableScale, Text, View } from '@/ui';

type SelectOptionButtonProps = {
  label: string;
  isSelected: boolean;
  icon: IconTypes;
  selectedText: string;
  onPress: () => void;
  error?: string;
};

export const SelectOptionButton = ({
  label,
  isSelected,
  icon,
  selectedText,
  onPress,
  error,
}: SelectOptionButtonProps) => {
  return (
    <View>
      {label && (
        <Text paddingVertical={'small'} variant="medium14" color={'black'}>
          {label}
        </Text>
      )}

      <PressableScale onPress={onPress}>
        <View
          borderRadius={scale(8)}
          paddingHorizontal="medium"
          flexDirection={'row'}
          alignItems="center"
          height={scale(49)}
          backgroundColor={'grey500'}
        >
          <Text
            variant={'medium14'}
            flex={1}
            color={isSelected ? 'black' : 'grey300'}
          >
            {selectedText}
          </Text>
          <Image source={icons[icon]} style={styles.icon} />
        </View>
      </PressableScale>

      {error && (
        <Text variant={'regular14'} paddingTop={'small'} color={'error'}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: scale(20),
    width: scale(20),
  },
});
