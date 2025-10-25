import React from "react";
import { Metadata } from "next";

import Design3dServicePage from "@/containers/website/services/branding-design-services/logo-design-services/3d-design-service-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "3D Logo Design Services | Zevitech",
  description:
    "Eye-catching 3D logo design services to create bold and modern logos that make your brand stand out in digital and print spaces.",
});

function Design3d() {
  return <Design3dServicePage />;
}

export default Design3d;
