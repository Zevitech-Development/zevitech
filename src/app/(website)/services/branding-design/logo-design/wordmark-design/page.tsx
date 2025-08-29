import React from "react";
import { Metadata } from "next";

import WordmarkDesignServicePage from "@/containers/website/services/branding-design-services/logo-design/wordmark-design-service-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Wordmark Logo Design Services | Zevitech",
  description:
    "Professional wordmark logo design services to showcase your brand name with clarity, style, and sophistication.",
});

function WordmarkDesign() {
  return <WordmarkDesignServicePage />;
}

export default WordmarkDesign;
