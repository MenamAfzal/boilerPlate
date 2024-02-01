import React, { useCallback, useMemo, useRef } from "react";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlatList, BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { BottomModal } from "@/components/bottom-modal";
import SelectionBox from "@/components/drop-down";
import { ScreenHeader } from "@/components/screen-header";
import { SearchWithFilter } from "@/components/search-with-filter";
import { SelectModalItem } from "@/components/select-modal-item";
import type { Theme } from "@/theme";
import { Button, Screen, Text, View } from "@/ui";
import ApplicantList from "./applicants-list";
import { useCandidateByJob } from "@/services/api/candidate";
import ActivityIndicator from "@/components/activity-indicator";
import { FlashList } from "@shopify/flash-list";
import { useRefreshOnFocus } from "@/hooks";

//const menu = ['All', 'Recent', 'Step1', 'Step2', 'Hired'];

const data2 = [
  {
    icon: "eye",
    title: "View Details",
  },
  {
    icon: "pencl",
    title: "Change Status",
  },
];

const Applicants = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const route = useRoute<any>();

  //const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetOptionsModalRef = useRef<BottomSheetModal>(null);

  const { data, isLoading, refetch } = useCandidateByJob({
    variables: {
      id: route?.params?.id,
    },
  });

  useRefreshOnFocus(refetch);

  // variables
  const snapPoints = useMemo(() => ["85%"], []);
  const snapPoints2 = useMemo(() => ["25%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // callbacks
  const handlePresentOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef.current?.present();
  }, []);

  // callbacks
  const handleDismissOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef.current?.dismiss();
  }, []);

  const renderItem = useCallback(({ item }: any) => {
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

  const renderApplicantsItem = ({ item }: any) => (
    <ApplicantList
      onPress={() => navigate("Job", { id: item?.unique_id })}
      showStatus={true}
      data={item}
      onOptionPress={handlePresentOptionsModalPress}
    />
  );

  // renders
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={bottom}>
        <View paddingVertical={"large"} borderTopWidth={1} borderTopColor={"grey400"}>
          <Button
            marginHorizontal={"large"}
            label="Show Results"
            onPress={handleDismissModalPress}
          />
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader title="Applicants" showBorder={true} />
      <SearchWithFilter onFilter={handlePresentModalPress} />

      {isLoading ? (
        <View flex={1} height={scale(300)} justifyContent={"center"} alignItems={"center"}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View flex={1} backgroundColor={"grey500"}>
          <FlashList
            data={data?.response?.data}
            renderItem={renderApplicantsItem}
            estimatedItemSize={150}
            contentContainerStyle={{
              paddingBottom: scale(100),
            }}
            ListEmptyComponent={
              <View height={scale(300)} justifyContent={"center"} alignItems={"center"}>
                <Text>No Cadidates Found</Text>
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
          data={data2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </BottomModal>

      <BottomModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "rgb(250,250,253)" }}
        footerComponent={renderFooter}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View alignSelf={"center"} paddingVertical={"large"}>
            <Text variant={"medium17"} color={"black"}>
              Set Filters
            </Text>
          </View>

          <SelectionBox label="Industry" placeholder="Select industry" />
          <SelectionBox label="Categories" placeholder="Select categories" />
          <SelectionBox label="Applied on last job" placeholder="Select last job" />
          <SelectionBox label="Last job status" placeholder="Select status" />
        </BottomSheetView>
      </BottomModal>
    </Screen>
  );
};

export default Applicants;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});
