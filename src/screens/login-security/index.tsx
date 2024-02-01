import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { ScreenHeader } from "@/components/screen-header";
import type { Theme } from "@/theme";
import { PressableScale, Screen, Text, View } from "@/ui";
import { scale } from "react-native-size-matters";

export const LoginAndSecurity = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader title={"Login & Security"} showBorder={true} />

      <View flex={1} paddingHorizontal={"large"}>
        <View height={scale(16)} />
        <Text variant={"semiBold24"} color={"black"} marginVertical={"large"}>
          Login
        </Text>

        <View paddingVertical={"medium"} borderBottomColor={"grey300"} borderBottomWidth={1}>
          <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Text variant={"semiBold16"} color={"black"}>
              Password
            </Text>
            <PressableScale onPress={() => navigate("ChangePassword")}>
              <Text variant={"regular16"} color={"primary"}>
                Update
              </Text>
            </PressableScale>
          </View>
          <Text paddingTop={"small"} variant={"regular16"} color={"grey200"}>
            Last updated 14 days ago
          </Text>
        </View>
        <View height={scale(12)} />
        <Text
          variant={"semiBold24"}
          // marginTop={"medium"}
          color={"black"}
          marginVertical={"large"}
        >
          Socil Accounts
        </Text>

        <View paddingVertical={"medium"} borderBottomColor={"grey300"} borderBottomWidth={1}>
          <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Text variant={"semiBold16"} color={"black"}>
              Facebook
            </Text>
            <PressableScale>
              <Text variant={"regular16"} color={"primary"}>
                Connect
              </Text>
            </PressableScale>
          </View>
          <Text paddingTop={"small"} variant={"regular16"} color={"grey200"}>
            Not Connected
          </Text>
        </View>

        <View paddingVertical={"medium"} borderBottomColor={"grey300"} borderBottomWidth={1}>
          <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Text variant={"semiBold16"} color={"black"}>
              Google
            </Text>
            <PressableScale>
              <Text variant={"regular16"} color={"primary"}>
                Connect
              </Text>
            </PressableScale>
          </View>
          <Text paddingTop={"small"} variant={"regular16"} color={"grey200"}>
            Not Connected
          </Text>
        </View>
      </View>
    </Screen>
  );
};
