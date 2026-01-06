import React from "react";
import { Metadata } from "next";

import GoogleAdsPage from "@/containers/website/services/digital-marketing/google-ads-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Google Ads Management | Certified Experts | Zevitech",
  description:
    "Drive traffic and conversions with Zevitech’s expert Google Ads services, including search, display, and video ad campaign optimization.",
});

function PayPerClick() {
  return <GoogleAdsPage />;
}

export default PayPerClick;
