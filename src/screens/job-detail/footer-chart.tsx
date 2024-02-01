import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { scale } from 'react-native-size-matters';

import { ImageButton } from '@/components';
import { Button, View } from '@/ui';

const Footer = () => {
  const navigation = useNavigation();

  const handleViewApplicants = () => {
    navigation.navigate('Applicants'); // Navigate to the "Applicants" screen
  };

  return (
    <View>
      <View
        flexDirection={'row'}
        backgroundColor={'white'}
        height={scale(80)}
        borderColor={'grey400'}
        borderTopWidth={1}
        justifyContent={'space-around'}
        paddingTop={'large'}
        paddingHorizontal={'large'}
        gap={'medium'}
      >
        <View flex={1}>
          <Button
            variant={'outline'}
            label="View Applicant"
            onPress={handleViewApplicants}
          />
        </View>

        <ImageButton
          icon="more-horizontal"
          backgroundColor={'grey500'}
          size={scale(44)}
          onPress={() => null}
        />
      </View>
    </View>
  );
};

export default Footer;
