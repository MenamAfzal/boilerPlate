import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
import { icons } from "@/assets/icons";
import StepIndicator from "@/components/indicator-2";
import { ScreenHeader } from "@/components/screen-header";
import { usePostJobMutation } from "@/services/api/post-job";
import { usePostJob } from "@/store/post-job";
import type { Theme } from "@/theme";
import { Button, Screen, Text, View } from "@/ui";
import { showErrorMessage } from "@/utils";

const labels = ["Job Detail", "Post Description", "Post Detail", "Preview"];

export const PostJobPreview = () => {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const jobStep1 = usePostJob((state) => state?.job);
  const jobStep2 = usePostJob((state) => state?.jobStep2);
  const description = usePostJob((state) => state?.description);
  const description2 = usePostJob((state) => state?.description2);
  const company = usePostJob((state) => state?.company);

  const { mutate: postJobApi, isLoading } = usePostJobMutation();

  const html = `<html><head><meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">${description?.css}</head><body>${description?.content}</body></html>`;

  const postAJob = () => {
    let education = jobStep1?.education?.split(",");
    let experience = jobStep1?.experience?.split(",");
    let jobType = jobStep1?.jobType?.split(",");

    let jobCategory = jobStep2?.jobCategory?.split(",");

    let body = {
      job_title_id: jobStep1?.title,
      job_description_id: 1,
      job_description: description2, //html,
      education_levels: [education[1]],
      short_description: "short description",
      company_id: company?.id,
      skills: jobStep1?.skills,
      deadline_date: jobStep2?.date,
      experience_levels: [experience[1]],
      city_id: 1,
      country_id: 1,
      google_location: jobStep2?.location,
      company_recruitment_process_id: 1,
      job_status: "published",
      job_type_id: jobType[0],
      job_category_id: jobCategory[0],
      lat: 0,
      lng: 0,
    };

    // @ts-ignore
    postJobApi(body, {
      onSuccess: (responseData) => {
        if (responseData?.response?.status === 200) {
          navigation?.navigate("JobPosted");
        } else {
          showErrorMessage(responseData?.response?.message ?? "Error while posting a job");
        }
      },
      onError: (error) => {
        //@ts-ignore
        showErrorMessage(
          //@ts-ignore
          error?.response?.data?.message ?? "Error while posting a job"
        );
      },
    });
  };

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader />
      <View paddingHorizontal={"large"} backgroundColor={"grey500"} paddingBottom={"medium"}>
        <StepIndicator stepCount={4} currentPosition={3} labels={labels} />
      </View>

      <ScrollView>
        <View paddingTop={"large"} flex={1} paddingHorizontal={"large"}>
          <Text variant={"regular13"} color={"grey200"}>
            This is a preview of what your job post will look like to job seekers.
          </Text>

          <View
            flex={1}
            borderWidth={1}
            borderColor={"grey300"}
            marginVertical={"medium"}
            borderRadius={scale(8)}
          >
            <View
              padding={"medium"}
              flexDirection={"row"}
              borderBottomColor={"grey300"}
              borderBottomWidth={1}
            >
              <Image
                source={icons.company}
                style={{ height: scale(72), width: scale(72) }}
                contentFit="contain"
              />
              <View paddingHorizontal={"small"} flex={1}>
                <Text variant={"medium14"} color={"black"}>
                  {jobStep1?.title}
                </Text>
                <Text paddingTop={"tiny"} variant={"medium12"} color={"grey100"}>
                  {jobStep2?.location},{"  "}
                  {/* <Text variant={"regular12"} color={"grey200"}>
                  in Manchester
                </Text> */}
                </Text>

                <View
                  columnGap={"small"}
                  paddingTop={"small"}
                  flexDirection={"row"}
                  rowGap={"small"}
                  flexWrap={"wrap"}
                  alignItems={"center"}
                >
                  {jobStep1?.skills?.map((item, index) => {
                    return (
                      <View
                        backgroundColor={"secondary"}
                        paddingHorizontal={"small"}
                        paddingVertical={"tiny"}
                        key={index}
                      >
                        <Text variant={"medium10"}>{item}</Text>
                      </View>
                    );
                  })}
                </View>

                <Text variant={"regular10"} paddingTop={"small"} color={"grey300"}>
                  Posted 6 hours ago
                </Text>
              </View>
            </View>

            <View padding={"medium"}>
              <WebView
                style={{
                  height: height,
                }}
                useWebKit={true}
                scrollEnabled={true}
                hideKeyboardAccessoryView={true}
                keyboardDisplayRequiresUserAction={false}
                originWhitelist={["*"]}
                dataDetectorTypes={"none"}
                domStorageEnabled={false}
                bounces={false}
                javaScriptEnabled={true}
                //source={{ html }}
                source={{
                  html: description2,
                }}
                onError={(error) => {
                  console.log("error", error);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        paddingVertical={"large"}
        paddingBottom={"large"}
        borderTopWidth={1}
        borderTopColor={"grey400"}
      >
        <Button
          label="Next"
          marginHorizontal={"large"}
          onPress={postAJob}
          loading={isLoading}
        />
        <View height={bottom} />
      </View>
    </Screen>
  );
};
