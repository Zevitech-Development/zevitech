import React from "react";
import { Metadata } from "next";

import AboutUsPage from "@/containers/website/about-us-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "About Us | Zevitech – Your Digital Innovation Partner",
  description:
    "Discover Zevitech’s mission, values, and team behind innovative software, app development, branding, and digital solutions for growing businesses.",
});

function AboutUs() {
  return <AboutUsPage />;
}

export default AboutUs;
