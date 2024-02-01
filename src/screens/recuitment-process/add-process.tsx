import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import SelectionBox from "@/components/drop-down";
import { ScreenHeader } from "@/components/screen-header";
import { useSoftKeyboardEffect } from "@/hooks";
import { queryClient } from "@/services/api/api-provider";
import { useDepartments } from "@/services/api/settings";
import { useAddProcess, useRecruitMentProcess } from "@/services/api/recruitment-process";
import { useUser } from "@/store/user";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, Text, View } from "@/ui";
import { showErrorMessage, showSuccessMessage } from "@/utils";
import { DescriptionField } from "@/ui/description-field";

const schema = z.object({
  processName: z.string({
    required_error: "Process Name is required",
  }),
  ownerName: z.string({
    required_error: "Owner Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),

  department: z.string({
    required_error: "Department is required",
  }),
});

export type AddProcessFormType = z.infer<typeof schema>;

export const AddProcess = () => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();

  useSoftKeyboardEffect();

  const company = useUser((state) => state?.company);

  const { mutate: AddProcessApi, isLoading } = useAddProcess();

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AddProcessFormType>({
    resolver: zodResolver(schema),
  });

  const { data: departments } = useDepartments({
    variables: {
      id: company?.id,
    },
  });

  // @ts-ignore
  const onSubmit = (data: AddProcessFormType) => {
    AddProcessApi(
      {
        process_name: data?.processName,
        description: data?.description,
        is_default: "0",
        company_id: company?.id,
        department_id: parseInt(data?.department),
        process_owner: 1, //data?.ownerName,
      },
      {
        onSuccess: (responseData) => {
          if (responseData?.response?.status === 200) {
            showSuccessMessage(responseData?.response?.message);
            queryClient.invalidateQueries(useRecruitMentProcess.getKey());
            goBack();
          } else {
            showErrorMessage(responseData?.response?.message);
          }
        },
        onError: (error) => {
          //@ts-ignore
          showErrorMessage(error?.response?.data?.message);
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title="Add Process" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View paddingTop={"large"} gap={"medium"} paddingHorizontal={"large"}>
          <ControlledInput
            placeholder="Enter process name"
            label="Process Name"
            control={control}
            name="processName"
          />
          <DescriptionField
            placeholder="Enter description"
            label="Description"
            control={control}
            name="description"
          />
          <ControlledInput
            placeholder="Enter owner name"
            label="Owner Name"
            control={control}
            name="ownerName"
          />

          <View>
            <SelectionBox
              label="Department"
              placeholder="Select department"
              //@ts-ignore
              data={departments?.default}
              onChange={(data) => {
                setValue("department", `${data?.id}`);
                setError("department", {
                  type: "custom",
                  message: "",
                });
              }}
            />
            {errors?.department?.message && (
              <Text paddingTop={"small"} variant="regular14" color={"error"}>
                {errors?.department?.message}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View paddingVertical={"large"} borderTopWidth={1} borderTopColor={"grey400"}>
        <Button
          label="Add Process"
          marginHorizontal={"large"}
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
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

