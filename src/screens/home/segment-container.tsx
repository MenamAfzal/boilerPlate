import SegmentedControl, {
  Segment,
} from '@hadnet/react-native-segmented-control';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

import { AppFonts } from '@/constants/fonts';
import { palette } from '@/theme';

type SegmentContainerProps = {
  onChangeSegment: (index: number) => void;
};

export const SegmentContainer = ({
  onChangeSegment,
}: SegmentContainerProps) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const { width } = useWindowDimensions();

  return (
    <SegmentedControl
      haptics
      segmentedControlWrapper={{
        width: width - scale(32),
        backgroundColor: palette.grey500,
        borderRadius: scale(8),
        height: scale(44),
      }}
      tileStyle={styles.tile}
      segments={[
        <Segment
          title="Pending"
          inactiveTitleStyle={styles.inActiveTitle}
          activeTitleStyle={styles.activeTitle}
        />,
        <Segment
          title="Shortlisted"
          inactiveTitleStyle={styles.inActiveTitle}
          activeTitleStyle={styles.activeTitle}
        />,
        <Segment
          title="Interviews"
          inactiveTitleStyle={styles.inActiveTitle}
          activeTitleStyle={styles.activeTitle}
        />,
      ]}
      onChange={(index) => {
        setTabIndex(index);
        onChangeSegment?.(index);
      }}
      currentIndex={tabIndex}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.grey500,
    borderRadius: 12,
    height: 64,
  },
  tile: {
    margin: scale(6),
    backgroundColor: palette.primary,
    borderRadius: scale(8),
  },
  activeTitle: {
    color: palette.white,
    fontSize: 13,
    fontFamily: AppFonts.APP_FONT_MEDIUM,
  },
  inActiveTitle: {
    color: palette.grey200,
    fontSize: 13,
    fontFamily: AppFonts.APP_FONT_MEDIUM,
  },
});
