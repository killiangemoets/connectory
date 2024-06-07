import { cn } from "@/utils/tailwind";
import { Search } from "lucide-react";
import * as React from "react";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
TextInput.displayName = "TextInput";

const SearchInput = React.forwardRef<HTMLInputElement, TextInputProps>(({ className, placeholder, ...props }, ref) => {
  return (
    <div className="flex justify-center relative">
      <Search className="w-4 h-4 absolute top-[50%] left-2 -translate-y-1/2 text-muted-foreground" />
      <TextInput placeholder={placeholder || "Search"} className={cn("pl-10 flex-1", className)} {...props} ref={ref} />
    </div>
  );
});
SearchInput.displayName = "SearchInput";

export { TextInput, SearchInput };
