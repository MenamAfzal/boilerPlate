import React from "react";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native";
import { View, Text } from "@/ui";
import { scale } from "react-native-size-matters";

type LoaderProps = {
  isVisible: boolean;
};

const Loader = ({ isVisible }: LoaderProps) => {
  return (
    <Modal isVisible={isVisible}>
      <View alignItems={"center"} justifyContent="center">
        <View
          backgroundColor={"white"}
          paddingHorizontal="2xl"
          paddingVertical={"small"}
          borderRadius={scale(5)}
        >
          <ActivityIndicator color={"blue"} />
          <Text variant={"body"} color="black">
            Uploading...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
