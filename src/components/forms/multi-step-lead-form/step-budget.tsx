"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

interface StepBudgetProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const budgetOptions = [
  {
    id: "under-2000",
    label: "Less than 2,000 AED",
    description: "Small projects",
  },
  {
    id: "2000-5000",
    label: "2,000 - 5,000 AED",
    description: "Standard websites",
  },
  {
    id: "5000-15000",
    label: "5,000 - 15,000 AED",
    description: "Professional sites",
  },
  {
    id: "15000-35000",
    label: "15,000 - 35,000 AED",
    description: "Advanced projects",
  },
  {
    id: "above-35000",
    label: "35,000+ AED",
    description: "Enterprise solutions",
  },
  {
    id: "not-sure",
    label: "Not sure yet",
    description: "Need consultation",
  },
];

export default function StepBudget({
  value,
  onChange,
  onNext,
  onBack,
}: StepBudgetProps) {
  const handleSelect = (budgetId: string) => {
    onChange(budgetId);
  };

  return (
    <div className="space-y-6 md:space-y-8 pt-4 md:pt-6">
      <div className="text-center">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-heading mb-1 md:mb-2">
          What&apos;s your budget range?
        </h3>
        <p className="text-sm md:text-base text-paragraph">
          This helps us tailor our proposal
        </p>
      </div>

      <div className="space-y-2 md:space-y-3">
        {budgetOptions.map((budget) => {
          const isSelected = value === budget.id;

          return (
            <button
              key={budget.id}
              type="button"
              onClick={() => handleSelect(budget.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 md:p-5 rounded-xl border-2 transition-all duration-200",
                "hover:border-primary hover:bg-primary/5",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 bg-white"
              )}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div
                  className={cn(
                    "w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center",
                    isSelected ? "border-primary" : "border-gray-300"
                  )}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary" />
                  )}
                </div>
                <div className="text-left">
                  <p
                    className={cn(
                      "font-medium text-sm md:text-base",
                      isSelected ? "text-primary" : "text-heading"
                    )}
                  >
                    {budget.label}
                  </p>
                  <p className="text-xs md:text-sm text-paragraph">{budget.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-2 md:pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full border-gray-300"
        >
          <FaArrowLeftLong className="mr-2" /> Back
        </Button>
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
