
import React from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { Image } from "expo-image";
import { icons } from "@/assets/icons";
import type { Role } from "@/services/api/roles";
import { PressableScale, Text, View } from "@/ui";

type RoleItemProps = {
  data: Role;
  showStatus?: boolean;
  onPress: () => void;
  onOptionPress: () => void;
};

export const RoleItem = ({ data, onPress, onOptionPress }: RoleItemProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View
        flexDirection={"row"}
        paddingHorizontal={"large"}
        borderBottomColor={"grey400"}
        borderBottomWidth={StyleSheet.hairlineWidth}
        backgroundColor={"white"}
        paddingVertical={"medium"}
      >
        <View flex={1} paddingLeft={"medium"}>
          <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Text variant={"medium14"} color={"grey200"}>
              {data?.name}
            </Text>
            <PressableScale onPress={() => onOptionPress?.()}>
              <Image
                source={icons["more-horizontal"]}
                style={style.dot}
                contentFit="contain"
              />
            </PressableScale>
          </View>
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

