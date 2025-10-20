import React from "react";
import { Metadata } from "next";

import WooCommerceWebsiteDevelopmentPage from "@/containers/website/services/e-commerce/woocommerce-website-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "WooCommerce Website Development Services | Zevitech WordPress Experts",
  description:
    "Launch and grow your online store with Zevitech’s WooCommerce website development services. We offer custom theme design, plugin integration, and store optimization to maximize sales and performance.",
});

function WooCommerceWebsiteDevelopment() {
  return <WooCommerceWebsiteDevelopmentPage />;
}

export default WooCommerceWebsiteDevelopment;
