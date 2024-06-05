"use client";

import { Label as LabelComponent } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createContext } from "@/utils/context";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Controller, type ControllerProps, type FieldPath, type FieldValues, useFormContext } from "react-hook-form";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  required?: boolean;
};

const [FormFieldContextProvider, useFormFieldContext] = createContext<FormFieldContextValue>();

const Root = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContextProvider value={{ name: props.name, required: !!props?.rules?.required }}>
      <Controller {...props} />
    </FormFieldContextProvider>
  );
};

const useFormField = () => {
  const fieldContext = useFormFieldContext();
  const itemContext = useFormItemContext();
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField.Root>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    required: fieldContext.required,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const [FormItemContextProvider, useFormItemContext] = createContext<FormItemContextValue>();

const Item = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContextProvider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContextProvider>
  );
});
Item.displayName = "FormItem";

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
  ({ className, ...props }, ref) => {
    const { error, formItemId, required } = useFormField();

    return (
      <LabelComponent
        ref={ref}
        className={cn(!!error && "text-destructive", required && "after:text-destructive after:content-['_*']", className)}
        htmlFor={formItemId}
        {...props}
      />
    );
  }
);
Label.displayName = "FormLabel";

const Control = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
Control.displayName = "FormControl";

const Description = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
});
Description.displayName = "FormDescription";

const Message = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    );
  }
);
Message.displayName = "FormMessage";

export const FormField = { Item, Label, Control, Description, Message, Root };
