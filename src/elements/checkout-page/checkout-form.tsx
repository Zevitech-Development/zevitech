"use client";

import type React from "react";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  categoryLabels,
  LogoCategory,
} from "@/content/checkout-page/checkout-page-content";
import { logoPricingData } from "@/content/services/logo-landing-content/logo-landing-content";

export function CheckoutForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get order data from current URL params
    const category = (searchParams.get("category") || "twoDLogoDesign") as LogoCategory;
    const planName = searchParams.get("plan") || "Gold";
    
    const currentPackages = logoPricingData[category];
    const selectedPackage = currentPackages?.find((pkg) => pkg.plan === planName);
    const categoryName = categoryLabels[category];

    if (!selectedPackage || !formData.fullName || !formData.email || !formData.phone) {
      setIsSubmitting(false);
      return;
    }

    // Create payment URL with all necessary data
    const paymentParams = new URLSearchParams({
      category,
      categoryName,
      plan: selectedPackage.plan,
      price: selectedPackage.price.toString(),
      description: selectedPackage.description,
      features: JSON.stringify(selectedPackage.features),
      badge: selectedPackage.badge || "",
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    });

    // Redirect to payment page
    router.push(`/payment?${paymentParams.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Full Name
        </Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="h-11 rounded-lg bg-white/70"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="h-11 rounded-lg bg-white/70"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={handleChange}
          required
          className="h-11 rounded-lg bg-white/70"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Proceed to Payment"}
      </Button>
    </form>
  );
}
