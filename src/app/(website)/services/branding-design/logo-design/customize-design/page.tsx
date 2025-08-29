import React from "react";
import { Metadata } from "next";

import CustomizeDesignServicePage from "@/containers/website/services/branding-design-services/logo-design/customize-design-service-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Custom Logo Design Services | Zevitech",
  description:
    "Get a fully customized logo design that reflects your brand's unique vision and stands out across all platforms.",
});

function CustomizeDesign() {
  return <CustomizeDesignServicePage />;
}

export default CustomizeDesign;
