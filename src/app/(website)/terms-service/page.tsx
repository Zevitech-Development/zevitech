import React from "react";
import { Metadata } from "next";

import TermsServicesPage from "@/containers/website/terms-services-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Terms of Service | Zevitech",
  description:
    "Read Zevitech’s terms and conditions for design and branding services. Understand your rights, responsibilities, and the legal framework.",
});

function TermsServices() {
  return <TermsServicesPage />;
}

export default TermsServices;
