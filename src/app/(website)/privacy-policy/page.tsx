import React from "react";
import { Metadata } from "next";

import PrivacyPolicyPage from "@/containers/website/privacy-policy-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Privacy Policy | Zevitech",
  description:
    "Learn how Zevitech collects, uses, and protects your personal information. Review our privacy practices and understand your data rights.",
});

function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}

export default PrivacyPolicy;
