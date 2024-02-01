import React from 'react';
import { scale } from 'react-native-size-matters';

import { CheckBox } from '@/components/checkbox';
import type { onChangeKey, Permissions } from '@/store/permission-handler';
import { Text, View } from '@/ui';

type PermissionManagerProps = {
  data: Permissions;
  onChange: (data: Permissions, key: onChangeKey) => void;
};

const PermissionManager = ({ data, onChange }: PermissionManagerProps) => {
  return (
    <View
      borderWidth={1}
      backgroundColor={'grey500'}
      borderColor={'grey400'}
      padding={'medium'}
      borderRadius={scale(8)}
    >
      <Text variant={'medium14'} color={'black'}>
        {data?.title}
      </Text>

      <View
        flexDirection={'row'}
        paddingVertical={'small'}
        alignItems={'center'}
      >
        <View
          flex={1}
          flexDirection={'row'}
          columnGap={'small'}
          alignItems={'center'}
        >
          <CheckBox
            value={data?.create}
            onToggle={() => onChange(data, 'create')}
          />
          <Text variant={'regular12'} color={'black'}>
            Create
          </Text>
        </View>

        <View
          flex={1}
          flexDirection={'row'}
          columnGap={'small'}
          alignItems={'center'}
        >
          <CheckBox
            value={data?.read}
            onToggle={() => onChange(data, 'read')}
          />
          <Text variant={'regular12'} color={'black'}>
            Read
          </Text>
        </View>
      </View>
      <View flexDirection={'row'} alignItems={'center'}>
        <View
          flex={1}
          columnGap={'small'}
          flexDirection={'row'}
          alignItems={'center'}
        >
          <CheckBox
            value={data?.update}
            onToggle={() => onChange(data, 'update')}
          />
          <Text variant={'regular12'} color={'black'}>
            Update
          </Text>
        </View>
        <View
          flex={1}
          columnGap={'small'}
          flexDirection={'row'}
          alignItems={'center'}
        >
          <CheckBox
            value={data?.delete}
            onToggle={() => onChange(data, 'detele')}
          />
          <Text variant={'regular12'} color={'black'}>
            Delete
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PermissionManager;
