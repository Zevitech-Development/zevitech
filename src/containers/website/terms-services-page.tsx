import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import TermsServicesSection from "@/elements/website/terms/terms-condition-section";
import React from "react";

function TermsServicesPage() {
  return (
    <main className=" page-layout-standard">
      <ServicesHeroSections01
        title="Our Commitments, Your Confidence"
        desc="At ZeviTech, we aim to make things simple and transparent. These Terms & Conditions outline your rights and our responsibilities."
      />
      <TermsServicesSection />
    </main>
  );
}

export default TermsServicesPage;
