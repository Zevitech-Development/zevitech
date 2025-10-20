import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsIOSDevelopmentImg01 from "../../../../../public/images/services/app-development/why-choose-us-ios-app-img01.jpg";
import WhyChooseUsIOSDevelopmentImg02 from "../../../../../public/images/services/app-development/why-choose-us-ios-app-img02.jpg";
import WhyChooseUsIOSDevelopmentImg03 from "../../../../../public/images/services/app-development/why-choose-us-ios-app-img03.jpg";
import WhyChooseUsIOSDevelopmentImg04 from "../../../../../public/images/services/app-development/why-choose-us-ios-app-img04.jpg";
import WhyChooseUsIOSDevelopmentImg05 from "../../../../../public/images/services/app-development/why-choose-us-ios-app-img05.jpg";
import WhyChooseUsIOSDevelopmentImg06 from "../../../../../public/images/services/app-development/why-choose-us-ios-app-img06.jpg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import IosDevelopmentHeroImg from "../../../.././../public/images/hero-images/Ios-app-hero-img.png";

import {
  FaqDataIOSDevelopment,
  PortfolioIOSDevelopmentContent,
} from "@/content/overall-services-content/all-services-content";

import { Smartphone } from "lucide-react";

function IOSDevelopmentPage() {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Smartphone />}
        badgeText="App Development"
        heading="Build seamless experiences with"
        highlightText="custom iOS app development"
        subheading="Intuitive, secure, and high-performing"
        description="Zevitech develops iOS applications that blend sleek design with powerful functionality. Our expert team delivers user-focused, high-quality apps that enhance engagement and drive business growth across Apple devices."
        heroImage={IosDevelopmentHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsIOSDevelopmentImg01}
        img02={WhyChooseUsIOSDevelopmentImg02}
        img03={WhyChooseUsIOSDevelopmentImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for iOS App Development?"
        desc01="At Zevitech, we build innovative and high-performing iOS apps that deliver seamless user experiences on iPhone, iPad, and other Apple devices."
        desc02="Our expert team ensures your app is secure, scalable, and tailored to your business goals while following Apple’s best practices."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="iOS App Development for Engaging Mobile Experiences"
        description="Browse our portfolio of iOS applications designed to deliver seamless performance, intuitive interfaces, and engaging user experiences. From business apps to custom solutions, we create iOS applications tailored to meet your goals and connect with your audience."
        portfolioImages={PortfolioIOSDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsIOSDevelopmentImg04}
        img02={WhyChooseUsIOSDevelopmentImg05}
        img03={WhyChooseUsIOSDevelopmentImg06}
        badgeCotent="About iOS Development"
        sectionOrder="order-2"
        title="Custom Mobile Solutions That Stand Out"
        desc01="We create iOS applications with intuitive design, advanced features, and flawless performance to engage and retain your users."
        desc02="Perfect for startups and enterprises wanting to deliver a premium mobile experience to their audience.."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Create Seamless Experiences with iOS App Development"
        text="At Zevitech, we build high-performance iOS applications designed for speed, security, and exceptional user experiences. From startups to enterprises, our iOS solutions help your business connect with Apple users and grow in the digital marketplace."
      />

      <FaqSection faqItems={FaqDataIOSDevelopment} defaultOpenIndex={0} />
    </main>
  );
}

export default IOSDevelopmentPage;
