import React from "react";
import { ScreenHeader } from "@/components/screen-header";
import SettingsItem from "@/components/settings-item";
import type { Theme } from "@/theme";
import { Screen, View } from "@/ui";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";

export const Payments = () => {
  const { colors } = useTheme<Theme>();

  const { navigate } = useNavigation();

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader title={"Payments"} showBorder={true} />

      <View flex={1}>
        <View paddingHorizontal={"large"} gap={"medium"} paddingTop={"large"}>
          <SettingsItem
            icon="credit-card"
            title="Payment Methods"
            onPress={() => navigate("PaymentMethods")}
          />
          <SettingsItem
            icon="list"
            title="Your Payments"
            onPress={() => navigate("MyPayments")}
          />
        </View>
      </View>
    </Screen>
  );
};

