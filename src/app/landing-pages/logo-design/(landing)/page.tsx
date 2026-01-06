import React from "react";
import { Metadata } from "next";

import LogoDesignPage from "@/containers/website/services/branding-design-services/logo-design/logo-design-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Logo Design Services | Zevitech Creative Branding Experts",
  description:
    "Create a lasting impression with Zevitech’s logo design services. We craft unique, memorable, and brand-focused logos that define your identity.",
});

function LogoDesign() {
  return <LogoDesignPage />;
}

export default LogoDesign;
