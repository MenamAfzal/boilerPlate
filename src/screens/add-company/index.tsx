import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import { ScreenHeader } from "@/components/screen-header";
import { useSoftKeyboardEffect } from "@/hooks";
import { useCompanyInformation } from "@/services/api/auth/company-information";
import { useCompanies } from "@/services/api/company";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, Text, View } from "@/ui";
import { DescriptionField } from "@/ui/description-field";
import { showErrorMessage, showSuccessMessage } from "@/utils";
import { queryClient } from "@/services/api/api-provider";

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

export type AddCompanyFormType = z.infer<typeof schema>;

export const AddCompany = () => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();

  useSoftKeyboardEffect();

  const { mutate: AddCompanyApi, isLoading } = useCompanyInformation();

  const { handleSubmit, control } = useForm<AddCompanyFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: AddCompanyFormType) => {
    AddCompanyApi(
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
            goBack();
            showSuccessMessage("Company added successfully");
            queryClient.invalidateQueries(useCompanies.getKey());
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
            label="Add"
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
