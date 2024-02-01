import React from "react";
import {} from "react-native";
import { scale } from "react-native-size-matters";
import { AvatarGroup } from "@/components/avatar-group";
import type { Job } from "@/services/api/vacancies";
import { Text, View } from "@/ui";

type HomeSliderItemProps = {
  data: Job;
};

export const HomeSliderItem = ({ data }: HomeSliderItemProps) => {
  //console.log("data", JSON.stringify(data, null, 2));

  return (
    <View
      marginRight={"medium"}
      borderRadius={scale(8)}
      padding={"large"}
      backgroundColor={"white"}
      height={scale(119)}
      width={scale(256)}
    >
      <Text variant={"medium17"}>{data?.job_titles}</Text>
      <Text variant={"regular13"} color={"primary"} paddingTop={"small"}>
        {data?.applicants?.length} new applicants
      </Text>

      <View paddingTop={"small"}>
        <AvatarGroup data={data?.applicants} />
      </View>
    </View>
  );
};
