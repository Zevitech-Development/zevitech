import React from "react";
import { Metadata } from "next";

import IOSDevelopmentPage from "@/containers/website/services/app-development/ios-development-page";

import { GetPageMetadata, buildServiceSchema } from "@/utils/meta-data";
import JsonLd from "@/components/common/json-ld";

export const metadata: Metadata = GetPageMetadata({
  title: "iOS App Development Services | Native Swift & iPhone Apps | Zevitech",
  description:
    "Enterprise-grade iOS and iPhone app development. Native Swift engineering, intuitive UI/UX, and strict App Store compliance from concept to launch.",
  path: "/services/app-development/ios-development",
});

function IOSDevelopment() {
  return (
    <>
      <JsonLd data={buildServiceSchema("/services/app-development/ios-development", "iOS App Development")} />
      <IOSDevelopmentPage />
    </>
  );
}

export default IOSDevelopment;
