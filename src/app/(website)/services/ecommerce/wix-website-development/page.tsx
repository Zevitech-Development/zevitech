import React from "react";
import { Metadata } from "next";

import WixWebsiteDevelopmentPage from "@/containers/website/services/e-commerce/wix-website-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Wix Website Development Services | Zevitech Web Design Experts",
  description:
    "Get a professional and high-converting Wix website with Zevitech’s Wix development services. We specialize in custom design, integrations, SEO optimization, and eCommerce setup to help your business grow online.",
});

function WixWebsiteDevelopment() {
  return <WixWebsiteDevelopmentPage />;
}

export default WixWebsiteDevelopment;
