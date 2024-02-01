import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import React from "react";
import { ScrollView } from "react-native";
import { scale } from "react-native-size-matters";
import ActivityIndicator from "@/components/activity-indicator";
import { ScreenHeader } from "@/components/screen-header";
import { useJobDetail } from "@/services/api/vacancies";
import type { Theme } from "@/theme";
import { Button, PressableScale, Screen, Text, View } from "@/ui";
import ApplicantList from "../applicants/applicants-list";
import Footer from "./footer-chart";
import OverviewJob from "./overview-job";
import VacanciesStatus from "./vacancy-status";
import { ImageButton } from "@/components";

const JobDetail = () => {
  const { colors } = useTheme<Theme>();

  const { navigate } = useNavigation();
  const { params } = useRoute();

  const { data: jobData, isLoading } = useJobDetail({
    variables: {
      //@ts-ignore
      id: params?.id,
    },
  });

  let data = jobData?.response?.data;

  console.log("data", JSON.stringify(data, null, 2));

  const RenderLoader = () => {
    return (
      <View flex={1} justifyContent={"center"} alignItems={"center"}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader icon="close" showBorder={true} />

      {isLoading ? (
        <RenderLoader />
      ) : (
        <View flex={1}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: scale(60),
            }}
          >
            <OverviewJob
              title={data?.job_titles}
              city={data?.city_name}
              country={data?.country_name}
              applicants={data?.applicants}
              companyName={data?.company_name}
            />
            <View height={scale(10)} backgroundColor={"grey500"} />
            <VacanciesStatus applicants={data?.applicants} />

            <View
              flexDirection={"row"}
              paddingHorizontal={"large"}
              alignItems={"center"}
              justifyContent={"space-between"}
              backgroundColor={"grey500"}
              paddingVertical={"large"}
              style={{
                marginTop: -scale(16),
              }}
            >
              <Text variant={"medium16"} color={"black"}>
                High Matches
              </Text>

              <PressableScale
                onPress={() => {
                  //@ts-ignore
                  navigate("Applicants", { id: params?.id });
                }}
              >
                <Text color={"primary"} variant={"regular13"} textDecorationLine={"underline"}>
                  See All
                </Text>
              </PressableScale>
            </View>

            <View>
              {data?.applicants?.map((item, index) => {
                return (
                  <ApplicantList
                    key={index}
                    data={item}
                    onPress={() => navigate("Job")}
                    onOptionPress={() => null}
                  />
                );
              })}
            </View>
            <View height={scale(16)} backgroundColor={"grey500"} />
            {/* <Footer /> */}
          </ScrollView>
        </View>
      )}
      <View
        flexDirection={"row"}
        backgroundColor={"white"}
        height={scale(80)}
        borderColor={"grey400"}
        borderTopWidth={1}
        justifyContent={"space-around"}
        paddingTop={"large"}
        paddingHorizontal={"large"}
        gap={"medium"}
      >
        <View flex={1}>
          <Button
            variant={"outline"}
            label="View Applicant"
            //@ts-ignore
            onPress={() => navigate("Applicants", { id: params?.id })}
          />
        </View>

        <ImageButton
          icon="more-horizontal"
          backgroundColor={"grey500"}
          size={scale(44)}
          onPress={() => null}
        />
      </View>
    </Screen>
  );
};

export default JobDetail;
