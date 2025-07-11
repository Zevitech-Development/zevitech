import React from "react";
import { Metadata } from "next";

import ThankyouPage from "@/containers/business/thankyou-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Thank You | Form Submission Successful - Zevitech",
  description:
    "Your payment was successful. Thank you for choosing Zevitech for your digital solutions — from mobile apps to SaaS, Shopify, UI/UX, and web platforms. We'll be in touch shortly.",
});

function Thankyou() {
  return <ThankyouPage />;
}

export default Thankyou;
