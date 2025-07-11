import React from "react";

import LandingHeroSection from "@/sections/landing/landing-hero-section";
import TrustbarSection from "@/sections/landing/trustbar-section";
import OurAchievementSection from "@/sections/landing/our-achievement-section";
import ProcessSection from "@/sections/landing/process-section";
import PricingSection from "@/sections/landing/pricing-section";
import LandingCTASection from "@/sections/landing/landing-cta-section";
import WhyChooseUsSection from "@/sections/landing/why-choose-us-section";
import ResultSection from "@/sections/landing/result-section";
import InformationSection from "@/sections/landing/information-section";
import LandingCTA02Section from "@/sections/landing/landing-cta-02-section";
import LandingReviewsSection from "@/sections/landing/landing-reviews-section";
import CustomerSatisfactionSection from "@/sections/landing/customer-satisfaction-section";
import FaqSection from "@/components/common/faq-section";

function LandingPage() {
  return (
    <main>
      <LandingHeroSection />
      <TrustbarSection />
      <OurAchievementSection />
      <ProcessSection />
      <PricingSection />
      <LandingCTA02Section />
      <WhyChooseUsSection />
      <ResultSection />
      <InformationSection />
      <div className="relative">
        <LandingCTASection />
      </div>
      <LandingReviewsSection />
      <FaqSection />
      <CustomerSatisfactionSection />
    </main>
  );
}

export default LandingPage;
