import React from "react";
import { Metadata } from "next";

import WixWebsiteDevelopmentPage from "@/containers/website/services/e-commerce/wix-website-development-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "Wix Website Development Services | Zevitech Web Design Experts",
  description:
    "Get a professional and high-converting Wix website with Zevitech’s Wix development services. We specialize in custom design, integrations, SEO optimization, and eCommerce setup to help your business grow online.",
  path: "/services/ecommerce/wix-website-development",
});

function WixWebsiteDevelopment() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/ecommerce/wix-website-development", "Wix Website Development")} />
      <WixWebsiteDevelopmentPage />
    </>
  );
}

export default WixWebsiteDevelopment;
