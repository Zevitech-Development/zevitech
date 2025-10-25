import React from "react";
import { Metadata } from "next";

import ShopifyDevelopmentPage from "@/containers/website/services/e-commerce/shopify-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Looking to Launch or Scale Your Shopify Store? | Zevitech Shopify Experts",
  description:
    "Want to grow your eCommerce business with a high-converting Shopify store? Zevitech offers custom Shopify development, theme design, app integration, and store optimization. Let's build your success.",
});

function ShopifyDevelopment() {
  return <ShopifyDevelopmentPage />;
}

export default ShopifyDevelopment;
