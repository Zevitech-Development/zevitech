import React from "react";
import { Metadata } from "next";

import ShopifyDevelopmentPage from "@/containers/website/services/e-commerce/shopify-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Launch & Scale Your Shopify Store | Zevitech Experts",
  description:
    "Grow your eCommerce business with Zevitech’s Shopify development. Custom stores, theme design, app integration, and optimization for higher conversions.",
  path: "/landing-pages/shopify-development",
});

function ShopifyDevelopment() {
  return <ShopifyDevelopmentPage />;
}

export default ShopifyDevelopment;
