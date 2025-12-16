import React from "react";
import { Metadata } from "next";

import GoogleAdsPage from "@/containers/landing-page/google-ads-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Google Ads Management Services | Zevitech PPC Advertising Experts",
  description:
    "Boost conversions and maximize ROI with Zevitech’s professional Google Ads management services. We create, optimize, and scale high-performing PPC campaigns tailored to your business goals.",
});

function GoogleAds() {
  return <GoogleAdsPage />;
}

export default GoogleAds;
