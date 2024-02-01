import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import type { Experience } from '@/services/api/candidate';
import { PressableScale, Text, View } from '@/ui';

type ExperienceProps = {
  data: Experience;
};

const Experiences = ({ data }: ExperienceProps) => {
  return (
    <>
      {
        // @ts-ignore
        data?.map((item, index) => {
          return (
            <PressableScale key={index} onPress={() => null}>
              <View
                backgroundColor="white"
                flexDirection={'row'}
                paddingVertical={'2xl'}
                paddingHorizontal={'large'}
                borderBottomColor={'grey500'}
                borderBottomWidth={1}
              >
                <Image source={icons.indesign} style={styles.image} />
                <View paddingHorizontal={'medium'} flex={1}>
                  <Text variant="medium14" color="black">
                    {item?.job_category}
                  </Text>
                  <Text
                    variant="medium12"
                    paddingVertical={'tiny'}
                    marginLeft={'tiny'}
                    color={'grey100'}
                  >
                    {item?.company_name}, {'Islamabad, Pakistan'}
                  </Text>
                  <Text
                    paddingVertical={'tiny'}
                    variant="regular12"
                    color={'grey200'}
                    marginLeft={'tiny'}
                  >
                    {item?.from_date}-{item?.to_date}
                  </Text>
                  <View maxWidth={300} paddingVertical={'tiny'}>
                    <Text
                      textAlign={'justify'}
                      paddingVertical={'tiny'}
                      variant="regular10"
                      color={'grey100'}
                    >
                      {item?.description}
                    </Text>
                    {/* <Text
                    variant="regular10"
                    paddingVertical={"tiny"}
                    color={"grey100"}
                    textAlign={"justify"}
                  >
                    {item.point2}
                  </Text> */}
                  </View>
                </View>
              </View>
            </PressableScale>
          );
        })
      }
    </>
  );
};

export default Experiences;

const styles = StyleSheet.create({
  image: {
    width: scale(72),
    height: scale(72),
  },
});
