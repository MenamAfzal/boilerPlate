import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { NMultiInputProps } from './multine-text-field';
import { MultiTextField } from './multine-text-field';

type TRule = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

interface ControlledInputProps<T extends FieldValues>
  extends NMultiInputProps,
    InputControllerType<T> {}

// only used with react-hook-form
export function DescriptionField<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;

  // @ts-ignore
  const { field, fieldState } = useController({ control, name, rules });
  return (
    <MultiTextField
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={field.value as string}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
