import React from "react";
import { Metadata } from "next";

import CheckoutPage from "@/containers/checkout-page/checkout-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Secure Checkout | Zevitech Design & Branding Services",
  description:
    "Complete your order securely with Zevitech’s encrypted checkout process. Review your selected package, enter your details, and finalize your payment with full confidence and transparency.",
});

function Checkout() {
  return <CheckoutPage />;
}

export default Checkout;
