import React from "react";
import { Metadata } from "next";

import AnimatedDesignServicePage from "@/containers/website/services/branding-design-services/logo-design/animated-design-service-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Animated Logo Design Services | Zevitech",
  description:
    "Dynamic animated logo designs to make your brand more engaging and memorable across videos, websites, and social media.",
});

function AnimatedDesign() {
  return <AnimatedDesignServicePage />;
}

export default AnimatedDesign;
