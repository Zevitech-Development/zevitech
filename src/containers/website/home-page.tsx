import React from "react";

import { HeroSection } from "@/elements/website/home/hero-section";
import MarqueSection from "@/components/common/marque-section";
import HomeServicesSection from "@/elements/website/home/home-services-section";
import TechStackExpertise from "@/elements/website/home/tech-stack-experties";
import StickyScrollSection from "@/elements/website/home/sticky-scroll-section";
import BrandSection from "@/components/common/brand-section";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import LandingReviewsSection from "@/components/common/reviews-section";
import { HomeAmazonSection } from "@/elements/website/home/home-amazon-section";

import {
  AwardsData,
  BrandData,
  HomeFaqData,
} from "@/content/homepage/home-page-content";

function HomePage() {
  return (
    <main>
      <HeroSection />

      <MarqueSection />

      <HomeServicesSection />

      <BrandSection
        heading="Chosen by 500+ Brands Worldwide"
        ratingText="4.9 Rating"
        logos={BrandData}
      />

      <BrandSection
        heading="Awards & Recognition"
        ratingText="4.9 Rating"
        logos={AwardsData}
      />

      <ContactSection />

      <TechStackExpertise />

      <StickyScrollSection />

      <HomeAmazonSection />

      <LandingReviewsSection />

      <FaqSection faqItems={HomeFaqData} defaultOpenIndex={0} />
    </main>
  );
}

export default HomePage;
