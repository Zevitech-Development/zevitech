import React from "react";

import { WebDesignHero } from "@/elements/business/website-design/web-design-hero";
import MarqueSection from "@/components/common/marque-section";
import WebDesignServices from "@/elements/business/website-design/web-design-services";
import CampaignsSection from "@/components/common/campaigns";
import WebDesignPricing from "@/elements/business/website-design/web-design-packages";
import WebDesignContactSection from "@/elements/business/website-design/web-design-contact-section";
import LandingReviewsSection from "@/components/common/reviews-section";
import TechStackExpertise from "@/elements/website/home/tech-stack-experties";
import HomeServicesSection from "@/elements/website/home/home-services-section";

function WebsiteDesignPage() {
  const webDesignServices = [
    {
      title: "UI / UX",
      description:
        "Discover UI/UX solutions with best practices and leading expertise to elevate your digital presence and user experience.",
      ctaText: "Enquire Now",
    },
    {
      title: "Responsive Design",
      description:
        "Responsive Design expert delivering great user experiences, best-in-class functionality, and optimal performance.",
      ctaText: "Enquire Now",
    },
    {
      title: "Mobile-First Web Design",
      description:
        "Mobile-first web design that is fast, responsive, and user-friendly for modern audiences.",
      ctaText: "Enquire Now",
    },
    {
      title: "E-commerce Web Design",
      description:
        "Responsive, user-friendly online stores with secure, fast-loading pages and seamless checkout to boost sales.",
      ctaText: "Enquire Now",
    },
    {
      title: "Landing Page Design",
      description:
        "High-converting, responsive landing pages tailored to your marketing goals to capture leads and boost conversions.",
      ctaText: "Enquire Now",
    },
    {
      title: "Portfolio & Personal Website Design",
      description:
        "Stunning, responsive personal sites and portfolios to showcase your work, enhance your online presence, and attract clients.",
      ctaText: "Enquire Now",
    },
    {
      title: "Website Redesign & Optimization",
      description:
        "Revamp your existing website with modern UI, improved UX, faster load times, and SEO-friendly performance that drives measurable results.",
      ctaText: "Enquire Now",
    },
    {
      title: "Custom Web Applications",
      description:
        "Build tailored web applications integrated with your workflows—secure, scalable, and aligned to your business goals.",
      ctaText: "Enquire Now",
    },
  ];
  return (
    <div>
      <WebDesignHero />

      {/* <MarqueSection /> */}

      {/* <WebDesignServices /> */}

      <HomeServicesSection showButtons={false} services={webDesignServices} />

      <WebDesignPricing />

      <WebDesignContactSection />

      <TechStackExpertise />

      <LandingReviewsSection />

      <CampaignsSection />
    </div>
  );
}

export default WebsiteDesignPage;
