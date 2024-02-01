/* eslint-disable react-native/no-inline-styles */
import { Image } from 'expo-image';
import React from 'react';
import type { ViewStyle } from 'react-native';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { icons } from '@/assets/icons';

import type { StepIndicatorProps } from './types';

const STEP_STATUS = {
  CURRENT: 'current',
  FINISHED: 'finished',
  UNFINISHED: 'unfinished',
};

interface DefaultStepIndicatorStyles {
  stepIndicatorSize: number;
  currentStepIndicatorSize: number;
  separatorStrokeWidth: number;
  separatorStrokeUnfinishedWidth: number;
  separatorStrokeFinishedWidth: number;
  currentStepStrokeWidth: number;
  stepStrokeWidth: number;
  stepStrokeCurrentColor: string;
  stepStrokeFinishedColor: string;
  stepStrokeUnFinishedColor: string;
  separatorFinishedColor: string;
  separatorUnFinishedColor: string;
  stepIndicatorFinishedColor: string;
  stepIndicatorUnFinishedColor: string;
  stepIndicatorCurrentColor: string;
  stepIndicatorLabelFontSize: number;
  currentStepIndicatorLabelFontSize: number;
  stepIndicatorLabelCurrentColor: string;
  stepIndicatorLabelFinishedColor: string;
  stepIndicatorLabelUnFinishedColor: string;
  labelColor: string;
  labelSize: number;
  labelAlign:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
    | undefined;
  currentStepLabelColor: string;
  labelFontFamily?: string;
}

const defaultStyles: DefaultStepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 1,
  separatorStrokeUnfinishedWidth: 0,
  separatorStrokeFinishedWidth: 17,
  currentStepStrokeWidth: 5,
  stepStrokeWidth: 0,
  stepStrokeCurrentColor: '#4aae4f',
  stepStrokeFinishedColor: '#4aae4f',
  stepStrokeUnFinishedColor: '#AFB0B6', //"#4aae4f",
  separatorFinishedColor: '#E0E0E0',
  separatorUnFinishedColor: '#AFB0B6', // changed this
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#01C96C', //"", //"#ffffff",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#000000',
  labelSize: 13,
  labelAlign: 'center',
  currentStepLabelColor: '#4aae4f',
};

