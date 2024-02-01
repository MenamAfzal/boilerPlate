import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

import type { IconTypes } from "@/assets/icons";
import { icons } from "@/assets/icons";
import { Pressable, Text } from "@/ui";

type SelectModalItemProps = {
  title: string;
  onPress: (data: any) => void;
  icon?: IconTypes;
  item?: any;
};

export const SelectModalItem = ({ title, icon, onPress, item }: SelectModalItemProps) => {
  return (
    <Pressable
      onPress={() => onPress?.(item ? item : title)}
      flexDirection={"row"}
      alignItems={"center"}
      height={scale(37)}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      {icon ? <Image source={icons[icon]} style={styles.image} contentFit="contain" /> : null}

      <Text variant={"medium14"} color={"grey200"}>
        {item ? item?.name : title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: scale(20),
    width: scale(20),
    marginRight: scale(8),
  },
});
