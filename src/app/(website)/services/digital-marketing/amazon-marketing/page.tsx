import React from "react";
import { Metadata } from "next";

import AmazonMarketingPage from "@/containers/website/services/digital-marketing/amazon-marketing-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Amazon Marketing & eCommerce Ads Experts | Zevitech",
  description:
    "Boost Amazon sales with Zevitech’s Amazon marketing services, including PPC management, product optimization, A+ content, and data-driven strategies.",
});

function AmazonMarketing() {
  return <AmazonMarketingPage />;
}

export default AmazonMarketing;
