import React from "react";
import { Metadata } from "next";

import SocialMediaMarketingPage from "@/containers/website/services/digital-marketing/social-media-marketing-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Social Media Marketing Services | Zevitech Experts",
  description:
    "Grow your brand with Zevitech’s social media marketing services. We create result-driven strategies for Facebook, Instagram, LinkedIn, and more.",
});

function SocialMediaMarketing() {
  return <SocialMediaMarketingPage />;
}

export default SocialMediaMarketing;
