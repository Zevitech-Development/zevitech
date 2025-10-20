import React from "react";
import { Metadata } from "next";

import JoomlaWebsiteDevelopmentPage from "@/containers/website/services/design-&-development/joomla-website-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Joomla Website Development Services | Zevitech CMS Experts",
  description:
    "Build a secure, scalable, and custom Joomla website with Zevitech’s Joomla development services. From theme customization to extension integration and performance optimization, we help your business grow online.",
});

function JoomlaWebsiteDevelopment() {
  return <JoomlaWebsiteDevelopmentPage />;
}

export default JoomlaWebsiteDevelopment;
