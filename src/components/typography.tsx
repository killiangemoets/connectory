import { cn } from "@/lib/utils";
import React from "react";

export const Typography = {
  h1: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className={cn("scroll-m-20 text-heading-1", className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className={cn("scroll-m-20 text-heading-2", className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className={cn("scroll-m-20 text-heading-3", className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h4">) => (
    <h4 className={cn("scroll-m-20 text-heading-4", className)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h5">) => (
    <h5 className={cn("scroll-m-20 text-heading-5", className)} {...props}>
      {children}
    </h5>
  ),
  body: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className={cn("text-base", className)} {...props}>
      {children}
    </p>
  ),
  note: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className={cn("text-sm font-semibold", className)} {...props}>
      {children}
    </p>
  ),
  error: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className={cn("text-sm text-destructive font-semibold", className)} {...props}>
      {children}
    </p>
  ),
};
