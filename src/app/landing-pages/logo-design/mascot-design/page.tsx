import React from "react";
import { Metadata } from "next";

import MascotDesignServicePage from "@/containers/website/services/branding-design-services/logo-design-services/mascot-design-service-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Mascot Logo Design Services | Zevitech",
  description:
    "Custom mascot logo designs that give your brand a personality and help you connect with your audience in a unique way.",
});

function MascotDesign() {
  return <MascotDesignServicePage />;
}

export default MascotDesign;
