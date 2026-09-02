import React from "react";
import { Metadata } from "next";

import PricingPage from "@/containers/website/pricing-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Pricing & Packages | Zevitech Design & Development Services",
  description:
    "Compare Zevitech pricing and packages for Shopify stores, website development, logo design, packaging, social media kits, and brand identity. Transparent plans for every budget.",
  path: "/pricing",
});

function Pricing() {
  return (
    <main>
      <PricingPage />
    </main>
  );
}

export default Pricing;
