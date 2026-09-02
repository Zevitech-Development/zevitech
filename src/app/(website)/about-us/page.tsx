import React from "react";
import { Metadata } from "next";

import AboutUsPage from "@/containers/website/about-us-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "About Zevitech | Global Digital Solutions & Engineering Agency",
  description:
    "Learn about Zevitech: an international digital solutions agency delivering custom software, mobile applications, cloud solutions, and growth marketing.",
  path: "/about-us",
});

function AboutUs() {
  return <AboutUsPage />;
}

export default AboutUs;
