import { Typography } from "../typography";
import { cn } from "@/utils/tailwind";
import { Label } from "@radix-ui/react-label";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { ArrowRight, Circle } from "lucide-react";
import * as React from "react";

const Root = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
Root.displayName = RadioGroupPrimitive.Root.displayName;

type ItemProps = RadioGroupPrimitive.RadioGroupItemProps & {
  label: string;
};

const Item = React.forwardRef<HTMLDivElement, ItemProps>(({ className, label, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2" ref={ref}>
      <RadioGroupPrimitive.Item
        id={props.value}
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
      <Label htmlFor={props.value} className="cursor-pointer">
        {label}
      </Label>
    </div>
  );
});
Item.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroup = { Root, Item };

type RadioGroupProps<TValue extends string> = Omit<RadioGroupPrimitive.RadioGroupProps, "value" | "onValueChange"> & {
  value?: TValue;
  onValueChange?(value: TValue): void;
};

export type MultiOption<T extends string> = { value: T; label: string };

export type RadioInputProps<TValue extends string> = RadioGroupProps<TValue> & {
  items: MultiOption<TValue>[];
  className?: string;
  readOnly?: boolean;
};

export const RadioInput = <T extends string>({ items, readOnly = false, ...props }: RadioInputProps<T>) => {
  if (readOnly) {
    const label = items.find((item) => item.value === props.value)?.label;
    return (
      <div className="flex items-center gap-2">
        <ArrowRight className="h-4 w-4" />
        <Typography.body>{label}</Typography.body>
      </div>
    );
  }

  return (
    <RadioGroup.Root {...props}>
      {items.map((item) => {
        return <RadioGroup.Item label={item.label} key={item.value} value={item.value} />;
      })}
    </RadioGroup.Root>
  );
};
