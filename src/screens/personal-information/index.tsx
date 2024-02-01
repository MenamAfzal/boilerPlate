import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { scale } from "react-native-size-matters";
import * as z from "zod";
import { ScreenHeader } from "@/components/screen-header";
import { useSoftKeyboardEffect } from "@/hooks";
import type { Theme } from "@/theme";
import { Button, ControlledInput, Screen, Text, View } from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@shopify/restyle";
import { useUser } from "@/store/user";

const schema = z.object({
  fullName: z.string({
    required_error: "Full name is required",
  }),
  jobTilte: z.string({
    required_error: "Job title is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  phone: z.string({
    required_error: "phone is required",
  }),
});

export type PersonalInformationFormType = z.infer<typeof schema>;

export const PersonalInformation = () => {
  const { colors } = useTheme<Theme>();
  useSoftKeyboardEffect();

  const user = useUser((state) => state?.user);

  const { handleSubmit, control, setValue } = useForm<PersonalInformationFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: PersonalInformationFormType) => {
    console.log("data", data);
  };

  useEffect(() => {
    if (user?.full_name) {
      setValue("fullName", user?.full_name);
    }

    if (user?.phone) {
      setValue("phone", user?.phone);
    }

    setValue("email", user?.email);
  }, []);

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader showBorder={true} title="Personal Information" />

      <View flex={1} paddingHorizontal={"large"}>
        <View paddingTop={"large"}>
          <ControlledInput
            placeholder="Enter full name"
            label="Full Name"
            control={control}
            name="fullName"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter job"
            label="Job title"
            control={control}
            name="jobTilte"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter email address"
            label="Email"
            control={control}
            name="email"
            icon={
              <View
                backgroundColor={"secondary"}
                paddingVertical={"small"}
                paddingHorizontal={"medium"}
                borderRadius={scale(16)}
              >
                <Text color={"primary"}>Verified</Text>
              </View>
            }
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter password"
            label="Phone Number"
            control={control}
            name="phone"
            icon={
              <View
                backgroundColor={"secondary"}
                paddingVertical={"small"}
                paddingHorizontal={"medium"}
                borderRadius={scale(16)}
              >
                <Text color={"primary"}>Verified</Text>
              </View>
            }
          />
        </View>
        <View height={scale(24)} />
        <View flex={1} justifyContent={"flex-end"}>
          <Button label="Update" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </Screen>
  );
};

