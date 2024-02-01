import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import ActivityIndicator from "@/components/activity-indicator";
import { AddButton } from "@/components/add-button";
import { BottomModal } from "@/components/bottom-modal";
import { ScreenHeader } from "@/components/screen-header";
import { SelectModalItem } from "@/components/select-modal-item";
import { useUser } from "@/store/user";
import type { Theme } from "@/theme";
import { Screen, Text, View } from "@/ui";
import { ProcessItem } from "./process-item";
import { useRecruitMentProcess } from "@/services/api/recruitment-process";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";

const data3 = [
  {
    icon: "pencl",
    title: "Edit Process",
  },
  {
    icon: "delete",
    title: "Delete Process",
  },
];

export const RecruitmentProcess = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const bottomSheetOptionsModalRef = useRef<BottomSheetModal>(null);

  const snapPoints2 = useMemo(() => ["25%"], []);

  const company = useUser((state) => state?.company);

  const { data, isLoading } = useRecruitMentProcess({
    variables: {
      id: company?.id,
    },
  });

  // show bottom modal
  const handlePresentOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef?.current?.present();
  }, []);

  // dismiss bottom modal
  const handleDismissOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef?.current?.dismiss();
  }, []);

  const renderOptionItem = useCallback(({ item }: any) => {
    return (
      <SelectModalItem
        title={item?.title}
        icon={item?.icon}
        onPress={(data) => {
          console.log("data", data);
          handleDismissOptionsModalPress();
        }}
      />
    );
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return <ProcessItem data={item} onOptionPress={handlePresentOptionsModalPress} />;
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader
        title="Process"
        showBorder={true}
        rightElement={<AddButton label="Process" onPress={() => navigate("AddProcess")} />}
      />

      {isLoading ? (
        <View flex={1} height={scale(300)} justifyContent={"center"} alignItems={"center"}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View flex={1} backgroundColor={"grey500"}>
          <FlashList
            //@ts-ignore
            data={data?.response?.data}
            renderItem={renderItem}
            estimatedItemSize={150}
            ListEmptyComponent={
              <View height={scale(300)} justifyContent={"center"} alignItems={"center"}>
                <Text>No Process Found</Text>
              </View>
            }
          />
        </View>
      )}

      <BottomModal
        ref={bottomSheetOptionsModalRef}
        index={0}
        snapPoints={snapPoints2}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={data3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOptionItem}
        />
      </BottomModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});