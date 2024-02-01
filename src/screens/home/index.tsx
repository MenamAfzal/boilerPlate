import React, { useCallback, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { scale } from "react-native-size-matters";
import { TabBar } from "react-native-tab-view";
import { useTheme } from "@shopify/restyle";
import type { Route } from "@showtime-xyz/tab-view";
import { TabView } from "@showtime-xyz/tab-view";
import { TopHeader } from "@/components/top-header";
import type { Theme } from "@/theme";
import { FocusAwareStatusBar, Screen, Text, View } from "@/ui";
import { HomeSliderContainer } from "./home-slider";
import Interviews from "./interview";
import PendingList from "./pending";
import ShortListed from "./short-listed";

const PendingTab = ({ route }: any) => {
  return <PendingList index={route?.index} />;
};

const ShortListedTab = ({ route }: any) => {
  return <ShortListed index={route?.index} />;
};

const InterviewsTab = ({ route }: any) => {
  return <Interviews index={route?.index} />;
};

const renderLabel = ({ focused, route }: { focused: boolean; route: { title: string } }) => {
  return (
    <View
      backgroundColor={focused ? "primary" : "grey500"}
      justifyContent={"center"}
      alignItems={"center"}
      height={scale(32)}
      width={scale(94)}
      borderRadius={scale(8)}
    >
      <Text color={focused ? "white" : "black"} variant="medium14" numberOfLines={1}>
        {route.title}
      </Text>
    </View>
  );
};

const renderTabBar = (props: any) => {
  return (
    <View marginHorizontal={"large"} marginVertical={"large"}>
      <TabBar
        {...props}
        style={styles.tabBar}
        scrollEnabled={false}
        renderLabel={renderLabel}
        renderIndicator={() => null}
        android_ripple={null}
      />
    </View>
  );
};

const renderHeader = () => {
  return <HomeSliderContainer />;
};

export function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { colors } = useTheme<Theme>();
  const { width } = useWindowDimensions();

  const [routes] = useState<Route[]>([
    { key: "Pending", title: "Pending", index: 0 },
    { key: "Shortlisted", title: "Shortlisted", index: 1 },
    { key: "Interviews", title: "Interviews", index: 2 },
  ]);

  const [index, setIndex] = useState(0);
  const animationHeaderPosition = useSharedValue(0);
  const animationHeaderHeight = useSharedValue(0);

  const onStartRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  };

  const renderScene = useCallback(({ route }: any) => {
    switch (route.key) {
      case "Pending":
        return <PendingTab route={route} index={0} />;
      case "Shortlisted":
        return <ShortListedTab route={route} index={1} />;
      case "Interviews":
        return <InterviewsTab route={route} index={2} />;

      default:
        return null;
    }
  }, []);

  return (
    <Screen edges={["top"]} backgroundColor={colors.primary}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors?.primary}
        //@ts-ignore
        statusBarColor={colors?.primary}
      />
      <TopHeader />
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
        scrollEnabled={false}
        style={{ width: width }}
        renderTabBar={renderTabBar}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#F2F2F3",
    borderRadius: scale(8),
    elevation: 0,
  },
  indicatorStyle: {
    height: scale(3),
    backgroundColor: "#01C96C",
  },
});

