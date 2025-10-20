import React from "react";

import ShopifyLandingHeroSection from "@/elements/business/shopify/shopify-landing-hero-section";
import TrustbarSection from "@/elements/business/shopify/trustbar-section";
import LandingCTA02Section from "@/elements/business/shopify/landing-cta-02-section";
import WhyChooseUsSection from "@/elements/business/shopify/shopify-why-choose-us";
import ResultSection from "@/elements/business/shopify/shopify-results-section";
import InformationSection from "@/elements/business/shopify/shopify-information-section";
import LandingCTASection from "@/elements/business/shopify/shopify-cta";
import LandingReviewsSection from "@/elements/business/shopify/landing-reviews-section";
import FaqSection from "@/components/common/faq-section";
import { FaqDataShopifyWebsite } from "@/content/landing/shopify-landing-page-content";
import CustomerSatisfactionSection from "@/elements/business/shopify/customer-satisfaction";
import ProcessSection from "@/elements/business/shopify/shopify-process-section";
import OurAchievementSection from "@/elements/business/shopify/shopify-our-achivements-section";
import { FeatureComparisonTable } from "@/elements/website/pricing/feature-comparison-table";

import {
  shopifyFeatures,
  shopifyPackages,
} from "@/content/services/services-pricing";

function ShopifyDevelopmentPage() {
  return (
    <main>
      <ShopifyLandingHeroSection />
      <TrustbarSection />
      <OurAchievementSection />
      <ProcessSection />

      <section className="section-padding-standard bg-slate-50 py-14 lg:py-20">
        <div className="layout-standard">
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-heading max-w-3xl font-bold font-heading tracking-wider">
              Get Your <span className="text-tertiary">Shopify</span> Stores
              Designed Now!
            </h2>
            <p className="mt-4 text-lg text-paragraph max-w-2xl mx-auto">
              We offer budget-friendly Shopify store design services, ensuring a
              professional and engaging online platform for your business.
            </p>
          </div>

          <FeatureComparisonTable
            packages={shopifyPackages}
            featuresData={shopifyFeatures}
          />
        </div>
      </section>
      <LandingCTA02Section />
      <WhyChooseUsSection />
      <ResultSection />
      <InformationSection />
      <div className="relative">
        <LandingCTASection />
      </div>
      <LandingReviewsSection />
      <FaqSection faqItems={FaqDataShopifyWebsite} defaultOpenIndex={0} />
      <CustomerSatisfactionSection />
    </main>
  );
}

export default ShopifyDevelopmentPage;
