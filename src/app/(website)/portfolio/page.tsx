import React from "react";
import { Metadata } from "next";

import PortfolioPage from "@/containers/website/portfolio-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Zevitech Portfolio | Web, Mobile Apps & SaaS Case Studies",
  description:
    "Explore real-world software engineering, native mobile apps, custom web platforms, and UI/UX design case studies delivered by Zevitech.",
  path: "/portfolio",
});

function Portfolio() {
  return (
    <main>
      <PortfolioPage />
    </main>
  );
}

export default Portfolio;
