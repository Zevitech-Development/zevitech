import React from "react";
import { Metadata } from "next";

import PayPerClickPage from "@/containers/website/services/digital-marketing/pay-per-click-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Pay-Per-Click (PPC) Advertising Services | Zevitech Marketing Experts",
  description:
    "Maximize your ROI with Zevitech’s pay-per-click (PPC) advertising services. We create and manage high-performing ad campaigns across Google, Bing, and social media to drive targeted traffic and real conversions.",
});

function PayPerClick() {
  return <PayPerClickPage />;
}

export default PayPerClick;
