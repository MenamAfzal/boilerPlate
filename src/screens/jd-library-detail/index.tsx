import { useTheme } from '@shopify/restyle';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import { ImageButton } from '@/components';
import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { Button, Screen, Text, View } from '@/ui';

export const JdLibraryDetail = () => {
  const { colors } = useTheme<Theme>();

  const { bottom } = useSafeAreaInsets();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader icon="close" showBorder={true} />

      <View flex={1}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: scale(60),
          }}
        >
          <View paddingTop={'medium'} paddingHorizontal={'large'}>
            <Text variant={'medium20'} color={'black'}>
              Brand Designer & Illustrator responsibilities include:
            </Text>
            <Text paddingTop={'medium'} variant={'regular14'} color={'grey100'}>
              Developing visual concepts and designs that align with a brand's
              identity and meet the needs of clients and marketing teams
              Creating artwork, such as logos, packaging, and promotional
              materials, using computer software or by hand Collaborating with
              clients and marketing teams to ensure that designs accurately
              reflect the brand's desired image and messaging
            </Text>
          </View>

          <View paddingVertical={'medium'} paddingHorizontal={'large'}>
            <Text variant={'medium20'} color={'black'}>
              Brand Designer & Illustrator responsibilities include:
            </Text>
            <Text paddingTop={'medium'} variant={'regular14'} color={'grey100'}>
              Developing visual concepts and designs that align with a brand's
              identity and meet the needs of clients and marketing teams
              Creating artwork, such as logos, packaging, and promotional
              materials, using computer software or by hand Collaborating with
              clients and marketing teams to ensure that designs accurately
              reflect the brand's desired image and messaging
            </Text>
          </View>
        </ScrollView>
      </View>
      <View
        flexDirection={'row'}
        backgroundColor={'white'}
        height={scale(80)}
        borderColor={'grey400'}
        borderTopWidth={1}
        justifyContent={'space-around'}
        paddingTop={'large'}
        paddingHorizontal={'large'}
        gap={'medium'}
        style={{
          marginBottom: bottom,
        }}
      >
        <View flex={1}>
          <Button
            variant={'outline'}
            label="View Applicant"
            onPress={() => null}
          />
        </View>

        <ImageButton
          icon="more-horizontal"
          backgroundColor={'grey500'}
          size={scale(44)}
          onPress={() => null}
        />
      </View>
    </Screen>
  );
};
