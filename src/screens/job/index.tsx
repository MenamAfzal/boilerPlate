import React, { useCallback, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { scale } from "react-native-size-matters";
import { TabBar } from "react-native-tab-view";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import type { Route } from "@showtime-xyz/tab-view";
import { TabScrollView, TabView } from "@showtime-xyz/tab-view";
import ActivityIndicator from "@/components/activity-indicator";
import { ScreenHeader } from "@/components/screen-header";
import { useCandidateDetail } from "@/services/api/candidate";
import type { Theme } from "@/theme";
import { Screen, Text, View,PressableScale } from "@/ui";
import Education from "./education";
import Experience from "./experience";
import Header from "./header";
import History from "./history";
import OverView from "./overview";
import { Image } from "expo-image";
import { icons } from "@/assets/icons";

const OverViewTab = ({ route, data }: any) => {
  return (
    <>
      <TabScrollView index={route?.index}>
        <OverView data={data} />
      </TabScrollView>
      <View paddingVertical={"large"} paddingHorizontal={"large"}>
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

        {/* <View
          flexDirection={"row"}
          backgroundColor={"white"}
          height={scale(80)}
          borderColor={"grey400"}
          borderTopWidth={1}
          justifyContent={"space-around"}
          paddingVertical={"large"}
          paddingHorizontal={"large"}
          gap={"medium"}
        >
          <View flex={1}>
            <Button variant={"outline"} label="Schedule Interview" onPress={() => null} />
          </View>

          <ImageButton
            icon="message"
            backgroundColor={"grey500"}
            size={scale(44)}
            onPress={() => null}
          />
        </View> */}
      </View>
    </>
  );
};

const EducationTab = ({ route, data }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <Education data={data} />
    </TabScrollView>
  );
};

const ExperienceTab = ({ route, data }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <Experience data={data} />
    </TabScrollView>
  );
};

const HistoryTab = ({ route }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <History />
    </TabScrollView>
  );
};

const renderLabel = ({ focused, route }: { focused: boolean; route: { title: string } }) => {
  return (
    <Text color={focused ? "primary" : "black"} variant="medium14" numberOfLines={1}>
      {route.title}
    </Text>
  );
};

const renderTabBar = (props: any) => {
  return (
    <View>
      <TabBar
        {...props}
        style={styles.tabBar}
        inactiveColor={"black"}
        indicatorStyle={[styles.indicatorStyle]}
        scrollEnabled={true}
        renderLabel={renderLabel}
        tabStyle={{ width: 120 }}
      />
      <View height={scale(4)} backgroundColor={"grey500"} />
    </View>
  );
};

export function Job() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { colors } = useTheme<Theme>();
  const { width } = useWindowDimensions();

  const route = useRoute();

  const [routes] = useState<Route[]>([
    { key: "Overview", title: "Overview", index: 0 },
    { key: "Experience", title: "Experience", index: 1 },
    { key: "Education & Skills", title: "Education & Skills", index: 2 },
    { key: "History", title: "History", index: 3 },
  ]);

  const [index, setIndex] = useState(0);
  const animationHeaderPosition = useSharedValue(0);
  const animationHeaderHeight = useSharedValue(0);

  const { data: candidateData, isLoading } = useCandidateDetail({
    variables: {
      // @ts-ignore
      unique_id: route?.params?.id,
    },
  });

  const renderScene = useCallback(
    ({ route }: any) => {
      switch (route.key) {
        case "Overview":
          return <OverViewTab route={route} index={0} data={candidateData?.resume_bio} />;
        case "Experience":
          return <ExperienceTab route={route} index={1} data={candidateData?.experience} />;
        case "Education & Skills":
          return <EducationTab route={route} index={2} data={candidateData} />;
        case "History":
          return <HistoryTab route={route} index={2} />;

        default:
          return null;
      }
    },
    [candidateData]
  );

  const onStartRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log("onStartRefresh");
      setIsRefreshing(false);
    }, 300);
  };

  const renderHeader = () => {
    return (
      <View>
        <Header data={candidateData} />
        <View height={scale(10)} backgroundColor={"grey500"} />
      </View>
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader showBorder={true} icon="close" />
      {isLoading ? (
        <View flex={1} height={scale(300)} justifyContent={"center"} alignItems={"center"}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <TabView
          onStartRefresh={onStartRefresh}
          isRefreshing={isRefreshing}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          lazy
          renderScrollHeader={renderHeader}
          minHeaderHeight={0}
          animationHeaderPosition={animationHeaderPosition}
          animationHeaderHeight={animationHeaderHeight}
          enableGestureRunOnJS={false}
          scrollEnabled={true}
          style={{ width: width }}
          renderTabBar={renderTabBar}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    height: scale(40),
  },
  indicatorStyle: {
    height: scale(3),
    backgroundColor: "#01C96C",
  },
});
