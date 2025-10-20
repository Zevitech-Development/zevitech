import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import ScrollingApproachesSection from "@/components/common/scrolling-approach-section";
import DynamicServicesSection from "@/components/common/services-section";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsWebMaintenanceImg01 from "../../../../../public/images/services/app-development/why-choose-us-web-maintenance-img01.jpg";
import WhyChooseUsWebMaintenanceImg02 from "../../../../../public/images/services/app-development/why-choose-us-web-maintenance-img02.jpg";
import WhyChooseUsWebMaintenanceImg03 from "../../../../../public/images/services/app-development/why-choose-us-web-maintenance-img03.jpg";
import WhyChooseUsWebMaintenanceImg04 from "../../../../../public/images/services/app-development/why-choose-us-web-maintenance-img04.jpg";
import WhyChooseUsWebMaintenanceImg05 from "../../../../../public/images/services/app-development/why-choose-us-web-maintenance-img05.jpg";
import WhyChooseUsWebMaintenanceImg06 from "../../../../../public/images/services/app-development/why-choose-us-web-maintenance-img06.jpg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import WebMaintenanceHeroImg from "../../../.././../public/images/hero-images/web-maintainance-hero-img.jpg";

import {
  FaqDataWebMaintenance,
  webMaintenanceApproachesData,
  webMaintenanceServicesData,
} from "@/content/overall-services-content/all-services-content";

import { Wrench } from "lucide-react";

function WebMaintenancePage() {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Wrench />}
        badgeText="Website Care"
        heading="Keep your website running"
        highlightText="smooth, secure, and up-to-date"
        subheading="Reliable maintenance for lasting performance"
        description="Zevitech provides ongoing web maintenance services to ensure your site stays fast, secure, and fully functional. From updates to performance checks, we handle everything so your business runs without interruptions."
        heroImage={WebMaintenanceHeroImg}
      />
      <WhyChooseUsSection01
        img01={WhyChooseUsWebMaintenanceImg01}
        img02={WhyChooseUsWebMaintenanceImg02}
        img03={WhyChooseUsWebMaintenanceImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Web Maintenance?"
        desc01="At Zevitech, we keep your website running smoothly with proactive monitoring, updates, and performance optimization."
        desc02="Our maintenance services ensure your site stays secure, fast, and fully functional — giving you peace of mind while you focus on your business."
      />

      <DynamicServicesSection
        title="Web Maintenance"
        highlightedText="Services"
        description="Our web maintenance services ensure your website stays secure, up-to-date, and performing at its best. From regular updates and security monitoring to bug fixes and performance optimization, we handle everything to keep your site running smoothly and reliably — so you can focus on growing your business."
        servicesData={webMaintenanceServicesData}
      />

      <CampaignsSection />

      <ScrollingApproachesSection
        mainTitle="Website Maintenance"
        highlightedWord="Approaches We Use"
        subtitle="We follow a strategic and proactive web maintenance process to ensure your website remains secure, optimized, and performing at its peak — every day."
        leftCardTitle="Our Proven Website Maintenance Methodology"
        leftCardDescription="Our web maintenance methodology focuses on consistent performance, reliability, and security. From regular backups and security monitoring to code optimization and plugin updates, we make sure your website stays fully functional, user-friendly, and future-ready."
        approaches={webMaintenanceApproachesData}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsWebMaintenanceImg04}
        img02={WhyChooseUsWebMaintenanceImg05}
        img03={WhyChooseUsWebMaintenanceImg06}
        badgeCotent="About Web Maintenance"
        sectionOrder="order-2"
        title="Keeping Your Website Secure and Up-to-Date"
        desc01="We handle everything from plugin updates to security patches and content adjustments, ensuring your website stays in top condition."
        desc02="Ideal for businesses seeking reliable, long-term support to maintain website performance and prevent downtime."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Keep Your Website Running Smoothly with Web Maintenance"
        text="At Zevitech, we provide reliable web maintenance services to ensure your site stays fast, secure, and up-to-date. From regular updates and backups to performance monitoring and issue fixes, we keep your website performing at its best—so you can focus on growing your business."
      />

      <FaqSection faqItems={FaqDataWebMaintenance} defaultOpenIndex={0} />
    </main>
  );
}

export default WebMaintenancePage;
