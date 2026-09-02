import React from "react";
import { Metadata } from "next";

import AmazonMarketingPage from "@/containers/website/services/digital-marketing/amazon-marketing-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "Amazon Marketing Services Agency | Amazon PPC Management | Zevitech",
  description:
    "Scale marketplace revenue with end-to-end Amazon marketing. Specialized in Amazon PPC management, product listing SEO, A+ content, and FBA expansion.",
  path: "/services/digital-marketing/amazon-marketing",
});

function AmazonMarketing() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/digital-marketing/amazon-marketing", "Amazon Marketing")} />
      <AmazonMarketingPage />
    </>
  );
}

export default AmazonMarketing;
