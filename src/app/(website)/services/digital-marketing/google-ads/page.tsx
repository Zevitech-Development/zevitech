import React from "react";
import { Metadata } from "next";

import GoogleAdsPage from "@/containers/website/services/digital-marketing/google-ads-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Google Ads Management for Leads & Online Sales | Zevitech",
  description:
    "Grow qualified leads, ecommerce purchases, and online sales with Google Ads strategy, campaign management, conversion tracking, and ongoing optimization from Zevitech.",
  openGraph: {
    images: [
      {
        url: "/images/landing/google-ads-social-preview.png",
        width: 1729,
        height: 910,
        alt: "Google Ads growth system by Zevitech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/landing/google-ads-social-preview.png"],
  },
});

function PayPerClick() {
  return <GoogleAdsPage />;
}

export default PayPerClick;
