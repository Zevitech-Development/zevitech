import React from "react";

import {
  CTAButton01Props,
  CTAButton02Props,
} from "@/interfaces/components.partials-interfaces";

import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

export const CTAButton01 = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & CTAButton01Props
>(({ class: className, ctaButton01Text, ctaButton01OnClick, ...props }, ref) => {
  return (
    <button
      ref={ref}
      onClick={ctaButton01OnClick}
      type="button"
      className={cn("cta-button-01", className)}
      {...props}
    >
      <span className="cta-button-01-fold" />

      <div className="cta-button-01-points-wrapper">
        {Array.from({ length: 10 }).map((_, i) => (
          <i key={i} className="cta-button-01-point" />
        ))}
      </div>

      <span className="cta-button-01-inner">
        <svg
          className="cta-button-01-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        >
          <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37"></polyline>
        </svg>
        {ctaButton01Text}
      </span>
    </button>
  );
});
CTAButton01.displayName = "CTAButton01";

export function CTAButton02({
  class: className,
  ctaButton02Text,
  ctaButton02IconLeft,
  ctaButton02OnClick,
  ctaButton02IconRight,
}: CTAButton02Props) {
  return (
    <Button
      onClick={ctaButton02OnClick}
      className={cn("cta-button-02 flex items-center gap-2", className)}
    >
      {ctaButton02IconLeft && ctaButton02IconLeft}
      {ctaButton02Text}
      {ctaButton02IconRight && ctaButton02IconRight}
    </Button>
  );
}
