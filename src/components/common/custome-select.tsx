import React from "react";
import { FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { cn } from "@/lib/utils";
import { CustomSelectInterface } from "@/interfaces/common-interfaces";



const CustomSelect = <T extends FieldValues>({
  control,
  name,
  placeholder,
  disabled = false,
  className,
  options,
}: CustomSelectInterface<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
              <SelectTrigger
                className={cn(
                  "rounded-[5px] md:!text-base !text-sm h-[50px] border border-border",
                  className
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value} className=" focus:bg-primary focus:text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-red-600 text-[14px]" />
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;