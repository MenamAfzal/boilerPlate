import React from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { Text, View } from "@/ui";
import { AddButton } from "@/components/add-button";

type HeaderProps = {
  onPress: () => void;
};

const Header = ({ onPress }: HeaderProps) => {
  return (
    <View
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      backgroundColor={"white"}
      paddingHorizontal={"large"}
      style={style.container}
      borderBottomColor={"grey500"}
      borderBottomWidth={1}
    >
      <View flexDirection={"column"}>
        <Text variant={"medium17"} fontWeight={"500"}>
          Vacancies
        </Text>
      </View>
      <AddButton label="Job" onPress={onPress} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: scale(56),
  },
});

export default Header;
