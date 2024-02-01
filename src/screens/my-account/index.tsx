import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { ScreenHeader } from "@/components/screen-header";
import SettingsItem from "@/components/settings-item";
import type { Theme } from "@/theme";
import { PressableScale, Screen, Text, View } from "@/ui";
import { scale } from "react-native-size-matters";

export const MyAccount = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title={"My Account"} showBorder={true} />

      <View flex={1}>
        <View paddingHorizontal={"large"} gap={"medium"} paddingTop={"large"}>
          <SettingsItem
            icon="book"
            title="Personal Information"
            onPress={() => navigate("PersonalInformation")}
          />
          <SettingsItem
            icon="people"
            title="Login And Security"
            onPress={() => navigate("LoginAndSecurity")}
          />
        </View>

        <View flex={1} justifyContent={"flex-end"} marginBottom={"large"}>
          <PressableScale>
            <View
              height={scale(56)}
              backgroundColor={"grey500"}
              justifyContent={"center"}
              alignItems={"center"}
              marginHorizontal={"large"}
              borderRadius={scale(8)}
            >
              <Text variant={"medium16"} color={"error"}>
                Delete Account
              </Text>
            </View>
          </PressableScale>
        </View>
      </View>
    </Screen>
  );
};

