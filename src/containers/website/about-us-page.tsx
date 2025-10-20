import React from "react";

import WhyChooseUsAboutUsImg01 from "../../../public/images/about-us/WhyChooseUsAboutUsImg01.jpeg";
import WhyChooseUsAboutUsImg02 from "../../../public/images/about-us/WhyChooseUsAboutUsImg02.jpeg";
import WhyChooseUsAboutUsImg03 from "../../../public/images/about-us/WhyChooseUsAboutUsImg03.jpeg";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import Testimonial from "@/elements/website/about-us/about-us-testimonial-section";
import ContactSection from "@/components/common/contact-section";
import { DynamicHero } from "@/components/common/dynamic-hero";
import { GlobalLocationSection } from "@/components/common/global-location-section";
import BrandSection from "@/components/common/brand-section";
import FaqSection from "@/components/common/faq-section";

import AboutHeroImg from "../../../public/images/hero-images/about-hero-img.jpg";

import { AboutFaqData, locations } from "@/content/about/about-page-content";
import { AwardsData, BrandData } from "@/content/homepage/home-page-content";

import { UsersRound } from "lucide-react";

function AboutUsPage() {
  return (
    <>
      <DynamicHero
        badgeIcon={<UsersRound />}
        badgeText="Get To Know Us"
        heading="Get to know us, we’re"
        highlightText="more than just a team"
        subheading="Driven by creativity and innovation"
        description="At Zevitech, we’re a passionate team blending technology and creativity to craft digital solutions that help businesses grow, connect, and stand out online."
        heroImage={AboutHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAboutUsImg01}
        img02={WhyChooseUsAboutUsImg02}
        img03={WhyChooseUsAboutUsImg03}
        badgeCotent="About Zevitech"
        title="What Drives Us at Zevitech"
        desc01="At Zevitech, we’re more than just a tech company — we're a team of passionate creators and problem-solvers committed to making digital experiences seamless and meaningful."
        desc02="Our journey is driven by innovation, transparency, and a deep respect for our clients. We believe in building solutions that not only meet expectations, but redefine them."
      />

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

      <Testimonial />

      <ContactSection />

      <GlobalLocationSection
        locations={locations}
        title="Our Global Locations"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />

      <FaqSection faqItems={AboutFaqData} defaultOpenIndex={0} />
    </>
  );
}

export default AboutUsPage;
