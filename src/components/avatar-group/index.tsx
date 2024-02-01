import React from 'react';

import type { AvatarProps } from '@/components/avatar';
import { Avatar } from '@/components/avatar';
import { View } from '@/ui';

export type AvatarGroupProps = {
  data: any[];
} & AvatarProps;

export const AvatarGroup = ({ data, ...rest }) => {
  return (
    <View flexDirection={'row'} alignItems={'center'}>
      {data?.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              marginLeft: index === 0 ? 0 : -20,
              zIndex: index,
            }}
          >
            <Avatar
              size="small"
              {...rest}
              source={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
              placeholder={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
            />
          </View>
        );
      })}
    </View>
  );
};
