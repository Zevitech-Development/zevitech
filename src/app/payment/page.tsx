import React, { Suspense } from "react";
import { Metadata } from "next";

import PaymentPage from "@/containers/payment/payment-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Secure Payment | Zevitech Design & Branding Services",
  description:
    "Complete your payment securely with PayPal. Process your order with confidence using our encrypted payment system for design and branding services.",
});

function PaymentLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="layout-standard section-padding-standard flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Loading...</h1>
          <p className="mt-2 text-muted-foreground">
            Preparing your payment details.
          </p>
        </div>
      </div>
    </div>
  );
}

function Payment() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentPage />
    </Suspense>
  );
}

export default Payment;