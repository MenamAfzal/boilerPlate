import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

import { icons } from "@/assets/icons";
import { Avatar } from "@/components/avatar";
import { PressableScale, Text, View } from "@/ui";

type ApplicantListProps = {
  data: {
    full_name: string;
    is_block: string;
    bio: string;
    email: string;
    phone: string;
    person_resume_id: string;
    description: string;
    cover_pic: string | null;
    profile_pic: string | null;
    unique_id: string;
    expected_salary: string;
    job_title: string;
    country: string;
    city: string;
  };

  onPress: () => void;
  onOptionPress: () => void;
  showMore?: boolean;
};

const CandidateItem = ({
  data,
  onPress,
  onOptionPress,
  showMore = true,
}: ApplicantListProps) => {
  console.log("showMore", showMore);

  return (
    <PressableScale onPress={onPress}>
      <View
        flexDirection={"row"}
        paddingHorizontal={"large"}
        borderBottomColor={"grey400"}
        borderBottomWidth={StyleSheet.hairlineWidth}
        backgroundColor={"white"}
        paddingVertical={"medium"}
      >
        <View>
          <Avatar
            transition={1000}
            source={{ uri: "https://fakeimg.pl/400x400/cccccc/cccccc" }}
            placeholder={{ uri: "https://fakeimg.pl/400x400/cccccc/cccccc" }}
          />
        </View>

        <View flex={1} paddingLeft={"medium"}>
          <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Text variant={"semiBold14"} color={"black"}>
              {data?.full_name}
            </Text>
            {showMore ? (
              <PressableScale onPress={() => onOptionPress?.()}>
                <Image
                  source={icons["more-horizontal"]}
                  style={style.dot}
                  contentFit="contain"
                />
              </PressableScale>
            ) : null}
          </View>

          <Text
            variant={"regular13"}
            textTransform={"capitalize"}
            marginVertical={"tiny"}
            color={"grey100"}
          >
            {data?.job_title}
          </Text>
          <Text
            variant={"regular12"}
            textTransform={"capitalize"}
            marginVertical={"tiny"}
            color={"black"}
          >
            {data?.city}, {data?.country}
          </Text>
        </View>
      </View>
    </PressableScale>
  );
};

export default CandidateItem;

const style = StyleSheet.create({
  dot: {
    width: scale(24),
    height: scale(24),
  },
});
