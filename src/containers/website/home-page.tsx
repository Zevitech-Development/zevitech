"use client";
import React from "react";

import WhyChooseUsSection from "@/components/common/why-choose-us-section-01";
import WhyChooseUsBrandIdentityImg01 from "../../../public/images/brandings/why-choose-us-brand-identity-01.jpg";
import WhyChooseUsBrandIdentityImg02 from "../../../public/images/brandings/why-choose-us-brand-identity-02.jpg";
import WhyChooseUsBrandIdentityImg03 from "../../../public/images/brandings/why-choose-us-brand-identity-03.jpg";
import HomeCtaImg from "../../../public/images/home-cta-img.webp";

import BrandSection from "@/components/common/brand-section";
import {
  AwardsData,
  BrandData,
  FaqDataHomePage,
} from "@/content/home-page/home-page-content";
// import CTA from "@/components/common/cta";

import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import FaqSection from "@/components/common/faq-section";
import Logomarquee from "@/elements/website/home/marquee";
import StatsSection from "@/sections/website/services/branding/stats-section";
import CampaignsSection from "@/elements/website/home/campaigns";
// import Results from "@/elements/website/home/results-impressed";
import ContactSection from "@/elements/website/home/home-contact-section";
import Services from "@/components/partials/services";
// import GlobalCTA from "@/components/common/global-cta";
import CTA02 from "@/components/common/cta02";
import Cta03 from "@/components/common/cta03";

function HomePage() {
  return (
    <main className=" page-layout-standard">
      <ServicesHeroSections01
        title="Innovative Design & Development for Your Success"
        desc="We build powerful, user-friendly websites and applications that combine cutting-edge technology with sleek design — turning your ideas into reality."
      />

      <StatsSection />

      <Logomarquee />

      <Services />

      <CTA02
        backgroundClass="bg-home-cta"
        heading="GET IN TOUCH TODAY!"
        text="No matter what you need, we have the expertise and design skills to get the job done."
      />

      {/* <Results /> */}
      <WhyChooseUsSection
        img01={WhyChooseUsBrandIdentityImg01}
        img02={WhyChooseUsBrandIdentityImg02}
        img03={WhyChooseUsBrandIdentityImg03}
        title="Why Choose Zevitech for Your Brand Identity?"
        desc01="At Zevitech, we don’t just design logos — we craft brand experiences. Our team builds cohesive, memorable brand identities that reflect your business’s purpose and values."
        desc02="Whether you’re launching a startup or refreshing an existing brand, we deliver professional, consistent designs that make you instantly recognizable and trusted in your market."
      />

      <ContactSection />

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

      <CampaignsSection />

      {/* <GlobalCTA /> */}

      <Cta03
        image={HomeCtaImg}
        heading="Shaping Ideas Into Reality"
        text="Partner with Zevitech to transform your vision into powerful creative solutions that inspire, engage, and deliver impact."
      />

      <FaqSection faqs={FaqDataHomePage} />
    </main>
  );
}

export default HomePage;
