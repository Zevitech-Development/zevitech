import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection02 } from "@/components/common/services-porfolio-sections";
import { DynamicWebsiteDevHero } from "@/components/common/dynamic-website-dev-hero";

import WhyChooseUsCustomWebsiteDesignImg01 from "../../../../../public/images/services/design-and-development/why-choose-us-custom-website-img01.png";
import WhyChooseUsCustomWebsiteDesignImg02 from "../../../../../public/images/services/e-commerce/why-choose-us-custom-ecommerce-img06.png";
import WhyChooseUsCustomWebsiteDesignImg03 from "../../../../../public/images/services/design-and-development/why-choose-us-custom-website-img03.png";
import WhyChooseUsCustomWebsiteDesignImg04 from "../../../../../public/images/services/design-and-development/why-choose-us-wordpress-web-img04.png";
import WhyChooseUsCustomWebsiteDesignImg05 from "../../../../../public/images/services/design-and-development/why-choose-us-custom-website-img02.png";
import WhyChooseUsCustomWebsiteDesignImg06 from "../../../../../public/images/services/e-commerce/why-choose-open-cart-03.jpg";

import CtaImg from "../../../../../public/images/cta-image.webp";
import CustomWebDesignHeroImg from "../../../../../public/images/portfolio/website-img01.png";

import {
  FaqDataCustomWebsiteDesign,
  PortfolioCustomWebsiteDesignContent,
} from "@/content/overall-services-content/all-services-content";

import { Monitor } from "lucide-react";

function CustomWebsiteDesignPage() {
  return (
    <main className="">
      <DynamicWebsiteDevHero
        badgeIcon={<Monitor />}
        badgeText="Web Design Solutions"
        heading="Bring your vision to life with"
        highlightText="custom website design"
        subheading="Unique, user-centric, and performance-driven"
        description="Zevitech creates bespoke website designs tailored to your brand identity and goals. We blend creativity with functionality to deliver digital experiences that captivate audiences and drive meaningful results."
        heroImage={CustomWebDesignHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsCustomWebsiteDesignImg01}
        img02={WhyChooseUsCustomWebsiteDesignImg02}
        img03={WhyChooseUsCustomWebsiteDesignImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Custom Website Design?"
        desc01="At Zevitech, we create fully customized websites tailored to your brand’s vision, delivering unique designs that stand out online."
        desc02="Our team blends creativity with functionality to build websites that are responsive, engaging, and aligned with your business goals."
      />

      <CampaignsSection />

      <ServicesPorfolioSection02
        title="Custom Website Design Crafted for Your Unique Brand"
        description="Explore our portfolio of custom website designs tailored to reflect your brand identity and engage your audience. From sleek corporate sites to creative personal portfolios, we design responsive and user-friendly websites that leave a lasting impression."
        portfolioImages={PortfolioCustomWebsiteDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsCustomWebsiteDesignImg04}
        img02={WhyChooseUsCustomWebsiteDesignImg05}
        img03={WhyChooseUsCustomWebsiteDesignImg06}
        badgeCotent="About Custom Web Design"
        sectionOrder="order-2"
        title="Unique Designs Built Around You"
        desc01="We design websites from scratch with custom layouts, features, and user experiences crafted specifically for your audience."
        desc02="Perfect for brands and businesses looking for a distinctive, scalable, and high-performing online presence."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Stand Out with Custom Website Design"
        text="At Zevitech, we create fully personalized websites designed to reflect your unique brand identity. Our custom website solutions combine creativity, functionality, and scalability to deliver a digital presence that truly sets your business apart."
      />

      <FaqSection faqItems={FaqDataCustomWebsiteDesign} defaultOpenIndex={0} />
    </main>
  );
}

export default CustomWebsiteDesignPage;
