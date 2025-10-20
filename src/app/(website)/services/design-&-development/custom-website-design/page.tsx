import React from "react";
import { Metadata } from "next";

import CustomWebsiteDesignPage from "@/containers/website/services/design-&-development/custom-website-design-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Custom Website Design Services | Zevitech Professional Web Solutions",
  description:
    "Stand out online with Zevitech’s custom website design services. We create unique, responsive, and SEO-friendly websites tailored to your brand, delivering exceptional user experience and business growth.",
});

function CustomWebsiteDesign() {
  return <CustomWebsiteDesignPage />;
}

export default CustomWebsiteDesign;
