import React from "react";

import { WebDesignHero } from "@/elements/business/website-design/web-design-hero";
import MarqueSection from "@/components/common/marque-section";
import WebDesignServices from "@/elements/business/website-design/web-design-services";
import CampaignsSection from "@/components/common/campaigns";
import WebDesignPricing from "@/elements/business/website-design/web-design-packages";
import WebDesignContactSection from "@/elements/business/website-design/web-design-contact-section";
import LandingReviewsSection from "@/components/common/reviews-section";
import TechStackExpertise from "@/elements/website/home/tech-stack-experties";

function WebsiteDesignPage() {
  return (
    <div>
      <WebDesignHero />

      {/* <MarqueSection /> */}

      <WebDesignServices />

      <WebDesignPricing />

      <WebDesignContactSection />

      <TechStackExpertise />

      <LandingReviewsSection />

      <CampaignsSection />
    </div>
  );
}

export default WebsiteDesignPage;
