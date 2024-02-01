import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { icons } from "@/assets/icons";
import { Avatar } from "@/components/avatar";
import { PressableScale, Text, View } from "@/ui";
import { User } from "@/services/api/user";
import { Status } from "@/components/status-info";

type UserItemProps = {
  data: User;
  onOptionPress: (data: User) => void;
};

export const UserItem = ({ data, onOptionPress }: UserItemProps) => {
  return (
    <View
      flexDirection={"row"}
      paddingHorizontal={"large"}
      borderBottomColor={"grey400"}
      borderBottomWidth={StyleSheet.hairlineWidth}
      backgroundColor={"white"}
      paddingVertical={"medium"}
    >
      <View>
        <Avatar
          transition={1000}
          source={{ uri: "https://fakeimg.pl/400x400/cccccc/cccccc" }}
          placeholder={{ uri: "https://fakeimg.pl/400x400/cccccc/cccccc" }}
        />
      </View>

      <View flex={1} paddingLeft={"medium"}>
        <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <View flexDirection={"row"} alignItems={"center"}>
            <Text
              variant={"semiBold14"}
              marginRight={"medium"}
              textTransform={"capitalize"}
              color={"black"}
            >
              {data?.person_name}
            </Text>
            <Status status={data?.isactive === "0" ? "Pending" : "Active"} />
          </View>

          <PressableScale onPress={() => onOptionPress?.(data)}>
            <Image source={icons["more-horizontal"]} style={style.dot} contentFit="contain" />
          </PressableScale>
        </View>

        <Text variant={"regular13"} marginVertical={"tiny"} color={"grey100"}>
          {data?.email}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  dot: {
    width: scale(24),
    height: scale(24),
  },
});

