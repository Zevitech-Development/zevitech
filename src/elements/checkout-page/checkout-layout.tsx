"use client";
import { useSearchParams } from "next/navigation";

import { CheckoutForm } from "./checkout-form";
import { OrderSummary } from "./order-summary";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  categoryLabels,
  LogoCategory,
} from "@/content/checkout-page/checkout-page-content";
import { logoPricingData } from "@/content/services/logo-landing-content/logo-landing-content";

export function CheckoutLayout() {
  const searchParams = useSearchParams();

  const category = (searchParams.get("category") ||
    "twoDLogoDesign") as LogoCategory;
  const planName = searchParams.get("plan") || "Gold";

  const currentPackages = logoPricingData[category];
  const selectedPackage = currentPackages?.find((pkg) => pkg.plan === planName);
  const categoryName = categoryLabels[category];

  if (!selectedPackage || !currentPackages) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="layout-standard section-padding-standard flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Package Not Found
            </h1>
            <p className="mt-2 text-muted-foreground">
              Please select a valid package from the pricing page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="layout-standard section-padding-standard">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-hover text-balance">
            Complete Your Order
          </h1>
          <p className="mt-3 text-base text-paragraph max-w-3xl">
            Provide your information below to collaborate with our expert
            designers and bring your brand to life through a stunning,
            professional logo.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          <Card className="shadow-lg border-border/50 h-fit">
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
              <CardDescription>
                We'll use these details to keep you updated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutForm />
            </CardContent>
          </Card>

          <OrderSummary
            category={category}
            categoryName={categoryName}
            selectedPackage={selectedPackage}
          />
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <span className="font-semibold text-foreground">Zevitech</span>
          </p>
        </div>
      </div>
    </div>
  );
}
