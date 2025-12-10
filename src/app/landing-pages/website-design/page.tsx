import React from "react";
import { Metadata } from "next";

import WebsiteDesignPage from "@/containers/landing-page/website-design-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Professional Website Design Services | Zevitech Creative Web Solutions",
  description:
    "Looking for a stunning, user-friendly website? Zevitech provides custom website design, responsive layouts, UX/UI optimization, and branding solutions to elevate your online presence.",
});

function WebsiteDesign() {
  return <WebsiteDesignPage />;
}

export default WebsiteDesign;
