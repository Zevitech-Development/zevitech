import React from "react";
import { Metadata } from "next";

import ShopifyDevelopmentPage from "@/containers/website/services/e-commerce/shopify-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Custom Sales-Focused Shopify Store Development | Zevitech",
  description:
    "Explore custom Shopify store designs and development packages from $249. Pay 10% upfront, with the remaining balance after delivery. Built around your brand.",
  path: "/landing-pages/shopify-development",
});

function ShopifyDevelopment() {
  return <ShopifyDevelopmentPage />;
}

export default ShopifyDevelopment;
