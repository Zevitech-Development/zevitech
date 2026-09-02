import React from "react";
import { Metadata } from "next";

import GoogleAdsPage from "@/containers/website/services/digital-marketing/google-ads-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

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
  path: "/services/digital-marketing/google-ads",
});

function PayPerClick() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/digital-marketing/google-ads", "Google Ads Management")} />
      <GoogleAdsPage />
    </>
  );
}

export default PayPerClick;
