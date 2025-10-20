import React from "react";

import WhyChooseUsSection01 from "@/components/common/why-choose-us-section-01";
import CampaignsSection from "@/components/common/campaigns";
import ContactSection from "@/components/common/contact-section";
import FaqSection from "@/components/common/faq-section";
import Cta from "@/components/common/cta";
import { ServicesPorfolioSection01 } from "@/components/common/services-porfolio-sections";
import { DynamicHero } from "@/components/common/dynamic-hero";

import WhyChooseUsMascotImg01 from "../../../../../../public/images/services/branding/why-choose-us-mascot-01.png";
import WhyChooseUsMascotImg02 from "../../../../../../public/images/services/branding/why-choose-us-mascot-02.jpg";
import WhyChooseUsMascotImg03 from "../../../../../../public/images/services/branding/why-choose-us-mascot-03.jpg";
import WhyChooseUsMascotImg04 from "../../../../../../public/images/services/branding/why-choose-us-mascot-04.jpg";
import WhyChooseUsMascotImg05 from "../../../../../../public/images/services/branding/why-choose-us-mascot-05.jpg";
import WhyChooseUsMascotImg06 from "../../../../../../public/images/services/branding/why-choose-us-mascot-06.jpg";

import CtaImg from "../../../../../../public/images/cta-image.webp";
import MascotHeroImg from "../../../../../../public/images/hero-images/mascot-hero-img.jpg";

import { PortfolioMascotLogoDesignContent } from "@/content/services/branding-content";
import { FaqDataMascotLogoDesign } from "@/content/services/logo-design-services/logo-design-services-content";

import { Smile } from "lucide-react";

const MascotDesignServicePage = () => {
  return (
    <main className="">
      <DynamicHero
        badgeIcon={<Smile />}
        badgeText="Character Branding"
        heading="Give your brand"
        highlightText="a face and personality"
        subheading="Memorable characters, powerful stories"
        description="At Zevitech, we design mascots that embody your brand’s spirit and connect with your audience. Our creative team brings characters to life with unique expressions, detail, and emotion that make your brand unforgettable."
        heroImage={MascotHeroImg}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsMascotImg01}
        img02={WhyChooseUsMascotImg02}
        img03={WhyChooseUsMascotImg03}
        badgeCotent="Why Choose Us"
        title="Why Choose Zevitech for Mascot Logo Design?"
        desc01="Our mascot logos are designed to give your brand a unique character and emotional connection with your audience."
        desc02="We blend creativity and storytelling to craft mascots that make your brand memorable and stand out in competitive markets."
      />

      <CampaignsSection />

      <ServicesPorfolioSection01
        title="Mascot Logos That Bring Your Brand to Life"
        description="Dive into our collection of custom mascot logos designed to add personality, energy, and memorability to your brand. Perfect for sports teams, gaming, and character-driven businesses."
        portfolioImages={PortfolioMascotLogoDesignContent}
      />

      <WhyChooseUsSection01
        img01={WhyChooseUsMascotImg04}
        img02={WhyChooseUsMascotImg05}
        img03={WhyChooseUsMascotImg06}
        badgeCotent="About Mascot Logo Design"
        sectionOrder="order-2"
        title="Mascot Logos That Build Personality & Connection"
        desc01="Zevitech creates custom mascot logos that give your brand a face and a voice, perfect for playful or community-driven businesses."
        desc02="From bold illustrations to lovable characters, we make mascots that audiences connect with instantly."
      />

      <ContactSection />

      <Cta
        image={CtaImg}
        heading="Build a Strong Identity with a Mascot Logo"
        text="At Zevitech, we create unique mascot logos that give your brand a personality and story. From playful to professional, our mascots help your business connect with audiences on a deeper level."
      />

      <FaqSection faqItems={FaqDataMascotLogoDesign} defaultOpenIndex={0} />
    </main>
  );
};

export default MascotDesignServicePage;
