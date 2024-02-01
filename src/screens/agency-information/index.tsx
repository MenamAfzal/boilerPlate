import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import StepIndicator from '@/components/indicator-2';
import { RadioButton } from '@/components/radiobutton';
import { ScreenHeader } from '@/components/screen-header';
import { useSoftKeyboardEffect } from '@/hooks';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';
import { DescriptionField } from '@/ui/description-field';

const labels = ['Registration', 'Information', 'Invite'];

const schema = z.object({
  companyName: z.string({
    required_error: 'Company name is required',
  }),
  description: z
    .string({
      required_error: 'Company detail is required',
    })
    .max(500, 'Details must be max 500 characters'),
  location: z.string({
    required_error: 'Location is required',
  }),
});

export type AgencyInformationFormType = z.infer<typeof schema>;

export const AgencyInformation = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  useSoftKeyboardEffect();

  const [isAgency, setIsAgency] = useState<boolean>(true);
  const [single, setSingle] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<AgencyInformationFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: AgencyInformationFormType) => {
    console.log('data', data);

    navigate('SendInvite');
  };

  const sendInvite = () => {
    navigate('SendInvite');
  };

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader />

      <View
        paddingHorizontal={'large'}
        backgroundColor={'grey500'}
        paddingBottom={'medium'}
      >
        <StepIndicator stepCount={3} currentPosition={1} labels={labels} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View flex={1} paddingHorizontal={'large'}>
          <View height={scale(12)} />

          <View paddingTop={'large'}>
            <Text variant={'semiBold24'} color={'black'}>
              Agency Information
            </Text>
            <Text variant={'regular14'} paddingTop={'small'} color={'grey100'}>
              Complete your profile by adding further information
            </Text>
          </View>

          <View
            flexDirection={'row'}
            gap={'medium'}
            alignItems={'center'}
            paddingTop={'xLarge'}
          >
            <View flexDirection={'row'} gap={'small'} alignItems={'center'}>
              <RadioButton
                value={isAgency}
                onToggle={(value) => {
                  setIsAgency(value);

                  if (value) {
                    setSingle(false);
                  } else {
                    setSingle(true);
                  }
                }}
              />
              <Text variant={'regular10'} color={'grey100'}>
                Recruitment agency
              </Text>
            </View>

            <View flexDirection={'row'} gap={'small'} alignItems={'center'}>
              <RadioButton
                value={single}
                onToggle={(value) => {
                  setSingle(value);

                  if (value) {
                    setIsAgency(false);
                  } else {
                    setIsAgency(true);
                  }
                }}
              />
              <Text variant={'regular10'} color={'grey100'}>
                Independent recruiter
              </Text>
            </View>
          </View>

          {isAgency ? (
            <View paddingTop={'large'}>
              <ControlledInput
                placeholder="Enter agency name"
                label="Agency Name"
                control={control}
                name="companyName"
              />
              <View height={scale(8)} />
              <DescriptionField
                placeholder="Enter agency details"
                label="About Agency"
                control={control}
                name="description"
              />
              <View height={scale(8)} />
              <ControlledInput
                placeholder="Enter location"
                label="Location"
                control={control}
                name="location"
              />
            </View>
          ) : null}

          <View height={scale(24)} />
          <View style={{ marginTop: isAgency ? 0 : 400 }}>
            <Button
              label="Next"
              onPress={isAgency ? handleSubmit(onSubmit) : sendInvite}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: scale(40),
  },
});
