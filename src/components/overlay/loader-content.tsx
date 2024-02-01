import React from "react";
import { View } from "@/ui";
import { ActivityIndicator } from "react-native";

export const AppOverlayContent = () => {
  return (
    <View flex={1} justifyContent={"center"} alignItems={"center"}>
      <ActivityIndicator size={"large"} color={"blue"} />
    </View>
  );
};
