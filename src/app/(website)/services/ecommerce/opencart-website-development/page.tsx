import React from "react";
import { Metadata } from "next";

import OpenCartWebsiteDevelopmentPage from "@/containers/website/services/e-commerce/opencart-website-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Custom OpenCart Website Development Services | Zevitech eCommerce Experts",
  description:
    "Boost your online sales with Zevitech’s OpenCart website development services. We deliver custom OpenCart store design, theme customization, module integration, and performance optimization to scale your eCommerce business.",
});

function OpenCartWebsiteDevelopment() {
  return <OpenCartWebsiteDevelopmentPage />;
}

export default OpenCartWebsiteDevelopment;
