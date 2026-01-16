"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Globe,
  ShoppingCart,
  FileText,
  Code,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

interface StepServiceProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const services = [
  {
    id: "business-website",
    label: "Business Website",
    icon: Globe,
  },
  {
    id: "ecommerce",
    label: "eCommerce / Online Store",
    icon: ShoppingCart,
  },
  {
    id: "landing-page",
    label: "Landing Page",
    icon: FileText,
  },
  {
    id: "web-application",
    label: "Web Application",
    icon: Code,
  },
  {
    id: "redesign",
    label: "Redesign Existing Site",
    icon: RefreshCw,
  },
  {
    id: "other",
    label: "Other",
    icon: HelpCircle,
  },
];

export default function StepService({
  value,
  onChange,
  onNext,
}: StepServiceProps) {
  const handleSelect = (serviceId: string) => {
    onChange(serviceId);
  };

  return (
    <div className="space-y-6 md:space-y-8 pt-4 md:pt-6">
      <div className="text-center">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-heading mb-1 md:mb-2">
          What type of website do you need?
        </h3>
        <p className="text-sm md:text-base text-paragraph">Select one option</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = value === service.id;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => handleSelect(service.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-5 lg:p-6 rounded-xl border-2 transition-all duration-200",
                "hover:border-primary hover:bg-primary/5",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 bg-white text-paragraph"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 md:w-8 md:h-8",
                  isSelected ? "text-primary" : "text-gray-500"
                )}
              />
              <span
                className={cn(
                  "text-sm md:text-base font-medium text-center",
                  isSelected ? "text-primary" : "text-heading"
                )}
              >
                {service.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-2 md:pt-4">
        <Button
          onClick={onNext}
          disabled={!value}
          className="bg-primary hover:bg-primary-hover text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full disabled:opacity-50"
        >
          Next <FaArrowRightLong className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
