import React from "react";

import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";

import WhyChooseUsAboutUsImg01 from "../../../public/images/about-us/WhyChooseUsAboutUsImg01.jpeg";
import WhyChooseUsAboutUsImg02 from "../../../public/images/about-us/WhyChooseUsAboutUsImg02.jpeg";
import WhyChooseUsAboutUsImg03 from "../../../public/images/about-us/WhyChooseUsAboutUsImg03.jpeg";
import AboutCtaImg from "../../../public/images/about-us/about-cta-img.png";

import Testimonial from "@/elements/website/about/about-us-testimonial-section";
import ContactSection from "@/elements/website/home/home-contact-section";

import { locations } from "@/content/about/about-page-content";
import { FaqDataAboutUs } from "@/content/about/about-page-content";

import { GlobalLocationSection } from "@/components/common/global-location-section";
import BrandSection from "@/components/common/brand-section";
import { AwardsData, BrandData } from "@/content/home-page/home-page-content";
import FaqSection from "@/components/common/faq-section";
import CTA02 from "@/components/common/cta02";
import Cta03 from "@/components/common/cta03";

function AboutUsPage() {
  return (
    <>
      <ServicesHeroSections01
        title="Get to know us, we’re more than just a team"
        desc="We’re a team of developers, designers, and strategists committed to delivering exceptional digital experiences that make a lasting impact.
"
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAboutUsImg01}
        img02={WhyChooseUsAboutUsImg02}
        img03={WhyChooseUsAboutUsImg03}
        title="What Drives Us at Zevitech"
        desc01="At Zevitech, we’re more than just a tech company — we're a team of passionate creators and problem-solvers committed to making digital experiences seamless and meaningful."
        desc02="Our journey is driven by innovation, transparency, and a deep respect for our clients. We believe in building solutions that not only meet expectations, but redefine them."
      />

      <BrandSection
        heading="Chosen by 500+ Brands Worldwide"
        ratingText="4.9 Rating"
        logos={BrandData}
      />

      {/* <CTA
        backgroundImageClass="lg:bg-CTA"
        heading="Great Products Start With"
        highlightedText="Bold Decisions"
        paragraph="At ZeviTech, we transform your digital vision into scalable, high-performance solutions - on time, on brand, and beyond expectations."
      /> */}

      <BrandSection
        heading="Awards & Recognition"
        ratingText="4.9 Rating"
        logos={AwardsData}
      />

      <CTA02
        backgroundClass="bg-about-cta"
        heading="Let’s Build Something Meaningful Together!"
        text="At Zevitech, we’re more than a service provider — we’re your creative partner. Reach out today and let’s turn your vision into a reality that makes an impact."
      />

      <Testimonial />

      <GlobalLocationSection
        locations={locations}
        title="Our Global Locations"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />

      <ContactSection />

      <Cta03
        image={AboutCtaImg}
        heading="Let’s Write the Next Chapter Together"
        text="At Zevitech, we believe every great partnership starts with a conversation. Let’s bring your vision to life together."
      />

      <FaqSection faqs={FaqDataAboutUs} />
    </>
  );
}

export default AboutUsPage;
