import React from "react";
import { Metadata } from "next";

import MinimalDesignServicePage from "@/containers/website/services/branding-design-services/logo-design/minimal-design-service-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Minimal Logo Design Services | Zevitech",
  description:
    "Elegant minimal logo designs for modern businesses. Clean, timeless, and versatile branding solutions tailored to your needs.",
});

function MinimalDesign() {
  return <MinimalDesignServicePage />;
}

export default MinimalDesign;
