import React from "react";
import { FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

import { cn } from "@/lib/utils";
import { CustomTextareaInterface } from "@/interfaces/common-interfaces";

const CustomTextarea = <T extends FieldValues>({
  control,
  name,
  placeholder = "Enter text...",
  rows = 5,
  className,
}: CustomTextareaInterface<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              className={cn(
                "rounded-[5px] md:!text-base !text-sm border border-border",
                className
              )}
              rows={rows}
            />
          </FormControl>
          <FormMessage className="text-red-600 text-[14px]" />
        </FormItem>
      )}
    />
  );
};

export default CustomTextarea;
