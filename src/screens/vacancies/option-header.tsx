import React from 'react';

// import { IconButton } from "@/components";
import { Text, View } from '@/ui';

import { menuOptions } from './menue-option';

const OptionsHeader = () => {
  //   const handleMenuItemClick = (index) => {
  //     setActive(index);
  //   };
  // const [active ,setActive] = useState();
  return (
    <View
      flexDirection={'row'}
      alignItems="center"
      justifyContent={'space-between'}
      paddingHorizontal="large"
      marginVertical={'medium'}
    >
      {menuOptions.map((item, index) => {
        // const itemStyle = active === index ? style.activeItem : null;
        return (
          <View
            key={index}
            flexDirection={'column'}
            alignItems="center"
            borderWidth={1}
            borderColor={'grey100'}
            borderRadius={10}
            justifyContent={'center'}
            minHeight={25}
            minWidth={60}
            // maxHeight={80}
            // maxWidth={80}
            // style={{ backgroundColor: active === index ? "green" : null }}
          >
            <Text textTransform="uppercase">{item.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default OptionsHeader;
