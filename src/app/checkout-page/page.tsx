import React, { Suspense } from "react";
import { Metadata } from "next";

import CheckoutPage from "@/containers/checkout-page/checkout-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Secure Checkout | Zevitech Design & Branding Services",
  description:
    "Complete your Zevitech order securely with our encrypted checkout. Review custom software, app development, and branding packages with confidence.",
});

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="layout-standard section-padding-standard flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Loading...</h1>
          <p className="mt-2 text-muted-foreground">
            Preparing your checkout details.
          </p>
        </div>
      </div>
    </div>
  );
}

function Checkout() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutPage />
    </Suspense>
  );
}

export default Checkout;