const StepIndicator = ({
  currentPosition = 0,
  stepCount = 3,
  customStyles: customStylesFromProps = defaultStyles,
  labels = [],
  onPress,
}: StepIndicatorProps) => {
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [progressBarSize, setProgressBarSize] = React.useState<number>(0);

  const [customStyles, setCustomStyles] =
    React.useState<DefaultStepIndicatorStyles>({
      ...defaultStyles,
      ...customStylesFromProps,
    });

  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const sizeAnim = React.useRef(
    new Animated.Value(customStyles.stepIndicatorSize)
  ).current;

  const staleSizeAnim = React.useRef(
    new Animated.Value(customStyles.stepIndicatorSize)
  ).current;

  const borderRadiusAnim = React.useRef(
    new Animated.Value(customStyles.stepIndicatorSize / 2)
  ).current;

  const stepPressed = (position: number) => {
    if (onPress) {
      onPress(position);
    }
  };

  const effectCustomStyles = () => {
    setCustomStyles({ ...customStyles, ...customStylesFromProps });
  };

  React.useEffect(effectCustomStyles, [customStylesFromProps]);

  const effectCurrentPosition = () => {
    onCurrentPositionChanged(currentPosition);
  };

  React.useEffect(effectCurrentPosition, [currentPosition, progressBarSize]);

  const renderProgressBarBackground = () => {
    let progressBarBackgroundStyle: ViewStyle = {
      backgroundColor: customStyles.separatorUnFinishedColor,
      position: 'absolute',
    };

    progressBarBackgroundStyle = {
      ...progressBarBackgroundStyle,
      top: (height - customStyles.separatorStrokeWidth) / 2,
      left: 0, //width / (2 * stepCount),
      right: 0, //width / (2 * stepCount),
      height:
        customStyles.separatorStrokeUnfinishedWidth === 0
          ? customStyles.separatorStrokeWidth
          : customStyles.separatorStrokeUnfinishedWidth,
    };

    return (
      <View
        onLayout={(event) => {
          setProgressBarSize(event.nativeEvent.layout.width);
        }}
        style={progressBarBackgroundStyle}
      />
    );
  };

  const renderProgressBar = () => {
    let progressBarStyle: any = {
      backgroundColor: customStyles.separatorFinishedColor,
      position: 'absolute',
    };

    progressBarStyle = {
      ...progressBarStyle,
      top: 12, //(height - customStyles.separatorStrokeWidth) / 2,
      left: 0, //width / (2 * stepCount),
      right: 0, // width / (2 * stepCount),
      height:
        customStyles.separatorStrokeFinishedWidth === 0
          ? customStyles.separatorStrokeWidth
          : customStyles.separatorStrokeFinishedWidth,
      width: progressAnim,
      borderRadius: 12,
    };

    return <Animated.View style={progressBarStyle} />;
  };

  const renderStepIndicator = () => {
    let steps = [];
    for (let position = 0; position < stepCount; position++) {
      steps.push(
        <TouchableWithoutFeedback
          key={position}
          onPress={() => stepPressed(position)}
        >
          <View
            style={[
              styles.stepContainer,
              {
                justifyContent:
                  position === 0
                    ? 'flex-start'
                    : stepCount === position + 1
                    ? 'flex-end'
                    : 'center',
              },
            ]}
          >
            {renderStep(position)}
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <View
        onLayout={(event) => {
          setWidth(event.nativeEvent.layout.width);
          setHeight(event.nativeEvent.layout.height);
        }}
        style={[
          styles.stepIndicatorContainer,
          {
            flexDirection: 'row',
            height: customStyles.currentStepIndicatorSize,
          },
        ]}
      >
        {steps}
      </View>
    );
  };

  const renderStepLabels = () => {
    if (!labels || labels.length === 0) {
      return;
    }

    var labelViews = labels.map((label, index) => {
      const selectedStepLabelStyle =
        index === currentPosition
          ? { color: customStyles.currentStepLabelColor }
          : { color: customStyles.labelColor };

      let firstElement = labels[0] === label;

      let lastElement = labels[labels?.length - 1] === label;

      return (
        <View key={index} style={[styles.stepLabelItem, {}]}>
          <Text
            style={[
              styles.stepLabel,
              selectedStepLabelStyle,
              {
                fontSize: customStyles.labelSize,
                fontFamily: customStyles.labelFontFamily,
                textAlign: firstElement
                  ? 'left'
                  : lastElement
                  ? 'right'
                  : 'center',
              },
            ]}
          >
            {label}
          </Text>
        </View>
      );
    });

    return <View style={styles.stepLabelsContainer}>{labelViews}</View>;
  };

  const renderStep = (position: number) => {
    let stepStyle;
    //let indicatorLabelStyle: TextStyle = {};
    switch (getStepStatus(position)) {
      case STEP_STATUS.CURRENT: {
        stepStyle = {
          backgroundColor: customStyles.stepIndicatorCurrentColor,
          //borderWidth: customStyles.currentStepStrokeWidth,
          //borderColor: customStyles.stepStrokeCurrentColor,
          height: 17, //sizeAnim,
          width: 24, //sizeAnim,
          borderRadius: 12, //borderRadiusAnim,
          overflow: 'hidden',
        };
        // indicatorLabelStyle = {
        //   overflow: "hidden",
        //   fontSize: customStyles.currentStepIndicatorLabelFontSize,
        //   color: customStyles.stepIndicatorLabelCurrentColor,
        // };

        break;
      }
      case STEP_STATUS.FINISHED: {
        stepStyle = {
          // backgroundColor: customStyles.stepIndicatorFinishedColor,
          borderWidth: customStyles.stepStrokeWidth,
          borderColor: customStyles.stepStrokeFinishedColor,
          height: 17, //staleSizeAnim,
          width: 17, //staleSizeAnim,
          // borderRadius: 10, //customStyles.stepIndicatorSize / 2,
          overflow: 'hidden',
        };
        // indicatorLabelStyle = {
        //   overflow: "hidden",
        //   fontSize: customStyles.stepIndicatorLabelFontSize,
        //   color: customStyles.stepIndicatorLabelFinishedColor,
        // };
        break;
      }

      case STEP_STATUS.UNFINISHED: {
        stepStyle = {
          backgroundColor: 'white', //customStyles.stepIndicatorUnFinishedColor,
          borderWidth: 1, //customStyles.stepStrokeWidth,
          borderColor: customStyles.stepStrokeUnFinishedColor,
          height: 17, //staleSizeAnim,
          width: 17, //staleSizeAnim,
          borderRadius: 9, //customStyles.stepIndicatorSize / 2,
          overflow: 'hidden',
        };
        // indicatorLabelStyle = {
        //   overflow: "hidden",
        //   fontSize: customStyles.stepIndicatorLabelFontSize,
        //   color: customStyles.stepIndicatorLabelUnFinishedColor,
        // };
        break;
      }
      default:
    }

    let finishedImage = getStepStatus(position);

    return (
      <Animated.View key={'step-indicator'} style={[styles.step, stepStyle]}>
        {finishedImage === 'finished' ? (
          <Image
            source={icons['check-mark']}
            style={{ height: 17, width: 17 }}
            contentFit="contain"
          />
        ) : null}
        {/* <Text style={indicatorLabelStyle}>{`${position + 1}`}</Text> */}
      </Animated.View>
    );
  };

  const getStepStatus = (stepPosition: number) => {
    if (stepPosition === currentPosition) {
      return STEP_STATUS.CURRENT;
    } else if (stepPosition < currentPosition) {
      return STEP_STATUS.FINISHED;
    } else {
      return STEP_STATUS.UNFINISHED;
    }
  };

  const onCurrentPositionChanged = (position: number) => {
    if (position > stepCount - 1) {
      position = stepCount - 1;
    }
    const animateToPosition = (progressBarSize / (stepCount - 1)) * position;
    sizeAnim.setValue(customStyles.stepIndicatorSize);
    staleSizeAnim.setValue(customStyles.stepIndicatorSize);
    borderRadiusAnim.setValue(customStyles.stepIndicatorSize / 2);
    Animated.sequence([
      Animated.timing(progressAnim, {
        toValue: isNaN(animateToPosition) ? 0 : animateToPosition,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(sizeAnim, {
          toValue: customStyles.currentStepIndicatorSize,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(borderRadiusAnim, {
          toValue: customStyles.currentStepIndicatorSize / 2,
          duration: 100,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };

  return (
    <View style={[styles.container, { flexDirection: 'column' }]}>
      {width !== 0 && (
        <React.Fragment>
          {renderProgressBarBackground()}
          {renderProgressBar()}
        </React.Fragment>
      )}
      {renderStepIndicator()}
      {labels && renderStepLabels()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(1,0,0,0)',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(1,0,0,0)',
    justifyContent: 'space-around',
  },
  stepLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    //justifyContent: "space-around",
  },
  step: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "space-between",
    //backgroundColor: "red",
    //justifyContent: "center",
    //backgroundColor: "rgba(0,0,0,0.2)",
  },
  stepLabel: {
    fontSize: 12,
    // textAlign: "center",
    //fontWeight: "500",
  },
  stepLabelItem: {
    flex: 1,
    // backgroundColor: "black",

    //alignItems: "center",
    //justifyContent: "center",
  },
});

export default React.memo(StepIndicator);
