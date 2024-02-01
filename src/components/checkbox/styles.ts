import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { palette } from '@/theme';

const primary = palette.primary; // "rgb(0, 122, 255)";
const grey = palette.grey400;

const DIMENSIONS = { width: scale(16), height: scale(16) };
export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  outline: {
    ...DIMENSIONS,
    //marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: grey,
    borderRadius: 4,
  },
  fill: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
    backgroundColor: primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  label: {
    paddingLeft: 8,
  },
});
