import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { format } from "date-fns";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import { scale } from "react-native-size-matters";
import * as z from "zod";

import { BottomModal } from "@/components/bottom-modal";
import SelectionBox from "@/components/drop-down";
import StepIndicator from "@/components/indicator-2";
import { ScreenHeader } from "@/components/screen-header";
import { SelectModalItem } from "@/components/select-modal-item";
import { SelectOptionButton } from "@/components/select-option-button";
import { useSoftKeyboardEffect } from "@/hooks";
import { useCompanies } from "@/services/api/company";
import { useJobCategories } from "@/services/api/settings";
import { setPostCompany, setPostJobStep2 } from "@/store/post-job";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, Text, View } from "@/ui";

const labels = ["Job Detail", "Post Description", "Post Detail", "Preview"];

const schema = z.object({
  company: z.string({
    required_error: "Company is required",
  }),
  location: z.string({
    required_error: "Job location is required",
  }),
  jobCategory: z.string({
    required_error: "Job category is required",
  }),
  date: z.string({
    required_error: "Date  is required",
  }),
});

export type PostJobDetailFormType = z.infer<typeof schema>;

export const PostJobDetail = () => {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useSoftKeyboardEffect();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<PostJobDetailFormType>({
    resolver: zodResolver(schema),
  });

  const watchCompany = watch("company");
  const watchDate = watch("date");

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const { data: companies } = useCompanies();
  const { data: jobCategores } = useJobCategories();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variabless
  const snapPoints = useMemo(() => ["35%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // @ts-ignore
  const onSubmit = (data: PostJobDetailFormType) => {
    setPostJobStep2(data);

    navigation.navigate("PostJobPreview");
  };

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <SelectModalItem
          title={item?.name}
          icon={"company"}
          onPress={(data) => {
            setPostCompany({
              name: item?.name,
              id: item?.id,
            });
            setValue("company", data);
            handleDismissModalPress();
          }}
        />
      );
    },
    [setValue]
  );

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader />
      <View paddingHorizontal={"large"} backgroundColor={"grey500"} paddingBottom={"medium"}>
        <StepIndicator stepCount={4} currentPosition={2} labels={labels} />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View paddingTop={"large"} gap={"medium"} paddingHorizontal={"large"}>
          <SelectOptionButton
            label="Company"
            isSelected={watchCompany ? true : false}
            selectedText={watchCompany ?? "Select company"}
            icon="arrow-ios-down"
            onPress={handlePresentModalPress}
            error={errors?.company?.message}
          />

          {/* <ControlledInput
            placeholder="Enter workspace"
            label="Workspace Type"
            control={control}
            name="workSpace"
          /> */}

          <View>
            <SelectionBox
              label="Job category"
              placeholder="Select job category"
              data={jobCategores}
              onChange={(data) => {
                setValue("jobCategory", `${data?.id},${data?.name}`);

                setError("jobCategory", {
                  type: "custom",
                  message: "",
                });
              }}
            />
            {errors?.jobCategory?.message && (
              <Text paddingTop={"small"} variant="regular14" color={"error"}>
                {errors?.jobCategory?.message}
              </Text>
            )}
          </View>

          <ControlledInput
            placeholder="Enter location"
            label="Job Location"
            control={control}
            name="location"
          />

          <SelectOptionButton
            label="Deadline Date"
            isSelected={watchDate ? true : false}
            selectedText={watchDate ?? "Select date"}
            icon="calendar"
            onPress={() => setOpen(true)}
          />
        </View>

        <View height={scale(72)} />

        <View paddingVertical={"large"} borderTopWidth={1} borderTopColor={"grey400"}>
          <Button label="Next" marginHorizontal={"large"} onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>

      <BottomModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "rgb(250,250,253)" }}
      >
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={companies?.response?.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </BottomModal>

      <DatePicker
        modal
        locale="en"
        open={open}
        date={date}
        onConfirm={(date) => {
          const myDate = new Date(date);
          const formattedDate = format(myDate, "yyyy/MM/dd");
          setValue("date", formattedDate);
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
  container: {
    paddingBottom: scale(100),
  },
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});
