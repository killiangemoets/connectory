import { cn } from "@/utils/tailwind";
import React from "react";

export const Typography = {
  h1: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className={cn("scroll-m-20  text-4xl font-bold", className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className={cn("scroll-m-20 text-3xl font-bold", className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className={cn("scroll-m-20 text-2xl font-bold", className)} {...props}>
      {children}
    </h3>
  ),
  body: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className={cn("text-base", className)} {...props}>
      {children}
    </p>
  ),
  error: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className={cn("text-sm text-destructive font-semibold", className)} {...props}>
      {children}
    </p>
  ),
};
