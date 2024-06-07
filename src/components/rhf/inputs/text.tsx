import { TextInput, type TextInputProps } from "@/components/inputs/text";
import { FormField } from "@/components/rhf/form-field";
import type { RHFInputProps } from "@/types/inputs";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

type RHFTextInput = RHFInputProps & Omit<TextInputProps, "value" | "onChange">;

export const RHFTextInput: FC<RHFTextInput> = ({ name, label, description, message, rules = {}, hideError, ...props }) => {
  const { control } = useFormContext();
  return (
    <FormField.Root
      rules={{ ...rules }}
      control={control}
      name={name}
      hideError={hideError}
      render={({ field }) => (
        <FormField.Item>
          {!!label && <FormField.Label>{label}</FormField.Label>}
          <FormField.Control>
            <TextInput {...props} {...field} />
          </FormField.Control>
          {!!description && <FormField.Description>{description}</FormField.Description>}
          <FormField.Message>{message}</FormField.Message>
        </FormField.Item>
      )}
    />
  );
};
