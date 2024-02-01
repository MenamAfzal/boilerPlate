import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { scale } from 'react-native-size-matters';

import { palette } from '@/theme';
import { Text, View } from '@/ui';

const SelectionBox = ({ placeholder, label, data, onChange }: any) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      {label && (
        <Text paddingVertical={'small'} variant="medium14" color={'black'}>
          {label}
        </Text>
      )}
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data ?? []}
          maxHeight={300}
          //@ts-ignore
          labelField="name"
          //@ts-ignore
          valueField="id"
          dropdownPosition="auto"
          placeholder={!isFocus ? placeholder : '...'}
          //value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            //@ts-ignore

            onChange?.(item);
            setIsFocus(false);
          }}
        />
      </View>
    </>
  );
};

export default SelectionBox;

const styles = StyleSheet.create({
  container: {
    height: scale(49),
    backgroundColor: palette.grey500,
    borderRadius: scale(8),
    marginBottom: scale(8),
  },
  dropdown: {
    height: scale(49),
    padding: scale(14),
    borderRadius: scale(8),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#8C8C8C',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
