
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import StepIndicator from "@/components/indicator-2";
import { ScreenHeader } from "@/components/screen-header";
import { useSoftKeyboardEffect } from "@/hooks";
import { useCompanyInformation } from "@/services/api/auth/company-information";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, Text, View } from "@/ui";
import { DescriptionField } from "@/ui/description-field";
import { showErrorMessage } from "@/utils";
import { setUserCompanyWithRoles } from "@/store/user";

const labels = ["Registration", "Information", "Invite"];

const schema = z.object({
  companyName: z.string({
    required_error: "Company name is required",
  }),
  description: z
    .string({
      required_error: "Company detail is required",
    })
    .max(500, "Details must be max 500 characters"),
  location: z.string({
    required_error: "Location is required",
  }),
});

export type CompanyInformationFormType = z.infer<typeof schema>;

export const CompanyInformation = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  useSoftKeyboardEffect();

  const { mutate: companyInformationApi, isLoading } = useCompanyInformation();

  const { handleSubmit, control } = useForm<CompanyInformationFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: CompanyInformationFormType) => {
    companyInformationApi(
      {
        company_name: data?.companyName,
        company_description: data?.description,
        google_location: data?.location,
        country_id: "pakistan",
        city_id: "lahore",
      },
      {
        onSuccess: (data) => {
          console.log("data", JSON.stringify(data, null, 2));
          if (data?.response?.status === 200) {
            //@ts-ignore
            setUserCompanyWithRoles(data?.response);
            navigate("SendInvite");
          } else {
            showErrorMessage(data.response.message);
          }
        },
        onError: (error) => {
          // An error happened!
          console.log("error", error?.response?.data);
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader />

      <View paddingHorizontal={"large"} backgroundColor={"grey500"} paddingBottom={"medium"}>
        <StepIndicator stepCount={3} currentPosition={1} labels={labels} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View flex={1} paddingHorizontal={"large"}>
          <View height={scale(12)} />

          <View paddingTop={"large"}>
            <Text variant={"semiBold24"} color={"black"}>
              Company Information
            </Text>
            <Text variant={"regular14"} paddingTop={"small"} color={"grey100"}>
              Complete your profile by adding further information
            </Text>
          </View>

          <View paddingTop={"large"}>
            <ControlledInput
              placeholder="Enter company name"
              label="Company Name"
              control={control}
              name="companyName"
            />
            <View height={scale(8)} />
            <DescriptionField
              placeholder="Enter company details"
              label="About Company"
              control={control}
              name="description"
            />
            <View height={scale(8)} />
            <ControlledInput
              placeholder="Enter location"
              label="Location"
              control={control}
              name="location"
            />
          </View>
          <View height={scale(24)} />
          <Button
            label="Next"
            //onPress={() => navigate("SendInvite")}
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: scale(40),
  },
});

