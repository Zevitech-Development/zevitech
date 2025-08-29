import React from "react";
import { Metadata } from "next";


import { GetPageMetadata } from "@/utils/meta-data";
import BrandIdentityDesignServicePage from "@/containers/website/services/branding-design-services/brand-identity-design-service-page";

export const metadata: Metadata = GetPageMetadata({
  title: "Brand Identity Design Services | Zevitech",
  description:
    "Professional brand identity design to help your business stand out. Logos, stationery, and complete branding solutions tailored for your audience.",
});

function BrandIdentityDesign() {
  return <BrandIdentityDesignServicePage />;
}

export default BrandIdentityDesign;
