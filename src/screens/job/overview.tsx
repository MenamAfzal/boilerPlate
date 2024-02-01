import React from "react";
import { scale } from "react-native-size-matters";

import { ImageButton } from "@/components";
import { Button, Text, View } from "@/ui";

const OverView = ({ data }: any) => {
  return (
    <View paddingHorizontal={"large"} flex={1}>
      <View>
        <Text variant={"medium20"} paddingVertical={"large"} color={"black"}>
          About
        </Text>
        <Text variant={"regular14"} color={"grey200"}>
          {data}
        </Text>
      </View>

      {/* <View flex={1} justifyContent={'center'}>
        <View
          flexDirection={'row'}
          backgroundColor={'white'}
          height={scale(80)}
          borderColor={'grey400'}
          borderTopWidth={1}
          justifyContent={'space-around'}
          paddingTop={'large'}
          gap={'medium'}
        >
          <View flex={1}>
            <Button
              variant={'outline'}
              label="Schedule Interview"
              onPress={() => null}
            />
          </View>

          <ImageButton
            icon="message"
            backgroundColor={'grey500'}
            size={scale(44)}
            onPress={() => null}
          />
        </View>
      </View> */}
    </View>
  );
};

export default OverView;
