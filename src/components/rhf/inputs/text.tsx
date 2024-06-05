import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form-field";
import { TextInput, type TextInputProps } from "@/components/inputs/text";
import type { RHFInputProps } from "@/types/inputs";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

type RHFTextInput = RHFInputProps & Omit<TextInputProps, "value" | "onChange">;

export const RHFTextInput: FC<RHFTextInput> = ({ name, label, description, message, required, rules = {}, ...props }) => {
  const { control } = useFormContext();
  return (
    <FormField
      rules={{ ...rules, required }}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <TextInput {...props} {...field} />
          </FormControl>
          {!!description && <FormDescription>{description}</FormDescription>}
          <FormMessage>{message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
