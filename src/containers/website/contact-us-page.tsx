// import ServicesHeroSections01 from "@/components/common/services-hero-sections";
import React from "react";

import ContactUsCardsSection from "@/elements/website/contact/contact-cards-section";
import { GlobalLocationSection } from "@/components/common/global-location-section";
import ContactUsForm from "@/elements/website/contact/contact-us-form";
import { locations } from "@/content/about/about-page-content";
import { DynamicHero } from "@/components/common/dynamic-hero";

import ContactHeroImg from "../../../public/images/hero-images/contact-hero-img.jpg";

import { IoChatbox } from "react-icons/io5";

function ContactUsPage() {
  return (
    <>
      <DynamicHero
        badgeIcon={<IoChatbox />}
        badgeText="Let’s Talk"
        heading="Ready to take your brand"
        highlightText="to the next level?"
        subheading="Let’s build something great together"
        description="Get in touch with Zevitech’s team of experts to discuss your ideas, challenges, or project goals. We’re here to collaborate, innovate, and deliver results that make a lasting impact."
        heroImage={ContactHeroImg}
      />
      <ContactUsCardsSection />

      <ContactUsForm />

      <GlobalLocationSection
        locations={locations}
        title="Our Global Locations"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />
    </>
  );
}

export default ContactUsPage;
