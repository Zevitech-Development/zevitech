import React from "react";
import { Metadata } from "next";

import OpenCartWebsiteDevelopmentPage from "@/containers/website/services/e-commerce/opencart-website-development-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Custom OpenCart Website Development Services | Zevitech eCommerce Experts",
  description:
    "Boost your online sales with Zevitech’s OpenCart website development services. We deliver custom OpenCart store design, theme customization, module integration, and performance optimization to scale your eCommerce business.",
  path: "/services/ecommerce/opencart-website-development",
});

function OpenCartWebsiteDevelopment() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/ecommerce/opencart-website-development", "OpenCart Website Development")} />
      <OpenCartWebsiteDevelopmentPage />
    </>
  );
}

export default OpenCartWebsiteDevelopment;
