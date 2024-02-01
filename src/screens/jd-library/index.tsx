import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import { BottomModal } from '@/components/bottom-modal';
import SelectionBox from '@/components/drop-down';
import { ScreenHeader } from '@/components/screen-header';
import { ScrollMenu } from '@/components/scroll-menu';
import { SearchWithFilter } from '@/components/search-with-filter';
import { SelectModalItem } from '@/components/select-modal-item';
import { data } from '@/constants/applicant-list';
import type { Theme } from '@/theme';
import { Button, Screen, Text, View } from '@/ui';

import ApplicantList from './item';

const menu = ['All', 'Recent', 'Step1', 'Step2', 'Hired'];

const data2 = [
  {
    icon: 'eye',
    title: 'View Details',
  },
  {
    icon: 'pencl',
    title: 'Change Status',
  },
];

export const JdLibrary = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetOptionsModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['85%'], []);
  const snapPoints2 = useMemo(() => ['25%'], []);

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

  const handleSheetChanges = useCallback((index: number) => {
    console.log('index', index);
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <SelectModalItem
        title={item?.title}
        icon={item?.icon}
        onPress={(data) => {
          console.log('data', data);
          handleDismissOptionsModalPress();
        }}
      />
    );
  }, []);

  const renderApplicantsItem = ({ item }: any) => (
    <ApplicantList
      onPress={() => navigate('JdLibraryDetail')}
      showStatus={true}
      data={item}
      onOptionPress={handlePresentOptionsModalPress}
    />
  );

  // renders
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={bottom}>
        <View
          paddingVertical={'large'}
          borderTopWidth={1}
          borderTopColor={'grey400'}
        >
          <Button
            marginHorizontal={'large'}
            label="Show Results"
            onPress={handleDismissModalPress}
          />
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title="JD Library" showBorder={true} />
      <SearchWithFilter onFilter={handlePresentModalPress} />

      <ScrollMenu
        selectedIndex={selectedIndex}
        //@ts-ignore
        data={menu}
        onChangeMenu={(index) => {
          setSelectedIndex(index);
        }}
      />

      <View height={scale(10)} backgroundColor={'grey500'} />
      <View flex={1} backgroundColor={'grey500'}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderApplicantsItem}
        />
      </View>

      <BottomModal
        ref={bottomSheetOptionsModalRef}
        index={0}
        snapPoints={snapPoints2}
        onChange={handleSheetChanges}
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
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: 'rgb(250,250,253)' }}
        footerComponent={renderFooter}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View alignSelf={'center'} paddingVertical={'large'}>
            <Text variant={'medium17'} color={'black'}>
              Set Filters
            </Text>
          </View>

          <SelectionBox label="Industry" placeholder="Select industry" />
          <SelectionBox label="Categories" placeholder="Select categories" />
          <SelectionBox
            label="Applied on last job"
            placeholder="Select last job"
          />
          <SelectionBox label="Last job status" placeholder="Select status" />
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
