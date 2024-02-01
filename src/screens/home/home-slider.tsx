import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

import { useTopVacancies } from "@/services/api/vacancies";
import { useUser } from "@/store/user";
import { PressableScale, Text, View } from "@/ui";

import { HomeSliderItem } from "./slider-item";
import { useRefreshOnFocus } from "@/hooks";

export const HomeSliderContainer = ({}) => {
  const company = useUser((state) => state?.company);

  const { data, refetch } = useTopVacancies({
    variables: {
      id: company?.id,
    },
  });

  useRefreshOnFocus(refetch);

  console.log("data", JSON.stringify(data?.response?.data, null, 2));

  return (
    <View backgroundColor={"secondary"} paddingTop={"large"}>
      <View
        flexDirection={"row"}
        paddingHorizontal={"xLarge"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text variant={"medium16"} color={"black"}>
          Recent Jobs
        </Text>
        <PressableScale>
          <Text color={"primary"} variant={"regular13"} textDecorationLine={"underline"}>
            See All
          </Text>
        </PressableScale>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {data?.response?.data?.map((element, index) => {
          return <HomeSliderItem data={element} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingTop: scale(8),
    paddingBottom: scale(16),
  },
});
