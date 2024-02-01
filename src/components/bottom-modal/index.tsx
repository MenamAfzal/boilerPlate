import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { Ref } from 'react';
import React from 'react';
import { forwardRef } from 'react';

import { BottomBackdrop } from './components/bottom-backdrop';

export const BottomModal = forwardRef(
  (
    { children, ...props }: BottomSheetModalProps,
    ref: Ref<BottomSheetModal>
  ) => {
    return (
      <BottomSheetModal
        ref={ref}
        // handleComponent={BottomSheetHandle}
        enablePanDownToClose
        keyboardBlurBehavior="restore"
        backdropComponent={BottomBackdrop}
        {...props}
      >
        {children}
      </BottomSheetModal>
    );
  }
);
