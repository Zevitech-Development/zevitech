"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LoaderCircle, User, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { MultiStepFormData } from "./index";

interface StepContactProps {
  formData: MultiStepFormData;
  updateFormData: (field: keyof MultiStepFormData, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function StepContact({
  formData,
  updateFormData,
  onBack,
  onSubmit,
  loading,
}: StepContactProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-5 md:space-y-6 pt-4 md:pt-6">
      <div className="text-center">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-heading mb-1 md:mb-2">
          Almost done! Where should we send your quote?
        </h3>
        <p className="text-sm md:text-base text-paragraph">
          We&apos;ll get back to you within 24 hours
        </p>
      </div>

      <div className="space-y-4 md:space-y-5">
        {/* Name Field */}
        <div className="relative">
          <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" />
          <Input
            type="text"
            placeholder="Your Name *"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            className={cn(
              "pl-10 md:pl-12 h-12 md:h-14 text-sm md:text-base rounded-xl border-2",
              errors.name ? "border-red-500" : "border-gray-200",
              "focus:border-primary focus:ring-0 focus-visible:ring-0"
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-xs md:text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" />
          <Input
            type="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className={cn(
              "pl-10 md:pl-12 h-12 md:h-14 text-sm md:text-base rounded-xl border-2",
              errors.email ? "border-red-500" : "border-gray-200",
              "focus:border-primary focus:ring-0 focus-visible:ring-0"
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="relative">
          <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" />
          <Input
            type="tel"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            className={cn(
              "pl-10 md:pl-12 h-12 md:h-14 text-sm md:text-base rounded-xl border-2",
              errors.phone ? "border-red-500" : "border-gray-200",
              "focus:border-primary focus:ring-0 focus-visible:ring-0"
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs md:text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-2 md:pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full border-gray-300"
          disabled={loading}
        >
          <FaArrowLeftLong className="mr-2" /> Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary hover:bg-primary-hover text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-full disabled:opacity-70"
        >
          {loading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Get My Free Quote"
          )}
        </Button>
      </div>

      <p className="text-xs md:text-sm text-center text-paragraph pt-2">
        By submitting, you agree to receive communications from Zevitech
      </p>
    </div>
  );
}
