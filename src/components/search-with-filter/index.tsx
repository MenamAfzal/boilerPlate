import React from "react";

import { SearchField } from "@/components/search-field";
import { View } from "@/ui";

import { ImageButton } from "../image-button";

type SearchWithFilterProp = {
  searchValue?: string;
  onChangeText?: (text: string) => void;
  onFilter: () => void;
  onSwap?: () => void;
};

export const SearchWithFilter = ({
  onFilter,
  onSwap,
  searchValue,
  onChangeText,
}: SearchWithFilterProp) => {
  return (
    <View
      backgroundColor={"grey500"}
      paddingVertical={"large"}
      flexDirection={"row"}
      alignItems={"center"}
      paddingHorizontal={"large"}
      columnGap={"medium"}
    >
      <View flex={1}>
        <SearchField
          placeholder="Search by name"
          showBorder={true}
          value={searchValue}
          onChangeText={(text) => onChangeText(text)}
        />
      </View>

      <ImageButton icon="filter" backgroundColor={"black"} onPress={onFilter} />
      {onSwap ? <ImageButton icon="swap" backgroundColor={"black"} onPress={onSwap} /> : null}
    </View>
  );
};
