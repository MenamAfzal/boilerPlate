import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlatList, BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import ActivityIndicator from "@/components/activity-indicator";
import { BottomModal } from "@/components/bottom-modal";
import SelectionBox from "@/components/drop-down";
import { ScrollMenu } from "@/components/scroll-menu";
import { SearchWithFilter } from "@/components/search-with-filter";
import { SelectModalItem } from "@/components/select-modal-item";
import { useDebounce, useRefreshOnFocus } from "@/hooks";
import {
  useJobStatuses,
  useVacancies,
  useSearchVacancies,
  useFilterVacancies,
  useDeleteVacancy,
} from "@/services/api/vacancies";
import { useJobCategories, useJobTypes } from "@/services/api/settings";
import { useUser } from "@/store/user";
import type { Theme } from "@/theme";
import { Button, Screen, Text, View } from "@/ui";
import Header from "./header";
import VecanciesList from "./vacancies-list";
import { useNavigation } from "@react-navigation/native";
import { SelectOptionButton } from "@/components/select-option-button";
import { format } from "date-fns";
import DatePicker from "react-native-date-picker";
import { showErrorMessage } from "@/utils";
import { queryClient } from "@/services/api/api-provider";

const data2 = [
  {
    icon: "eye",
    name: "View Details",
  },
  {
    icon: "delete",
    name: "Delete Job",
  },
  {
    icon: "person",
    name: "Applicants",
  },
];

export const Vacancies = () => {
  const { colors } = useTheme<Theme>();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const company = useUser((state) => state?.company);

  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("Published");
  const [selectedVacancy, setSelectedVacancy] = useState<any>(null);
  const [date, setDate] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const [open, setOpen] = useState(false);
  const [vacancyType, setVacancyTyepe] = useState(null);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce<string>(searchQuery, 300);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetOptionsModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["85%"], []);
  const snapPoints2 = useMemo(() => ["35%"], []);

  const { data: statuses, isLoading, refetch } = useJobStatuses();
  const { data: vacancies, refetch: refetchVacancy } = useVacancies({
    enabled: statuses?.length ? true : false,
    variables: {
      id: company?.id,
      status: selectedStatus,
    },
  });

  const { data: seachData } = useSearchVacancies({
    enabled: debouncedSearch?.length ? true : false,
    variables: {
      id: company?.id,
      keyword: debouncedSearch,
    },
  });

  const { data: filteredVacancies } = useFilterVacancies({
    enabled: showFilter,
    variables: {
      id: company?.id,
      job_status: status,
      date_posted: formatedDate,
      job_type_id: vacancyType,
      job_category_id: category,
    },
  });

  const { data: jobTypes } = useJobTypes();
  const { data: jobCategores } = useJobCategories();

  const { mutate: deletePost } = useDeleteVacancy();

  useRefreshOnFocus(refetch);
  useRefreshOnFocus(refetchVacancy);

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

  // renders
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
    [showFilter, setShowFilter]
  );

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <SelectModalItem
          title={item?.title}
          icon={item?.icon}
          item={item}
          onPress={(data) => {
            if (data?.name === "Applicants") {
              handleDismissOptionsModalPress();
              setTimeout(() => {
                navigation.navigate("Applicants", { id: selectedVacancy?.id });
              }, 200);
            } else if (data?.name === "View Details") {
              handleDismissOptionsModalPress();
              setTimeout(() => {
                navigation.navigate("Applicants", { id: selectedVacancy?.id });
              }, 200);
            } else if (data?.name === "Delete Job") {
              Alert.alert("Confirmation", "Are you sure? you want to delete this job ", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Delete",
                  onPress: () => {
                    deletePost(
                      { id: selectedVacancy?.id },
                      {
                        onSuccess: (data) => {
                          console.log("data?.response?.data", JSON.stringify(data, null, 2));

                          if (data?.response?.status === 200) {
                            queryClient.invalidateQueries(useVacancies.getKey());
                            handleDismissOptionsModalPress();
                          } else {
                            //@ts-ignore
                            showErrorMessage(data?.response?.message);
                          }
                        },
                        onError: (error) => {
                          // An error happened!
                          console.log(`error`, error?.response?.data);
                        },
                      }
                    );
                  },
                },
              ]);
            }
          }}
        />
      );
    },
    [selectedVacancy]
  );

  const RenderLoader = () => {
    return (
      <View flex={1} justifyContent={"center"} alignItems={"center"}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  const renderVacancyItem = ({ item }: any) => (
    <VecanciesList
      data={item}
      onOptionPress={(data) => {
        setSelectedVacancy(data);
        handlePresentOptionsModalPress();
      }}
    />
  );

  return (
    <Screen edges={["top"]} backgroundColor={colors.white}>
      <Header onPress={() => navigation.navigate("Postjob")} />

      <SearchWithFilter
        searchValue={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onFilter={handlePresentModalPress}
      />

      {isLoading ? (
        <RenderLoader />
      ) : (
        <>
          <ScrollMenu
            selectedIndex={selectedIndex}
            data={statuses}
            onChangeMenu={(data) => {
              setSelectedIndex(data?.id);
              setSelectedStatus(data?.name);
            }}
          />

          <View height={scale(10)} backgroundColor={"grey500"} />

          <View flex={1} backgroundColor={"grey500"}>
            <FlatList
              // @ts-ignore
              data={
                showFilter
                  ? filteredVacancies?.response?.data
                  : debouncedSearch
                  ? seachData?.response?.data
                  : vacancies?.response?.data?.data
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderVacancyItem}
              ListEmptyComponent={
                <View height={scale(300)} justifyContent={"center"} alignItems={"center"}>
                  <Text>No Jobs Found</Text>
                </View>
              }
            />
          </View>
        </>
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

          <SelectionBox
            label="Vacancy Tye"
            data={jobTypes}
            placeholder="Select vacancy type"
            onChange={(menu) => {
              setVacancyTyepe(menu?.id);
            }}
          />
          <SelectionBox
            label="Categories"
            data={jobCategores}
            placeholder="Select categories"
            onChange={(menu) => {
              setCategory(menu?.id);
            }}
          />
          <SelectOptionButton
            label="Posted On"
            isSelected={formatedDate !== "" ? true : false}
            selectedText={formatedDate !== "" ? formatedDate : "Select date"}
            icon="calendar"
            onPress={() => setOpen(true)}
          />

          <SelectionBox
            label="Job status"
            placeholder="Select status"
            data={statuses}
            onChange={(menu) => {
              setStatus(menu?.name);
            }}
          />
        </BottomSheetView>
      </BottomModal>

      <DatePicker
        modal
        locale="en"
        open={open}
        date={date}
        onConfirm={(date) => {
          const myDate = new Date(date);
          const formattedDate = format(myDate, "yyyy/MM/dd");
          setFormatedDate(formattedDate);
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});
