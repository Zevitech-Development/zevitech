import React from "react";
import { Metadata } from "next";

import SocialMediaMarketingPage from "@/containers/website/services/digital-marketing/social-media-marketing-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Social Media Marketing Services | Zevitech Digital Growth Experts",
  description:
    "Grow your brand presence and engagement with Zevitech’s social media marketing services. We craft result-driven strategies for Facebook, Instagram, LinkedIn, and more to boost visibility, followers, and conversions.",
});

function SocialMediaMarketing() {
  return <SocialMediaMarketingPage />;
}

export default SocialMediaMarketing;
