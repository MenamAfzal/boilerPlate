import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";
import { icons } from "@/assets/icons";
import { CompanyButton } from "@/components/company-button";
import SettingsItem from "@/components/settings-item";
import { useUser } from "@/store/user";
import type { Theme } from "@/theme";
import { Screen, Text, View } from "@/ui";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";

export const Settings = () => {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const company = useUser((state) => state?.company);

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <View flex={1}>
        <View height={scale(119)}>
          <Image source={icons["back-cover"]} style={{ height: scale(119), width: width }} />
        </View>

        <View
          alignSelf={"flex-start"}
          marginLeft={"large"}
          style={{
            marginTop: -scale(43),
          }}
        >
          <CompanyButton
            icon="company"
            onPress={() => null}
            size={scale(86)}
            imageSize={scale(86)}
          />
        </View>

        <View paddingHorizontal={"large"} paddingVertical={"large"}>
          <Text variant={"semiBold20"} textTransform={"capitalize"} color={"black"}>
            {company?.name}
          </Text>
          <Text variant={"regular13"} color={"grey200"}>
            {company?.short_description}
          </Text>
        </View>

        <View height={StyleSheet.hairlineWidth * 2} backgroundColor={"grey500"} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View paddingHorizontal={"large"} gap={"medium"} paddingTop={"medium"}>
            <SettingsItem
              icon="company-page"
              title="Company Page"
              onPress={() => navigation.navigate("CompanyDetail")}
            />
            <SettingsItem
              icon="person"
              title="User Management"
              onPress={() => navigation.navigate("Users")}
            />
            <SettingsItem
              icon="person"
              title=" Roles Management"
              onPress={() => navigation.navigate("Roles")}
            />
            <SettingsItem
              icon="person"
              title="Recruitment Process"
              onPress={() => navigation.navigate("RecruitmentProcess")}
            />
            {/* <SettingsItem
              icon="person"
              title="JD Library"
              onPress={() => navigation.navigate("JdLibrary")}
            /> */}
            <SettingsItem
              icon="person"
              title="My Account"
              onPress={() => navigation.navigate("MyAccount")}
            />
            <SettingsItem
              icon="credit-card"
              title="Payments"
              onPress={() => navigation.navigate("Payments")}
            />
            {/* <SettingsItem
              icon="settings"
              title="Settings"
              onPress={() => navigation.navigate("UserSettings")}
            /> */}
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: scale(160),
  },
});

export default Settings;

