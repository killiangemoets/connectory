import type { RegisterOptions } from "react-hook-form";

export interface RHFInputProps {
  name: string;
  label?: string;
  description?: string;
  message?: string;
  required?: boolean;
  rules?: RegisterOptions;
}
