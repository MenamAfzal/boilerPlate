import React from "react";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { icons } from "@/assets/icons";
import type { Job } from "@/services/api/vacancies";
import { PressableScale, Text, View } from "@/ui";
import { timeAgo } from "@/utils";

type VecanciesListProps = {
  data: Job;
  onOptionPress: (data: any) => void;
};

const VecanciesList = ({ data, onOptionPress }: VecanciesListProps) => {
  const navigation = useNavigation();

  const goToJobDetail = () => {
    navigation.navigate("jobDetail", { id: data?.id });
  };

  return (
    <PressableScale onPress={goToJobDetail}>
      <View
        backgroundColor={"white"}
        paddingHorizontal={"large"}
        borderBottomColor={"grey500"}
        borderBottomWidth={1}
        paddingVertical={"large"}
      >
        <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Text variant={"medium14"} color={"black"}>
            {data?.job_titles}
          </Text>
          <PressableScale onPress={() => onOptionPress?.(data)}>
            <Image
              source={icons["more-horizontal"]}
              style={{ height: scale(24), width: scale(24) }}
            />
          </PressableScale>
        </View>
        <View flexDirection={"row"} paddingTop={"tiny"} alignItems={"center"}>
          <Text variant={"medium12"} textTransform={"capitalize"} color={"grey100"}>
            {data?.company_name}.
          </Text>
          <Text
            variant={"regular12"}
            textTransform={"capitalize"}
            marginLeft={"tiny"}
            color={"grey100"}
          >
            {data?.city_name}
          </Text>
          <Text
            variant={"regular12"}
            textTransform={"capitalize"}
            marginLeft={"tiny"}
            color={"grey100"}
          >
            {data?.country_name}
          </Text>
        </View>

        <View paddingTop={"small"}>
          <Text variant={"medium12"} color={"grey200"}>
            {data?.NoOfApplicants} Applicants
          </Text>
        </View>

        <View flexDirection={"row"} paddingTop={"small"} alignItems={"center"}>
          <Text variant={"semiBold12"} color={"primary"} textTransform={"capitalize"}>
            {data?.job_status}.{" "}
          </Text>
          <Text variant={"regular10"} marginLeft={"tiny"} color={"grey200"}>
            Posted on{" "}
            <Text variant={"medium10"} color={"grey100"}>
              {timeAgo(data?.created_at)}
            </Text>{" "}
          </Text>
          <Text variant={"regular10"} marginLeft={"tiny"} color={"grey200"}>
            Expire on{" "}
            <Text variant={"medium10"} color={"grey100"}>
              {data?.deadline_date}
            </Text>
          </Text>
        </View>
      </View>
    </PressableScale>
  );
};

export default VecanciesList;
