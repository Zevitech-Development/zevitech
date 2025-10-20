import React from "react";
import { Metadata } from "next";

import TermsServicesPage from "@/containers/website/terms-services-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Terms of Service | Zevitech",
  description:
    "Read the terms and conditions for using Zevitech’s design and branding services. Understand your rights, responsibilities, and the legal framework that governs our platform.",
});

function TermsServices() {
  return <TermsServicesPage />;
}

export default TermsServices;