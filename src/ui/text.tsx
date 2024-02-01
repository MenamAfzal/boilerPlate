/* eslint-disable react-native/no-inline-styles */
import type {
  BackgroundColorProps,
  BackgroundColorShorthandProps,
  LayoutProps,
} from '@shopify/restyle';
import {
  backgroundColor,
  backgroundColorShorthand,
  composeRestyleFunctions,
  layout,
  useRestyle,
} from '@shopify/restyle';
import { createRestyleFunction, createText } from '@shopify/restyle';
import type { ComponentProps } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TxKeyPath } from '@/i18n/utils';
import type { Theme } from '@/theme';

export const SText = createText<Theme>();

export const fontSize = createRestyleFunction({
  property: 'fontSize',
  styleProperty: 'fontSize',
  transform: ({ theme, value }) => {
    if (typeof value === 'string') {
      return theme.fontSize[value];
    }
    return value;
  },
});

export const fontFamily2 = createRestyleFunction({
  property: 'fontFamily',
  styleProperty: 'fontFamily',
  transform: ({ theme, value }) => {
    return theme.fontFamily[value] || value;
  },
});

export type TextProps = Omit<
  ComponentProps<typeof SText>,
  'fontSize' | 'fontFamily'
> & {
  isTruncated?: boolean;
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: Record<string, any>;

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string | number | null;
  fontFamily?: string;
  fontSize?: number;
} & LayoutProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunc = composeRestyleFunctions<Theme, any>([
  layout,
  backgroundColor,
  backgroundColorShorthand,
  fontFamily2,
]);

export const Text = (props: TextProps) => {
  const { t } = useTranslation();
  const {
    tx,
    txOptions,
    text,
    children,
    variant = 'medium14',
    isTruncated,
    style,
    fontFamily,
    color,
    ...rest
  } = props;
  // @ts-ignore
  const i18nText = tx && t(tx as any, txOptions);

  const content =
    i18nText || (typeof text === 'number' ? String(text) : text) || children;
  // @ts-ignore
  const { style: restyled } = useRestyle(restyleFunc as any, rest);

  return (
    <SText
      variant={variant}
      ellipsizeMode={isTruncated ? 'tail' : undefined}
      fontFamily={fontFamily}
      color={color}
      style={[
        isTruncated ? { flexShrink: 1, flexWrap: 'wrap' } : {},
        // @ts-ignore
        restyled[0],
        style,
      ]}
      {...(rest as any)}
    >
      {content}
    </SText>
  );
};
