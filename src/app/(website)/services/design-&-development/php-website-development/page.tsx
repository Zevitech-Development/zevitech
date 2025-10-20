import React from "react";
import { Metadata } from "next";

import PhpWebsiteDevelopmentPage from "@/containers/website/services/design-&-development/php-website-development-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "PHP Website Development Services | Zevitech Custom Web Solutions",
  description:
    "Leverage the power of PHP with Zevitech’s custom PHP website development services. We build fast, secure, and scalable websites with tailored features, API integrations, and optimized performance for your business.",
});

function PhpWebsiteDevelopment() {
  return <PhpWebsiteDevelopmentPage />;
}

export default PhpWebsiteDevelopment;
