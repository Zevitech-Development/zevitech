import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";
import TopicHighlightsSection from "@/components/common/topic-highlights-section";

import WhyChooseUsAndroidDevelopmentImg01 from "../../../../../public/images/services/app-development/why-choose-us-android-img01.jpg";
import WhyChooseUsAndroidDevelopmentImg02 from "../../../../../public/images/services/app-development/why-choose-us-android-img02.jpg";
import WhyChooseUsAndroidDevelopmentImg03 from "../../../../../public/images/services/app-development/why-choose-us-android-img03.jpg";
import WhyChooseUsAndroidDevelopmentImg04 from "../../../../../public/images/services/app-development/why-choose-us-android-img04.jpg";
import WhyChooseUsAndroidDevelopmentImg05 from "../../../../../public/images/services/app-development/why-choose-us-android-img06.jpg";
import WhyChooseUsAndroidDevelopmentImg06 from "../../../../../public/images/services/app-development/why-choose-us-android-img05.jpg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import AndroidAppDevHeroImg from "../../../.././../public/images/hero-images/android-app-hero-img.jpg";

import {
  FaqDataAndroidDevelopment,
  PortfolioAndroidDevelopmentContent,
  AndroidTopicHighlights,
} from "@/content/overall-services-content/all-services-content";

import { Smartphone } from "lucide-react";

function AndroidDevelopmentPage() {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Smartphone />}
        badgeText="App Development"
        heading="Custom Android App"
        highlightText="Development Services"
        subheading="Innovative, scalable, and user-focused"
        description="Zevitech builds Android applications that combine intuitive design with robust functionality. Our expert developers deliver high-performance apps tailored to your business goals and audience needs."
        heroImage={AndroidAppDevHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAndroidDevelopmentImg01}
        img02={WhyChooseUsAndroidDevelopmentImg02}
        img03={WhyChooseUsAndroidDevelopmentImg03}
        badgeCotent="Why Choose Us"
        title="Enterprise Android App Development & Native Architecture"
        desc01="As an Android app development company, Zevitech builds secure, high-performance applications that run seamlessly across phones, tablets, and foldables."
        desc02="Our enterprise Android app development process is built around clean native architecture, hardened security, and scalability that supports long-term business growth."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Hire Dedicated Kotlin & Cross-Platform Android Developers"
        description="Hire Android app developers who ship production-grade work. Our Kotlin app development agency team pairs native Android expertise with cross-platform delivery, from e-commerce apps to custom business solutions that help brands reach wider audiences."
        portfolioImages={PortfolioAndroidDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAndroidDevelopmentImg04}
        img02={WhyChooseUsAndroidDevelopmentImg05}
        img03={WhyChooseUsAndroidDevelopmentImg06}
        badgeCotent="About Android Development"
        sectionOrder="order-2"
        title="Android App Development Company Trusted by Startups & Enterprises"
        desc01="We create Android apps with intuitive designs, advanced features, and smooth functionality tailored to your target audience and device mix."
        desc02="Perfect for startups and enterprises seeking reliable, scalable, and future-ready custom Android app development services."
      />

      <TopicHighlightsSection
        title="End-to-End Google Play Store Launch & Maintenance"
        description="From architecture decisions through Google Play Store submission, listing optimization, and post-launch maintenance, here is what an Android engagement with Zevitech covers."
        topics={AndroidTopicHighlights}
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Expand Your Reach with Android App Development"
        text="At Zevitech, we create innovative and scalable Android applications that run seamlessly across devices. Our Android solutions focus on performance, usability, and custom features to help your business engage a wider audience and achieve growth."
      />

      <FaqSection faqItems={FaqDataAndroidDevelopment} defaultOpenIndex={0} />
    </main>
  );
}

export default AndroidDevelopmentPage;
