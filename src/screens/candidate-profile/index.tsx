import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";
import { TinderCard } from "rn-tinder-card";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
//import { ImageButton } from "@/components";
import { Avatar } from "@/components/avatar";
import { ScreenHeader } from "@/components/screen-header";
import type { Theme } from "@/theme";
import {PressableScale, Screen, Text, View } from "@/ui";
import { useRoute } from "@react-navigation/native";
import { icons } from "@/assets/icons";

const skills = [{ name: "MongoDB" }, { name: "ReactJs" }, { name: "PHP" }, { name: "My SQL" }];

const CandidateProfile = () => {
  const { colors } = useTheme<Theme>();
  const { height, width } = useWindowDimensions();

  const route = useRoute<any>();
  const data = route?.params?.data?.response?.data;

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader icon="close" title="" />
      <View flex={1} backgroundColor={"grey500"}>
        {data?.map((item, index) => {
          return (
            <View style={styles.cardContainer} pointerEvents="box-none" key={index}>
              <TinderCard
                cardWidth={width * 0.85}
                cardHeight={height * 0.8}
                cardStyle={styles.card}
                onSwipedRight={() => {
                  console.log("item", item);
                  //Alert.alert('Swiped right');
                }}
                onSwipedTop={() => {
                  // Alert.alert('Swiped Top');
                }}
                onSwipedLeft={() => {
                  // Alert.alert("Swiped left");
                }}
              >
                <View backgroundColor={"white"} flex={1} borderRadius={20}>
                  <View>
                    <Image
                      source={require("src/assets/images/header.png")}
                      style={styles.image}
                    />
                    <View
                      alignSelf={"center"}
                      style={{
                        marginTop: -scale(30),
                      }}
                    >
                      <Avatar
                        transition={1000}
                        source={{ uri: "https://fakeimg.pl/400x400/cccccc/cccccc" }}
                        placeholder={{ uri: "https://fakeimg.pl/400x400/cccccc/cccccc" }}
                        size="large"
                      />
                    </View>
                  </View>

                  <View
                    justifyContent={"center"}
                    paddingVertical={"large"}
                    alignItems={"center"}
                  >
                    <Text variant={"medium20"} color={"black"}>
                      {item?.full_name}
                    </Text>
                    <Text
                      variant={"regular13"}
                      textTransform={"capitalize"}
                      paddingVertical={"tiny"}
                      color={"grey100"}
                    >
                      {item?.job_title}
                    </Text>
                    <Text variant={"regular13"} textTransform={"capitalize"} color={"grey200"}>
                      {item?.city}, {item?.country}
                    </Text>
                  </View>

                  <View
                    flexDirection={"row"}
                    justifyContent={"center"}
                    columnGap={"small"}
                    alignItems={"center"}
                  >
                    {skills?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          backgroundColor={"tertiary"}
                          borderRadius={scale(8)}
                          paddingVertical={"small"}
                          paddingHorizontal={"medium"}
                        >
                          <Text variant={"regular12"}>{item.name}</Text>
                        </View>
                      );
                    })}
                  </View>

                  <View height={1} marginVertical="large" backgroundColor={"grey500"} />

                  <View>
                    <Text
                      variant={"regular14"}
                      color={"grey200"}
                      lineHeight={21}
                      textAlign={"center"}
                      paddingHorizontal={"large"}
                    >
                      {item?.description}
                    </Text>
                  </View>
                  <View
                    flex={1}
                    justifyContent={"flex-end"}
                    paddingHorizontal={"large"}
                    paddingBottom={"large"}
                  >
                    <PressableScale>
                      <View
                        backgroundColor={"black"}
                        height={scale(44)}
                        borderRadius={scale(8)}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Image
                          source={icons["message"]}
                          style={{
                            height: scale(18),
                            width: scale(18),
                          }}
                          contentFit="contain"
                        />
                      </View>
                    </PressableScale>
                  </View>
                </View>
              </TinderCard>
            </View>
          );
        })}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    marginTop: scale(24),
  },
  card: {
    borderRadius: 48,
  },
  image: {
    width: "100%",
    height: scale(110),
    borderTopLeftRadius: scale(28),
    borderTopRightRadius: scale(28),
  },
});

export default CandidateProfile;

