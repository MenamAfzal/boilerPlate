import { Image } from 'expo-image';
import React from 'react';

import { View } from '@/ui';

const ComponentsData = [
  {
    backgroundColor: '#98EECC',
    avatar: require('../../assets/images/avatar.png'),
  },
  {
    backgroundColor: '#78C1F3',
    avatar: require('../../assets/images/avatar.png'),
  },
  {
    backgroundColor: '#9376E0',
    avatar: require('../../assets/images/avatar.png'),
  },
];

const ZIndex = () => {
  return (
    <View flexDirection={'row'}>
      {ComponentsData.map((data, index) => {
        const marginLeft = index === 0 ? 0 : -8; // Calculate marginLeft

        return (
          <View
            width={24}
            height={24}
            borderRadius={20}
            alignItems={'center'}
            justifyContent={'center'}
            key={index}
            style={[{ backgroundColor: data.backgroundColor, marginLeft }]}
          >
            <Image
              source={data.avatar}
              style={{ width: 24, height: 24, borderRadius: 20 }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default ZIndex;
