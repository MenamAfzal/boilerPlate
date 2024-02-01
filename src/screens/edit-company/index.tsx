import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
import { icons } from "@/assets/icons";
import { CompanyButton } from "@/components/company-button";
import { ScreenHeader } from "@/components/screen-header";
import { useSoftKeyboardEffect } from "@/hooks";
import { queryClient } from "@/services/api/api-provider";
import { useCompanies, useEditCompany, useGetCompanyDetails } from "@/services/api/company";
import { useUser } from "@/store/user";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, View } from "@/ui";
import { DescriptionField } from "@/ui/description-field";
import { showErrorMessage, showSuccessMessage } from "@/utils";

const schema = z.object({
  companyName: z.string({
    required_error: "Company name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  phone: z.string({
    required_error: "phone is required",
  }),

  website: z.string({
    required_error: "Website is required",
  }),
  bio: z.string({
    required_error: "Bio is required",
  }),
  employees: z.string().optional(),
  wage: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  location: z.string().optional(),
  facebook: z.string().optional(),
  instgram: z.string().optional(),
  whatsapp: z.string().optional(),
});

export type EditCompanyFormType = z.infer<typeof schema>;

export const EditCompany = () => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();
  const route = useRoute<any>();
  const { width } = useWindowDimensions();

  useSoftKeyboardEffect();

  const company = useUser((state) => state?.company);

  const { mutate: editCompanyApi, isLoading } = useEditCompany();

  const data = route?.params?.data;

  const { handleSubmit, control, setValue } = useForm<EditCompanyFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: data?.name,
      email: data?.email,
      phone: data?.location?.phone,
      website: data?.location?.website,
      bio: data?.short_description,
      employees: data?.no_of_employees,
      wage: data?.average_wage,
      address: data?.location?.address_1,
      city: data?.location?.city_name,
      country: data?.location?.country_name,
      facebook: data?.facebook_link,
      instgram: data?.instagram_link,
      whatsapp: data?.twitter_link,
    },
  });

  const onSubmit = (data: EditCompanyFormType) => {
    editCompanyApi(
      {
        name: data?.companyName,
        email: data?.email,
        contact_number: data?.phone,
        no_of_employees: parseInt(data?.employees),
        start_time: "9 am",
        end_time: "6 pm",
        average_wage: parseInt(data?.wage),
        languages: [1, 2],
        categories: [1, 2],
        company_id: company?.id,
        short_description: data?.bio,
        facebook_link: data?.facebook,
        instagram_link: data?.instgram,
        twitter_link: data?.whatsapp,
        locations: {
          address_1: data?.address,
          address_2: "",
          city_id: "1",
          country_id: "1",
          phone: data?.phone,
          email: data?.email,
          website: data?.website,
          web_location: "",
          longitude: "0.00000",
          latitude: "0.0000",
          google_location: data?.location,
        },
      },
      {
        onSuccess: (responseData) => {
          console.log("responseData", JSON.stringify(responseData, null, 2));

          if (responseData?.status === 200) {
            showSuccessMessage(responseData?.message ?? "");
            queryClient.invalidateQueries(useCompanies.getKey());
            queryClient.invalidateQueries(useGetCompanyDetails.getKey());
            goBack();
          } else {
            showErrorMessage(responseData?.message ?? "");
          }
        },
        onError: (error) => {
          //@ts-ignore
          showErrorMessage(error?.response?.data?.message ?? "");
        },
      }
    );
  };

  useEffect(() => {
    setValue("bio", data?.short_description);
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader title="vFairs" showBorder={true} />

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

        <View height={scale(44)} />

        <View paddingTop={"large"} paddingHorizontal={"large"} rowGap={"small"}>
          <ControlledInput
            placeholder="Enter company name"
            label="Company Name"
            control={control}
            name="companyName"
          />

          <ControlledInput
            placeholder="Enter company email"
            label="Company Email"
            control={control}
            name="email"
          />

          <ControlledInput
            placeholder="Enter contact number"
            label="Contact Number"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter website"
            label="Website"
            control={control}
            name="website"
          />
          <DescriptionField placeholder="Enter bio" label="Bio" control={control} name="bio" />
          <ControlledInput
            placeholder="Enter how many employees you have."
            label="Number Employess"
            control={control}
            name="employees"
          />
          <ControlledInput
            placeholder="Enter average wage"
            label="Average"
            control={control}
            name="wage"
          />
          <ControlledInput
            placeholder="Enter address"
            label="Address"
            control={control}
            name="address"
          />
          <ControlledInput
            placeholder="Enter city"
            label="City"
            control={control}
            name="city"
          />
          <ControlledInput
            placeholder="Enter country"
            label="Country"
            control={control}
            name="country"
          />
          <ControlledInput
            placeholder="Enter postal code"
            label="Postal code"
            control={control}
            name="postalCode"
          />
          <ControlledInput
            placeholder="Enter location."
            label="Location"
            control={control}
            name="location"
          />
          <ControlledInput
            placeholder="Enter facebook"
            label="Facebook"
            control={control}
            name="facebook"
          />
          <ControlledInput
            placeholder="Enter instagram"
            label="Instgram"
            control={control}
            name="instgram"
          />
          <ControlledInput
            placeholder="Enter whatsapp."
            label="Whatsapp"
            control={control}
            name="whatsapp"
          />
        </View>
        <View height={scale(24)} />
        <View flex={1} justifyContent={"flex-end"} paddingHorizontal={"large"}>
          <Button label="Update" onPress={handleSubmit(onSubmit)} loading={isLoading} />
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

