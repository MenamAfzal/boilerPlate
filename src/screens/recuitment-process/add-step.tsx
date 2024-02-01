import React, { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import SelectionBox from "@/components/drop-down";
import { ScreenHeader } from "@/components/screen-header";
import { useSoftKeyboardEffect } from "@/hooks";
import { queryClient } from "@/services/api/api-provider";
import { useAddStep, useSteps } from "@/services/api/recruitment-process";
import { useUser } from "@/store/user";
import { useGetUser } from "@/services/api/user";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, Text, View } from "@/ui";
import { showErrorMessage, showSuccessMessage } from "@/utils";
import { DescriptionField } from "@/ui/description-field";

const schema = z.object({
  stepName: z.string({
    required_error: "Step Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  order: z.string().optional(),
  contactPerson: z.string({
    required_error: "Contact person is required",
  }),
});

export type AddStepFormType = z.infer<typeof schema>;

function createArrayWithConsecutiveNumbers(count) {
  if (count <= 0) {
    return [];
  }

  const resultArray = [];

  for (let i = 1; i <= count + 1; i++) {
    resultArray.push(i);
  }

  return resultArray;
}

export const AddStep = () => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();
  const route = useRoute<any>();

  useSoftKeyboardEffect();

  const company = useUser((state) => state?.company);

  const { data: users } = useGetUser({
    variables: {
      id: company?.id,
    },
  });

  const { mutate: AddStepApi, isLoading } = useAddStep();

  const sorderOrders = useMemo(() => {
    let sortOrdersArray = createArrayWithConsecutiveNumbers(route?.params?.stepsCount);

    return sortOrdersArray;
  }, [route?.params]);

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AddStepFormType>({
    resolver: zodResolver(schema),
  });

  // @ts-ignore
  const onSubmit = (data: AddStepFormType) => {
    AddStepApi(
      {
        step_name: data?.stepName,
        description: data?.description,
        company_recruitment_process_id: route?.params?.processId,
        responsible_person_id: parseInt(data?.contactPerson),
        sort_order: route?.params?.stepsCount === 0 ? 1 : parseInt(data?.order),
      },
      {
        onSuccess: (responseData) => {
          if (responseData?.response?.status === 200) {
            showSuccessMessage(responseData?.response?.message);
            queryClient.invalidateQueries(useSteps.getKey());
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
            placeholder="Enter step name"
            label="Step Name"
            control={control}
            name="stepName"
          />
          <DescriptionField
            placeholder="Enter description"
            label="Description"
            control={control}
            name="description"
          />

          {route?.params?.stepsCount !== 0 ? (
            <View>
              <SelectionBox
                label="Step Order"
                placeholder="Select order"
                //@ts-ignore
                data={sorderOrders?.map((element) => {
                  return {
                    id: element,
                    name: `${element}`,
                  };
                })}
                onChange={(data) => {
                  setValue("order", `${data?.id}`);
                  setError("order", {
                    type: "custom",
                    message: "",
                  });
                }}
              />
              {errors?.order?.message && (
                <Text paddingTop={"small"} variant="regular14" color={"error"}>
                  {errors?.order?.message}
                </Text>
              )}
            </View>
          ) : null}

          <View>
            <SelectionBox
              label="Contact Person"
              placeholder="Select person"
              //@ts-ignore
              data={users?.map((element) => {
                return {
                  id: parseInt(element?.user_id),
                  name: element?.person_name,
                };
              })}
              onChange={(data) => {
                setValue("contactPerson", `${data?.id}`);
                setError("contactPerson", {
                  type: "custom",
                  message: "",
                });
              }}
            />
            {errors?.contactPerson?.message && (
              <Text paddingTop={"small"} variant="regular14" color={"error"}>
                {errors?.contactPerson?.message}
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

