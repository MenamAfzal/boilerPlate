import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { PressableScale, Text, View } from '@/ui';

import VerticalBarChart from './bar-chart';

const VacanciesStatus = ({ applicants }: { applicants: any }) => {
  return (
    <View backgroundColor={'white'} paddingVertical={'large'}>
      <View
        flexDirection={'row'}
        paddingHorizontal={'large'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginBottom={'medium'}
      >
        <Text variant={'medium16'} color={'black'}>
          Vacancy Status
        </Text>
        <PressableScale>
          <View flexDirection={'row'} alignItems={'center'}>
            <Text color={'black'} marginRight={'small'} variant={'regular13'}>
              This Week
            </Text>
            <Image source={icons.calendar} style={style.calendarImage} />
          </View>
        </PressableScale>
      </View>

      <View
        flexDirection={'row'}
        paddingHorizontal={'large'}
        columnGap={'medium'}
      >
        {[
          {
            id: 1,
            text: 'Active job seekers',
            precentage: '0',
          },
          {
            id: 2,
            text: 'Applied',
            precentage: applicants?.length,
          },
        ]?.map((element, index) => {
          return (
            <Pressable style={style.button} key={index}>
              <View
                height={scale(88)}
                borderRadius={scale(8)}
                flex={1}
                backgroundColor={'grey500'}
                paddingHorizontal={'large'}
              >
                <Text variant={'regular14'} color={'black'} marginTop={'large'}>
                  {element?.text}
                </Text>
                <Text variant={'medium24'} marginTop={'small'} color={'black'}>
                  {element.precentage}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <VerticalBarChart />
    </View>
  );
};

const style = StyleSheet.create({
  calendarImage: {
    width: scale(20),
    height: scale(20),
  },

  button: {
    flex: 1,
    height: scale(88),
    borderRadius: scale(8),
  },
});

export default VacanciesStatus;
