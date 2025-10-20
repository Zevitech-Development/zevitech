import React from "react";
import { Metadata } from "next";

import { GetPageMetadata } from "@/utils/meta-data";
import SocialMediaKitDesignServicePage from "@/containers/website/services/branding-design-services/social-media-kit-design-service-page";

export const metadata: Metadata = GetPageMetadata({
  title: "Social Media Kit Design Services | Zevitech",
  description:
    "Professional social media kit designs to ensure your brand looks consistent and impactful across all platforms.",
});

function SocialMediaKitDesign() {
  return <SocialMediaKitDesignServicePage />;
}

export default SocialMediaKitDesign;
