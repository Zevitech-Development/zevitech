import React from "react";

import ServicesHeroSections01 from "@/components/common/services-hero-sections";

import PricingSection from "@/elements/website/pricing/pricing-section";

const PricingPage = () => {
  return (
    <main className=" page-layout-standard">
      <ServicesHeroSections01
        title="Flexible options to fit every stage of growth."
        desc="Our pricing scales with you — from early beginnings to lasting success. Get the flexibility you need today, with confidence for tomorrow."
      />
      <PricingSection />
    </main>
  );
};

export default PricingPage;
