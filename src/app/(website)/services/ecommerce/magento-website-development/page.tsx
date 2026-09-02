import React from "react";
import { Metadata } from "next";

import MagentoWebsiteDevelopmentPage from "@/containers/website/services/e-commerce/magento-website-development-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "Magento Website Development Services | Zevitech eCommerce Solutions",
  description:
    "Build a powerful, scalable, and feature-rich online store with Zevitech’s Magento website development services. From custom design and theme development to extension integration and performance optimization, we help your business thrive.",
  path: "/services/ecommerce/magento-website-development",
});

function MagentoWebsiteDevelopment() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/ecommerce/magento-website-development", "Magento Website Development")} />
      <MagentoWebsiteDevelopmentPage />
    </>
  );
}

export default MagentoWebsiteDevelopment;
