import React, { useCallback } from 'react';
import { scale } from 'react-native-size-matters';

import ActivityIndicator from '@/components/activity-indicator';
import { PersonItem } from '@/components/person-item';
import { TabFlashList } from '@/components/tab-flash-list';
import { useCandidates } from '@/services/api/candidate';
import { useUser } from '@/store/user';
import { Text, View } from '@/ui';

type PendingListProps = {
  index: number;
};

const PendingList = ({ index }: PendingListProps) => {
  const company = useUser((state) => state?.company);

  const { data, isLoading } = useCandidates({
    variables: {
      id: company?.id,
      statusId: 1,
    },
  });

  const renderItem = useCallback(({ item }) => {
    return <PersonItem data={item} />;
  }, []);

  if (isLoading) {
    return (
      <View
        flex={1}
        height={scale(300)}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <TabFlashList
      index={index}
      data={data?.response?.data?.data}
      contentContainerStyle={{
        paddingHorizontal: scale(16),
      }}
      renderItem={renderItem}
      estimatedItemSize={150}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View
          height={scale(300)}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text>No Cadidates Found</Text>
        </View>
      }
    />
  );
};

export default PendingList;
