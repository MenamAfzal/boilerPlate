import React from 'react';

import { Tag } from '@/components/tag';
import { Text, View } from '@/ui';

const data = [
  {
    property: 'For UI/UXDesigner',
    date: '26 Aug',
    time: '4:20 PM',
    status: 'Applied',
    hasCV: true,
    tags: ['cv', 'cover letter'],
    job: 'UI/UX DESIGNER',
  },
  {
    property: 'By Liam Smith',
    date: '26 Aug',
    time: '4:20 PM',
    status: 'Shortlisted',
    job: 'React native developer',
    tags: [],
  },
  {
    property: 'Scheduled By Liam Smith',
    date: '26 Aug',
    time: '4:20 PM',
    status: 'Interview',
    day: '20 June 2023',
    job: 'Laravel developer',
    tags: [],
  },
];

const History = () => {
  return (
    <View paddingVertical={'2xl'}>
      {data?.map((item, index) => {
        return (
          <View
            key={index}
            backgroundColor="white"
            paddingHorizontal={'large'}
            flexDirection={'row'}
          >
            <View paddingVertical={'large'}>
              <Text variant={'regular12'} color={'black'}>
                {item.date}
              </Text>
              <Text variant={'regular12'} color={'black'}>
                {item.time}
              </Text>
            </View>
            <View
              width={0.5}
              backgroundColor={'grey400'}
              marginHorizontal={'small'}
            />
            <View paddingVertical={'large'} marginLeft={'medium'}>
              <Text variant={'medium14'} color={'black'}>
                {item.status}
              </Text>
              <Text
                variant="regular12"
                paddingTop={'small'}
                marginLeft={'tiny'}
                color={'grey300'}
              >
                For{' '}
                <Text variant="regular12" color={'grey100'}>
                  {item?.job}
                </Text>
              </Text>

              <View flexDirection={'row'} gap={'medium'} paddingTop={'small'}>
                {item?.tags?.map((element, tagIndex) => {
                  return <Tag key={tagIndex} icon={'cv'} name={element} />;
                })}
              </View>

              <Text variant="medium12" marginLeft={'tiny'}>
                {item.day}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default History;
