"use client";

import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import type { ShopifyStudioSelectProps } from "@/interfaces/shopify-studio-select-interface";
import { cn } from "@/lib/utils";

const ShopifyStudioSelect = forwardRef<
  HTMLSelectElement,
  ShopifyStudioSelectProps
>(function ShopifyStudioSelect(
  { children, className, wrapperClassName, ...props },
  ref,
) {
  return (
    <span className={cn("relative block w-full min-w-0", wrapperClassName)}>
      <select
        {...props}
        ref={ref}
        className={cn(
          "peer block w-full min-w-0 cursor-pointer rounded-xl border border-border bg-background py-3 pl-3 font-medium text-heading shadow-sm transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:bg-muted disabled:text-paragraph disabled:opacity-70",
          className,
          "min-h-12 appearance-none pr-12 text-base",
        )}
      >
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-muted text-primary transition-colors peer-focus-visible:bg-muted peer-disabled:bg-muted peer-disabled:text-paragraph"
      >
        <ChevronDown aria-hidden="true" focusable="false" className="h-4 w-4" />
      </span>
    </span>
  );
});

export default ShopifyStudioSelect;
