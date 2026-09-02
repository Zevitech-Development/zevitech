import React from "react";
import { Metadata } from "next";

import JoomlaWebsiteDevelopmentPage from "@/containers/website/services/design-&-development/joomla-website-development-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "Joomla Website Development Services | Zevitech CMS Experts",
  description:
    "Build a secure, scalable, and custom Joomla website with Zevitech’s Joomla development services. From theme customization to extension integration and performance optimization, we help your business grow online.",
  path: "/services/design-&-development/joomla-website-development",
});

function JoomlaWebsiteDevelopment() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/design-&-development/joomla-website-development", "Joomla Website Development")} />
      <JoomlaWebsiteDevelopmentPage />
    </>
  );
}

export default JoomlaWebsiteDevelopment;
