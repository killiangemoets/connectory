import type { RadioInputProps } from "@/components/inputs/radio";
import { RadioInput } from "@/components/inputs/radio";
import { FormField } from "@/components/rhf/form-field";
import type { RHFInputProps } from "@/types/inputs";
import { useFormContext } from "react-hook-form";

type RHFRadioInputProps<T extends string> = RHFInputProps & Omit<RadioInputProps<T>, "value" | "onChange">;

export const RHFRadioInput = <T extends string>({
  name,
  label,
  description,
  message,
  required,
  rules = {},
  hideError,
  ...props
}: RHFRadioInputProps<T>) => {
  const { control } = useFormContext();
  return (
    <FormField.Root
      rules={{ ...rules, required }}
      control={control}
      hideError={hideError}
      name={name}
      render={({ field }) => (
        <FormField.Item>
          {!!label && <FormField.Label>{label}</FormField.Label>}
          <FormField.Control>
            <RadioInput {...props} value={field.value} onValueChange={field.onChange} />
          </FormField.Control>
          {!!description && <FormField.Description>{description}</FormField.Description>}
          <FormField.Message>{message}</FormField.Message>
        </FormField.Item>
      )}
    />
  );
};
