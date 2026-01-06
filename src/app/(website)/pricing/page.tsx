import React from "react";
import { Metadata } from "next";

import PricingPage from "@/containers/website/pricing-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Custom Software & App Development Agency | Zevitech ",
  description:
    "Zevitech is a full-spectrum digital solutions agency offering mobile apps, web platforms, custom software, SaaS, UI/UX, eCommerce, SEO, automation, and branding.",
});

function Pricing() {
  return (
    <main>
      <PricingPage />
    </main>
  );
}

export default Pricing;
