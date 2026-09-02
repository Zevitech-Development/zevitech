import React from "react";
import { Metadata } from "next";

import MascotDesignServicePage from "@/containers/website/services/branding-design-services/logo-design-services/mascot-design-service-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Mascot Logo Design Services | Zevitech",
  description:
    "Custom mascot logo design services from a vector mascot design studio. Brand character and esports mascot logos delivered with full commercial licensing and source files.",
  path: "/landing-pages/logo-design/mascot-design",
});

function MascotDesign() {
  return <MascotDesignServicePage />;
}

export default MascotDesign;
