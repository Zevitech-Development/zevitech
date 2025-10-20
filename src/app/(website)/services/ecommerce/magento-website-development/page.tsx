import React from "react";
import { Metadata } from "next";

import MagentoWebsiteDevelopmentPage from "@/containers/website/services/e-commerce/magento-website-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Magento Website Development Services | Zevitech eCommerce Solutions",
  description:
    "Build a powerful, scalable, and feature-rich online store with Zevitech’s Magento website development services. From custom design and theme development to extension integration and performance optimization, we help your business thrive.",
});

function MagentoWebsiteDevelopment() {
  return <MagentoWebsiteDevelopmentPage />;
}

export default MagentoWebsiteDevelopment;
