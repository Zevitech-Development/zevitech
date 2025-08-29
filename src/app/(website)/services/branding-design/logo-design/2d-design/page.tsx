import React from "react";
import { Metadata } from "next";

import Design2dServicePage from "@/containers/website/services/branding-design-services/logo-design/2d-design-service-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "2D Logo Design Services | Zevitech",
  description:
    "Get professional 2D logo design services tailored to your brand. Clean, modern, and memorable logos to make your business stand out.",
});

function Design2d() {
  return <Design2dServicePage />;
}

export default Design2d;
