import React, { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import { BottomModal } from "@/components/bottom-modal";
import StepIndicator from "@/components/indicator-2";
import { ScreenHeader } from "@/components/screen-header";
import { SelectModalItem } from "@/components/select-modal-item";
import { SelectOptionButton } from "@/components/select-option-button";
import type { Theme } from "@/theme";
import { Button, ControlledInput, PressableScale, Screen, Text, View } from "@/ui";
import { loginFromVerifyCode } from "@/store/auth";
import { useGetRoles } from "@/services/api/roles";
import { useUser } from "@/store/user";
import { useSendInviteLink } from "@/services/api/auth";
import { showErrorMessage, showSuccessMessage } from "@/utils";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
import { icons } from "@/assets/icons";

const labels = ["Registration", "Information", "Invite"];

const schema = z.object({
  email: z.string().email("Invalid email format"),
  role: z.string(),
});

export type CompanyInformationFormType2 = z.infer<typeof schema>;

export const SendInvite = () => {
  const { colors } = useTheme<Theme>();

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CompanyInformationFormType2>({
    resolver: zodResolver(schema),
  });

  const company = useUser((state) => state?.company);
  const user = useUser((state) => state?.user);
  const { mutate: sendInviteApi, isLoading: isLoadingInvite } = useSendInviteLink();

  const { data: roles } = useGetRoles({
    variables: {
      id: company?.id,
    },
  });

  const [selectedInvites, setSelectedInvites] = useState([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["45%"], []);

  const watchEmail = watch("email");

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("index", index);
  }, []);

  const selectRole = (data) => {
    let existingUsers = [...selectedInvites];
    existingUsers.push({ role: data?.id, email: watchEmail, name: data?.name });
    setSelectedInvites(existingUsers);
    setValue("email", "");
    setValue("role", "");
    handleDismissModalPress();
  };

  const sendIvitesToPeople = () => {
    let body = {
      company_id: company?.id,
      invited_by_id: user?.id,
      emails: selectedInvites?.map((element) => {
        return {
          role: element?.role,
          email: element?.email,
        };
      }),
    };

    console.log("body", body);

    if (body?.emails?.length === 0) {
      showErrorMessage("Please enter email and select role first");
    }

    sendInviteApi(body, {
      onSuccess: (data) => {
        console.log("data?.response?.data", JSON.stringify(data, null, 2));
        if (data?.response?.status === 200) {
          loginFromVerifyCode();
          showSuccessMessage("Invites sent successfully.");
        } else {
          showErrorMessage(data?.response?.message ?? "Something went wrong");
        }
      },
      onError: (error) => {
        // An error happened!
        console.log(`error`, error?.response?.data);
      },
    });
  };

  const renderItem = useCallback(
    ({ item }: any) => {
      return <SelectModalItem title={item?.title} item={item} onPress={selectRole} />;
    },
    [selectedInvites, selectedInvites, watchEmail]
  );

  return (
    <Screen backgroundColor={colors.white} edges={["top", "bottom"]}>
      <ScreenHeader />

      <View paddingHorizontal={"large"} backgroundColor={"grey500"} paddingBottom={"medium"}>
        <StepIndicator stepCount={3} currentPosition={2} labels={labels} />
      </View>

      <View flex={1} paddingHorizontal={"large"}>
        <View height={scale(12)} />

        <View paddingTop={"large"}>
          <Text variant={"semiBold24"} color={"black"}>
            Invite Colleague
          </Text>
          <Text variant={"regular14"} paddingTop={"small"} color={"grey100"}>
            Complete your profile by adding further information
          </Text>
        </View>

        <View paddingTop={"large"} flexDirection={"row"}>
          <View flex={0.7} marginRight={"medium"}>
            <ControlledInput
              placeholder="Enter email"
              label="Email"
              control={control}
              name="email"
            />
          </View>

          <View flex={0.3}>
            <SelectOptionButton
              label="Role"
              //isSelected={watchRole ? true : false}
              isSelected={false}
              //selectedText={watchRole ?? "Role"}
              selectedText={"Role"}
              icon="arrow-ios-down"
              onPress={watchEmail ? handlePresentModalPress : () => null}
              error={errors?.role?.message}
            />
          </View>
        </View>

        {selectedInvites?.map((element, key) => {
          return (
            <View
              key={key}
              backgroundColor={"grey500"}
              marginTop={"medium"}
              borderRadius={scale(8)}
              padding={"medium"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <View>
                <Text variant={"medium13"} color={"black"}>
                  {element?.email}
                </Text>
                <Text variant={"regular12"} color={"grey100"}>
                  {element?.name}
                </Text>
              </View>
              <PressableScale
                onPress={() => {
                  let removeItems = selectedInvites?.filter(
                    (data) => data?.email !== element?.email
                  );

                  setSelectedInvites(removeItems);
                }}
              >
                <Image
                  source={icons["close"]}
                  style={{ height: scale(20), width: scale(20) }}
                />
              </PressableScale>
            </View>
          );
        })}

        <View flex={1} justifyContent={"flex-end"} paddingBottom={"large"}>
          <View flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <View width={scale(100)}>
              <Button
                backgroundColor={"black"}
                label="Finish"
                onPress={sendIvitesToPeople}
                loading={isLoadingInvite}
              />
            </View>
            <View width={scale(100)}>
              <Button
                label="Skip"
                onPress={() => {
                  loginFromVerifyCode();
                }}
                backgroundColor={"grey300"}
              />
            </View>
          </View>
        </View>
      </View>

      <BottomModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={roles?.default?.map((element) => {
            return {
              id: element?.id,
              //@ts-ignore
              name: element?.name,
            };
          })}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </BottomModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: scale(24),
    paddingHorizontal: scale(16),
  },
});

