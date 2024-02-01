import React from 'react';
import { scale } from 'react-native-size-matters';

//import { StyleSheet, useWindowDimensions } from "react-native";
import { Text, View } from '@/ui';

type StepIndicatorProps = {
  data: string[];
};

export const StepIndicator = ({ data }: StepIndicatorProps) => {
  //const { width } = useWindowDimensions();

  return (
    <View>
      <View backgroundColor={'primary'} height={scale(6)} />
      <View
        flexDirection={'row'}
        // paddingHorizontal={"large"}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        {data?.map((item, index) => {
          let firstElement = data[0];

          // Accessing the element at the last index (index length - 1)
          let lastElement = data[data.length - 1];

          let flexStart = firstElement === item;
          let flexEnd = lastElement === item;

          console.log('flexStart', flexStart);

          return (
            <View
              key={index}
              justifyContent={'center'}
              alignItems={
                flexStart ? 'flex-start' : flexEnd ? 'flex-end' : 'center'
              }
              flexDirection={'column'}
              // backgroundColor={"primary"}
            >
              <View
                height={scale(8)}
                width={scale(12)}
                backgroundColor={'info'}
              />

              <View>
                <Text>{item}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   navigator: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     height: 50,
//     paddingBottom: 15,
//     paddingHorizontal: 40,
//   },
//   lineSteps: {
//     flexGrow: 1,
//     height: 1,
//   },
//   stepIcon: {
//     width: 20,
//     height: 20,
//   },
// });

// import React from "react";
// import { View, Image, StyleSheet, Text } from "react-native";

// import { icons } from "@/assets/icons";

// const bgColor = "#0069FF";
// const lineNext = "red";
// const lineDone = "#004FC0";

// const StepCurrent = icons.facebook;
// const StepDone = icons.google;
// const StepNext = icons.apple;

// export const StepIndicator = ({ step, totalSteps, data }) => {
//   return (
//     <React.Fragment>
//       <View style={[styles.navigator]}>
//         {[...Array(totalSteps - 1)].map((e, i) => {
//           console.log("e", e);

//           return (
//             <React.Fragment key={i}>
//               <Image
//                 source={i + 1 < step ? StepDone : i + 1 == step ? StepCurrent : StepNext}
//                 style={styles.stepIcon}
//                 resizeMode="contain"
//               />
//               <View
//                 style={[
//                   styles.lineSteps,
//                   { height: i + 1 <= step - 1 ? 4 : 1 },
//                   { backgroundColor: i + 1 <= step - 1 ? lineDone : lineNext },
//                 ]}
//               ></View>
//             </React.Fragment>
//           );
//         })}
//         <Image
//           style={styles.stepIcon}
//           resizeMode="contain"
//           source={step == totalSteps ? StepCurrent : step > totalSteps ? StepDone : StepNext}
//         />
//       </View>

//       <View
//         style={{
//           backgroundColor: "red",
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         {data?.map((item, index) => {
//           console.log(":item", item);

//           return (
//             <View key={index}>
//               <Text style={{ color: "white" }}>{item}</Text>
//             </View>
//           );
//         })}
//       </View>
//     </React.Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   navigator: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     height: 50,
//     //paddingHorizontal: 40,
//   },
//   lineSteps: {
//     flexGrow: 1,
//   },
//   stepIcon: {
//     width: 20,
//     height: 20,
//   },
// });
