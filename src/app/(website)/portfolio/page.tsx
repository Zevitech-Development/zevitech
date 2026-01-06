import React from "react";
import { Metadata } from "next";

import PortfolioPage from "@/containers/website/portfolio-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Custom Software & App Development Agency | Zevitech",
  description:
    "Explore Zevitech’s portfolio showcasing mobile apps, web platforms, custom software, SaaS, UI/UX design, eCommerce, SEO, automation, and branding projects.",
});

function Portfolio() {
  return (
    <main>
      <PortfolioPage />
    </main>
  );
}

export default Portfolio;
