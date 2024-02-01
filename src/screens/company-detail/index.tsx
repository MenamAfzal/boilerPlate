import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";
import { icons } from "@/assets/icons";
import { CompanyButton } from "@/components/company-button";
import { ScreenHeader } from "@/components/screen-header";
import { useUser } from "@/store/user";
import type { Theme } from "@/theme";
import { Screen, Text, View } from "@/ui";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
import { useGetCompanyDetails } from "@/services/api/company";

const InfoRow = ({ label, value, isGrey = true }) => {
  return (
    <View
      flexDirection={"row"}
      paddingVertical={"medium"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingHorizontal={"large"}
      borderBottomColor={"grey500"}
      borderBottomWidth={1}
    >
      <Text variant={"regular14"} color={"grey200"}>
        {label}
      </Text>
      <Text variant={"medium14"} color={isGrey ? "grey100" : "info"}>
        {value}
      </Text>
    </View>
  );
};

export const CompanyDetail = () => {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const company = useUser((state) => state?.company);

  const { data } = useGetCompanyDetails({
    variables: {
      id: company?.id,
    },
  });

  console.log("data", JSON.stringify(data, null, 2));

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader title={company?.name} showBorder={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View height={scale(119)}>
          <Image source={icons["back-cover"]} style={{ height: scale(119), width: width }} />
          <View
            alignSelf={"flex-start"}
            position={"absolute"}
            // bottom={0}
            marginLeft={"large"}
            style={{
              bottom: -scale(43),
            }}
          >
            <CompanyButton
              icon="company"
              onPress={() => null}
              size={scale(86)}
              imageSize={scale(86)}
            />
          </View>
        </View>

        <View padding={"large"}>
          <View position={"absolute"} right={scale(16)} bottom={0}>
            <CompanyButton
              icon="pencl"
              onPress={() => navigation.navigate("EditCompany", { data })}
              size={scale(24)}
              imageSize={scale(24)}
            />
          </View>
        </View>
        <View height={scale(19)} />
        <View paddingHorizontal={"large"} paddingVertical={"large"}>
          <Text variant={"semiBold20"} textTransform={"capitalize"} color={"black"}>
            {data?.name}
          </Text>
          <Text variant={"regular13"} color={"grey200"}>
            {data?.short_description}
          </Text>
        </View>

        <View paddingHorizontal={"large"} paddingTop={"medium"}>
          <Text variant={"medium20"} color={"black"}>
            About Company
          </Text>

          <Text paddingTop={"small"} variant={"regular14"} color={"grey200"} lineHeight={21} />
        </View>

        <View height={scale(16)} />

        <View paddingTop={"large"}>
          <Text paddingHorizontal={"large"} variant={"medium20"} color={"black"}>
            Company Detail
          </Text>

          <InfoRow label={"Email"} value={data?.email} isGrey={false} />
          <InfoRow label={"Phone Number"} value={data?.location?.phone} isGrey={false} />
          <InfoRow label={"Website"} value={data?.location?.website} isGrey={false} />
          <InfoRow label={"Employees"} value={data?.no_of_employees} isGrey={true} />
          <InfoRow
            label={"Category"}
            value={data?.categories?.map((element) => `${element?.name},`)}
            isGrey={true}
          />
          <InfoRow
            label={"Industry"}
            value={data?.industries?.map((element) => `${element?.name},`)}
            isGrey={true}
          />
          <InfoRow
            label={"Work Time"}
            value={`${data?.start_time}-${data?.end_time}`}
            isGrey={true}
          />
          <InfoRow label={"Average Wage"} value={data?.average_wage} isGrey={true} />
        </View>

        <View paddingTop={"large"}>
          <Text paddingHorizontal={"large"} variant={"medium20"} color={"black"}>
            Social Links
          </Text>

          <InfoRow label={"Facebook"} value={data?.facebook_link} isGrey={true} />
          <InfoRow label={"Instagram"} value={data?.instagram_link} isGrey={true} />
          <InfoRow label={"Twitter"} value={data?.twitter_link} isGrey={true} />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: scale(160),
  },
});

