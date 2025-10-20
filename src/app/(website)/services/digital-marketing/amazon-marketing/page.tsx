import React from "react";
import { Metadata } from "next";

import AmazonMarketingPage from "@/containers/website/services/digital-marketing/amazon-marketing-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Amazon Marketing Services | Zevitech eCommerce Advertising Experts",
  description:
    "Boost your Amazon sales with Zevitech’s Amazon marketing services. We offer expert PPC management, product optimization, A+ content, and data-driven strategies to improve rankings, visibility, and conversions.",
});

function AmazonMarketing() {
  return <AmazonMarketingPage />;
}

export default AmazonMarketing;
