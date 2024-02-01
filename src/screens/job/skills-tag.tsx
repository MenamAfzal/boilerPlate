import React from 'react';

import { Text, View } from '@/ui';

const SkillTag = ({ skill }) => {
  return (
    <View
      margin={'large'}
      backgroundColor={'transparent'}
      borderRadius={20}
      paddingHorizontal={'small'}
      paddingVertical={'tiny'}
      marginRight={'small'}
      borderWidth={1}
    >
      <Text color={'grey100'}>{skill}</Text>
    </View>
  );
};

export default SkillTag;
