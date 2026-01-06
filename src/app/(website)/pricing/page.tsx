import React from "react";
import { Metadata } from "next";

import PricingPage from "@/containers/website/pricing-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Custom Software & App Development Agency | Zevitech ",
  description:
    "Zevitech is a full-spectrum digital agency delivering mobile apps, web platforms, custom SaaS, UI/UX, eCommerce, SEO, and automation to scale your business.",
});

function Pricing() {
  return (
    <main>
      <PricingPage />
    </main>
  );
}

export default Pricing;
