"use client";

import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import * as React from "react";

const Root = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
Root.displayName = RadioGroupPrimitive.Root.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
Item.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroup = { Root, Item };

type RadioGroupProps<TValue extends string> = Omit<RadioGroupPrimitive.RadioGroupProps, "value" | "onValueChange"> & {
  value?: TValue;
  onValueChange?(value: TValue): void;
};

export type MultiOption<T extends string> = { id: T; label: string };

export type RadioInputProps<TValue extends string> = RadioGroupProps<TValue> & {
  items: MultiOption<TValue>[];
  className?: string;
};

export const RadioInput = <T extends string>({ items, ...props }: RadioInputProps<T>) => {
  return (
    <RadioGroup.Root {...props}>
      {items.map((radioItem) => {
        return <RadioGroup.Item key={radioItem.id} value={radioItem.id} />;
      })}
    </RadioGroup.Root>
  );
};