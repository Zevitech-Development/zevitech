import { Control, FieldValues, Path } from "react-hook-form";

export interface CustomSystemFieldInterface {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export interface CustomInputInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export interface CustomTextareaInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  rows?: number;
  className?: string;
}
