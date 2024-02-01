import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { data } from '@/constants/job-menue';
import JobMenue from '@/screens/vacancies/job-menue';
import { PressableScale } from '@/ui';
import { Text, View } from '@/ui';

const PlusButton = () => {
  const renderItem = ({ item }: any) => (
    <View>
      <JobMenue img={item.img} title={item.title} />
    </View>
  );

  // bottom sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View>
      <PressableScale onPress={handlePresentModalPress}>
        <View
          flexDirection={'row'}
          width={scale(80)}
          height={scale(30)}
          backgroundColor={'primary'}
          borderRadius={10}
          alignItems={'center'}
          justifyContent={'space-around'}
          paddingHorizontal={'small'}
        >
          <View flexDirection={'column'}>
            <Image
              source={icons.pluss}
              style={style.image}
              contentFit="contain"
            />
          </View>
          <View flexDirection={'column'}>
            <Text variant={'medium12'} fontWeight={'500'} color={'white'}>
              Job
            </Text>
          </View>
        </View>
      </PressableScale>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        // backgroundStyle={{ backgroundColor: theme.colors.background }}
      >
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        {/* <SetFilter /> */}
      </BottomSheetModal>
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    width: 10,
    height: 10,
    tintColor: 'white',
  },
});

export default PlusButton;
