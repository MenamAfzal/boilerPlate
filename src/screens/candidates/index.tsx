import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import ActivityIndicator from "@/components/activity-indicator";
import { BottomModal } from "@/components/bottom-modal";
import SelectionBox from "@/components/drop-down";
import { SearchWithFilter } from "@/components/search-with-filter";
import {
  useAllCandidates,
  useCandidateByName,
  useFilterCandidates,
} from "@/services/api/candidate";
import type { Theme } from "@/theme";
import { Button, Screen, Text, View } from "@/ui";
import PersonItem from "./candidate-item";
import { useIndustries, useSkills } from "@/services/api/settings";
import { useDebounce } from "@/hooks";

export const Candidates = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [industry, setIndustry] = useState(null);
  const [skill, setSkill] = useState(null);

  const debouncedSearch = useDebounce<string>(searchQuery, 300);

  const { data, isLoading } = useAllCandidates();
  const { data: industries } = useIndustries();
  const { data: skills } = useSkills();

  const { data: seachData } = useCandidateByName({
    enabled: debouncedSearch?.length ? true : false,
    variables: {
      search: debouncedSearch,
    },
  });

  const { data: filterData } = useFilterCandidates({
    enabled: showFilter ? true : false,
    variables: {
      skill: skill,
      industries: industry,
    },
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["85%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <PersonItem
        data={item}
        onPress={() => navigate("Job", { id: item?.unique_id })}
        onOptionPress={handlePresentModalPress}
        showMore={false}
      />
    );
  };

  // render footer
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={bottom}>
        <View paddingVertical={"large"} borderTopWidth={1} borderTopColor={"grey400"}>
          <Button
            marginHorizontal={"large"}
            label="Show Results"
            onPress={() => {
              setShowFilter(true);
              handleDismissModalPress();
            }}
          />
        </View>
      </BottomSheetFooter>
    ),
    [setShowFilter, showFilter]
  );

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <View
        height={scale(50)}
        flexDirection={"row"}
        alignItems={"center"}
        paddingHorizontal={"large"}
        borderBottomColor={"grey500"}
        borderBottomWidth={1}
      >
        <Text variant={"medium17"} color={"grey100"}>
          Candidate Search
        </Text>
      </View>

      <SearchWithFilter
        searchValue={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onFilter={handlePresentModalPress}
        onSwap={() => navigate("CandidateProfile", { data })}
      />

      {isLoading ? (
        <View flex={1} height={scale(300)} justifyContent={"center"} alignItems={"center"}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View flex={1} backgroundColor={"white"} paddingTop={"large"}>
          <FlashList
            data={
              showFilter
                ? filterData?.response?.data
                : debouncedSearch
                ? seachData?.response?.data
                : data?.response?.data
            }
            renderItem={renderItem}
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

          <SelectionBox
            label="Industry"
            placeholder="Select industry"
            data={industries?.response?.data}
            onChange={(menu) => {
              setIndustry(menu?.id);
            }}
          />
          <SelectionBox
            label="Skills"
            placeholder="Skills"
            data={skills}
            onChange={(menu) => {
              setSkill(menu?.id);
            }}
          />
          {/* <SelectionBox label="Applied on last job" placeholder="Select last job" />
          <SelectionBox label="Last job status" placeholder="Select status" /> */}
        </BottomSheetView>
      </BottomModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});
