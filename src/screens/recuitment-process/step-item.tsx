import React from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { Image } from "expo-image";
import { icons } from "@/assets/icons";
import type { Step } from "@/services/api/recruitment-process";
import { PressableScale, Text, View } from "@/ui";

type StepItemProps = {
  data: Step;
  onPress: (data: Step) => void;
  onOptionPress: (data: Step) => void;
};

export const StepItem = ({ data, onOptionPress, onPress }: StepItemProps) => {
  return (
    <PressableScale onPress={() => onPress(data)}>
      <View
        flexDirection={"row"}
        paddingHorizontal={"large"}
        backgroundColor={"white"}
        paddingVertical={"medium"}
        gap={"medium"}
        alignItems={"center"}
      >
        <View
          height={scale(32)}
          backgroundColor={"primary"}
          width={scale(32)}
          borderRadius={scale(16)}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text variant={"semiBold16"} color={"white"}>
            {data?.sort_order}
          </Text>
        </View>

        <View flex={1} backgroundColor={"grey500"} borderRadius={scale(8)} padding={"medium"}>
          <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Text variant={"medium14"} color={"black"}>
              {data?.step_name}
            </Text>
            <PressableScale onPress={() => onOptionPress?.(data)}>
              <Image
                source={icons["more-horizontal"]}
                style={style.dot}
                contentFit="contain"
              />
            </PressableScale>
          </View>
          <Text variant={"regular12"} maxWidth={scale(210)} color="grey200">
            {data?.description}
          </Text>
        </View>
      </View>
    </PressableScale>
  );
};

const style = StyleSheet.create({
  dot: {
    width: scale(24),
    height: scale(24),
  },
});

