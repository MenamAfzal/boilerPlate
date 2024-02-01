import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

import type { Theme } from '@/theme';
import { View } from '@/ui';

const data = [
  { day: 'M', earnings: 50 },
  { day: 'TU', earnings: 100 },
  { day: 'W', earnings: 200 },
  { day: 'TH', earnings: 300 },
  { day: 'F', earnings: 150 },
  { day: 'SA', earnings: 100 },
  { day: 'SU', earnings: 250 },
];

const VerticalBarChart = () => {
  const { width, height } = useWindowDimensions();
  const { colors } = useTheme<Theme>();

  return (
    <View width={width} flexDirection={'row'}>
      <VictoryChart
        width={width}
        height={height * 0.3}
        domainPadding={{ x: 20 }}
        theme={VictoryTheme.material}
      >
        <VictoryBar
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          barWidth={20}
          data={data}
          x="day"
          y="earnings"
          style={{ data: { fill: colors.primary } }}
        />
      </VictoryChart>
    </View>
  );
};

export default VerticalBarChart;
