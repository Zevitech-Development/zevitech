import React from "react";
import { Metadata } from "next";

import BusinessFormationIPPage from "@/containers/website/business-formation-ip-page";
import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Business Formation & Intellectual Property Consultancy | Zevitech",
  description:
    "Administrative coordination and documentation support for LLC formation and trademark filings through authorized channels.",
});

function BusinessFormationIP() {
  return <BusinessFormationIPPage />;
}

export default BusinessFormationIP;
