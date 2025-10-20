import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

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
} from "@/content/overall-services-content/all-services-content";

import { Smartphone } from "lucide-react";

function AndroidDevelopmentPage() {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Smartphone />}
        badgeText="App Development"
        heading="Create powerful mobile experiences with"
        highlightText="custom Android app development"
        subheading="Innovative, scalable, and user-focused"
        description="Zevitech builds Android applications that combine intuitive design with robust functionality. Our expert developers deliver high-performance apps tailored to your business goals and audience needs."
        heroImage={AndroidAppDevHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAndroidDevelopmentImg01}
        img02={WhyChooseUsAndroidDevelopmentImg02}
        img03={WhyChooseUsAndroidDevelopmentImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Android App Development?"
        desc01="At Zevitech, we develop powerful and user-friendly Android applications that run seamlessly across a wide range of devices."
        desc02="Our team focuses on performance, security, and scalability to ensure your app engages users and supports your business growth."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Android App Development for Powerful Mobile Solutions"
        description="Explore our portfolio of Android applications built for performance, scalability, and user engagement. From e-commerce apps to custom business solutions, we design and develop Android apps that help brands reach wider audiences and deliver value on the go."
        portfolioImages={PortfolioAndroidDevelopmentContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsAndroidDevelopmentImg04}
        img02={WhyChooseUsAndroidDevelopmentImg05}
        img03={WhyChooseUsAndroidDevelopmentImg06}
        badgeCotent="About Android Development"
        sectionOrder="order-2"
        title="Custom Apps for Every Business Need"
        desc01="We create Android apps with intuitive designs, advanced features, and smooth functionality tailored to your target audience."
        desc02="Perfect for startups, enterprises, and businesses seeking reliable, scalable, and future-ready mobile app solutions."
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
