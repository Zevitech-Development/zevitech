import React from "react";
import { Metadata } from "next";

import WebsiteDevelopmentPage from "@/containers/landing/website-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Need a Website That Converts Visitors into Customers? | Zevitech Web Development",
  description:
    "Looking for a high-performance website tailored to your business goals? Zevitech builds responsive, fast, and conversion-optimized websites using modern technologies. Let’s bring your vision to life.",
});

function WebsiteDevelopment() {
  return <WebsiteDevelopmentPage />;
}

export default WebsiteDevelopment;
