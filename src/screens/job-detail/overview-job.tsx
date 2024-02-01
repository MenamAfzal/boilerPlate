import React from 'react';

// import { StyleSheet } from 'react-native';
// import { scale } from 'react-native-size-matters';
import { AvatarGroup } from '@/components/avatar-group';
import { PressableScale, Text, View } from '@/ui';

type OverviewJobProps = {
  title: string;
  city: string;
  country: string;
  applicants: any;
  companyName: string;
};

const OverviewJob = ({
  title,
  city,
  country,
  applicants,
  companyName,
}: OverviewJobProps) => {
  return (
    <PressableScale>
      <View paddingHorizontal={'large'} paddingVertical={'large'}>
        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text>{title}</Text>
          {/* <View
            width={scale(30)}
            height={scale(30)}
            backgroundColor={'primary'}
            alignItems={'center'}
            borderRadius={30}
            justifyContent={'center'}
          >
            <Image source={icons.pencil} style={style.image} />
          </View> */}
        </View>

        <View flexDirection={'row'} paddingTop={'tiny'} alignItems={'center'}>
          <Text
            variant={'medium12'}
            textTransform={'capitalize'}
            color={'grey200'}
          >
            {companyName}.
          </Text>
          <Text
            variant={'regular12'}
            textTransform={'capitalize'}
            marginLeft={'tiny'}
            color={'grey200'}
          >
            {city}, {country}
          </Text>
          {/* <Text variant={"regular12"} marginLeft={"tiny"} color={"grey200"}>
            {`(remote)`}
          </Text> */}
        </View>

        <View paddingTop={'small'}>
          <PressableScale>
            <Text variant={'regular13'} color={'primary'}>
              {applicants?.length ?? 0} applicants
            </Text>
          </PressableScale>
        </View>

        <View paddingTop={'small'}>
          <AvatarGroup data={applicants} />
        </View>
      </View>
    </PressableScale>
  );
};

// const style = StyleSheet.create({
//   container: {},
//   image: {
//     width: scale(20),
//     height: scale(20),
//   },
// });
export default OverviewJob;
