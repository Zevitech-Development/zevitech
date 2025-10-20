import React from "react";
import { FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

import { cn } from "@/lib/utils";
import { CustomInputInterface } from "@/interfaces/common-interfaces";

const CustomInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = "text",
  disabled = false,
  className,
}: CustomInputInterface<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              id={name as string}
              disabled={disabled}
              type={type}
              placeholder={placeholder}
              {...field}
              className={cn(
                "rounded-[5px] md:!text-base !text-sm h-[50px] border border-border",
                className
              )}
            />
          </FormControl>
          <FormMessage className="text-red-600 text-[14px]" />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
