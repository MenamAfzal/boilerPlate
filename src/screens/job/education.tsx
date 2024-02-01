import React from 'react';
import { scale } from 'react-native-size-matters';

import type { CandidateProfile } from '@/services/api/candidate';
import { Text, View } from '@/ui';

import { EducationItem } from './education-list';

// const skills = [
//   { name: 'Industry Knowldge' },
//   { name: 'Interpersonal Skills' },
//   { name: 'Language' },
// ];

type EducationProps = {
  data: CandidateProfile;
};

const Education = ({ data }: EducationProps) => {
  return (
    <>
      <View>
        {data?.education?.map((item, index) => {
          return <EducationItem key={index} item={item} />;
        })}
      </View>
      <View marginTop={'large'} paddingHorizontal={'large'}>
        <Text variant={'medium20'} marginBottom={'large'} color={'black'}>
          Skills
        </Text>

        <View flexDirection={'row'} rowGap={'small'} flexWrap={'wrap'}>
          {data?.skills?.map((element, index) => {
            return (
              <View
                key={index}
                borderRadius={scale(22)}
                borderWidth={1}
                height={scale(23)}
                justifyContent={'center'}
                alignItems={'center'}
                paddingHorizontal={'medium'}
                marginRight={'medium'}
                borderColor={'grey300'}
              >
                <Text variant={'medium12'} color={'grey100'}>
                  {element.name}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default Education;
