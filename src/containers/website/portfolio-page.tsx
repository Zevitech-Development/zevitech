import React from "react";

import PortfolioShowcase from "@/elements/website/portfolio/portfolio-showcase";
import FaqSection from "@/components/common/faq-section";
import { PortfolioFaqData } from "@/content/portfolio/portfolio-page-content";
import { DynamicHero } from "@/components/common/dynamic-hero";
import { FolderOpen } from "lucide-react";

import PortfolioHeroImg from ".././../../public/images/hero-images/portfolio-hero-img.jpg";

function PortfolioPage() {
  return (
    <section>
      <DynamicHero
        badgeIcon={<FolderOpen />}
        badgeText="Our Work"
        heading="Showcasing our passion"
        highlightText="through creativity and results"
        subheading="Explore our success stories"
        description="Discover how Zevitech transforms ideas into impactful digital experiences. Our portfolio highlights innovative solutions, powerful designs, and measurable results that help brands grow and stand out."
        heroImage={PortfolioHeroImg}
      />

      <PortfolioShowcase />
      <FaqSection faqItems={PortfolioFaqData} defaultOpenIndex={0} />
    </section>
  );
}

export default PortfolioPage;
