import type { ComponentPropsWithoutRef } from "react";
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormProvider } from "react-hook-form";

type ReactHookFormProps<TFormValues extends FieldValues> = {
  methods: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
} & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

export const Form = <TFormValues extends FieldValues>({ methods, onSubmit, children, ...props }: ReactHookFormProps<TFormValues>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {children}
        {/* set up the dev tool */}
        {/* <DevTool control={methods.control} /> */}
      </form>
    </FormProvider>
  );
};
