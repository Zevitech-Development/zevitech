import React from "react";
import { Metadata } from "next";

import GoogleAdsPage from "@/containers/website/services/digital-marketing/google-ads-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Google Ads Management Services | Zevitech Certified Advertising Experts",
  description:
    "Boost your visibility and conversions with Zevitech’s expert Google Ads management services. We create and optimize high-performing search, display, and video ad campaigns to help you reach the right audience and maximize ROI.",
});

function PayPerClick() {
  return <GoogleAdsPage />;
}

export default PayPerClick;
