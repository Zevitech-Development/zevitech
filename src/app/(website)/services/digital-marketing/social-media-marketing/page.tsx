import React from "react";
import { Metadata } from "next";

import SocialMediaMarketingPage from "@/containers/website/services/digital-marketing/social-media-marketing-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "Social Media Marketing Agency for B2B | Paid Social Ads | Zevitech",
  description:
    "Scale your brand with full-funnel social media marketing. Data-driven paid ad management, content strategy, and community growth on Meta, TikTok, and LinkedIn.",
  path: "/services/digital-marketing/social-media-marketing",
});

function SocialMediaMarketing() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/digital-marketing/social-media-marketing", "Social Media Marketing")} />
      <SocialMediaMarketingPage />
    </>
  );
}

export default SocialMediaMarketing;
