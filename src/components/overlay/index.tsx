import { useWindowDimensions } from "react-native";
import React from "react";
import { View } from "@/ui";
import { AppOverlayContent } from "./loader-content";
import { useLoading } from "@/store/loader";
import Modal from "react-native-modal";

export const AppOverlayLoader = () => {
  const { width, height } = useWindowDimensions();
  const isVisible = useLoading((state) => state.isLoading);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationOutTiming={500}
      animationInTiming={500}
      isVisible={isVisible}
      style={{ backgroundColor: "rgba(0,0,0,0)", margin: 0, padding: 0 }}
      backdropOpacity={0.2}
    >
      <View width={width} height={height} backgroundColor="transparent">
        <AppOverlayContent />
      </View>
    </Modal>
  );
};
