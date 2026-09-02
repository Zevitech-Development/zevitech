import React from "react";
import { Metadata } from "next";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";
import SocialMediaKitDesignServicePage from "@/containers/website/services/branding-design-services/social-media-kit-design-service-page";

export const metadata: Metadata = GetPageMetadata({
  title: "Social Media Kit Design Services | Zevitech",
  description:
    "Professional social media kit designs to ensure your brand looks consistent and impactful across all platforms.",
  path: "/services/branding-design/social-media-kit-design",
});

function SocialMediaKitDesign() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/branding-design/social-media-kit-design", "Social Media Kit Design")} />
      <SocialMediaKitDesignServicePage />
    </>
  );
}

export default SocialMediaKitDesign;
