import React from "react";
import { Metadata } from "next";

import AboutUsPage from "@/containers/website/about-us-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "About Us | Zevitech – Your Digital Innovation Partner",
  description:
    "Learn about Zevitech's mission, values, and team behind cutting-edge software, app development, branding, and digital solutions. We're passionate about empowering businesses through strategy, technology, and design.",
});


function AboutUs() {
  return <AboutUsPage />;
}

export default AboutUs;
