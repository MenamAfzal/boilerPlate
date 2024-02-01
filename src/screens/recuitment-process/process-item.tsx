import React from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { Image } from "expo-image";
import { icons } from "@/assets/icons";
import type { Process } from "@/services/api/recruitment-process";
import { PressableScale, Text, View } from "@/ui";
import { useNavigation } from "@react-navigation/native";

type ProcessItemProps = {
  data: Process;
  //onPress: (data: Process) => void;
  onOptionPress: (data: Process) => void;
};

export const ProcessItem = ({ data, onOptionPress }: ProcessItemProps) => {
  const { navigate } = useNavigation();

  return (
    <PressableScale onPress={() => navigate("Steps", { id: data?.id })}>
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
              {data?.process_name}
            </Text>
            <PressableScale onPress={() => onOptionPress?.(data)}>
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
