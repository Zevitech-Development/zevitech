import ShopifyLandingHeroSection from "@/elements/business/shopify/shopify-landing-hero-section";
import InformationSection from "@/elements/business/shopify/shopify-information-section";
import OurAchievementSection from "@/elements/business/shopify/shopify-our-achivements-section";
import ShopifyStoreStudio from "@/elements/business/shopify/shopify-store-studio";
import ProcessSection from "@/elements/business/shopify/shopify-process-section";
import WhyChooseUsSection from "@/elements/business/shopify/shopify-why-choose-us";
import ShopifyLandingFaq from "@/elements/business/shopify/shopify-landing-faq";
import LandingCTASection from "@/elements/business/shopify/shopify-cta";
import ShopifyStudioFilm from "@/elements/business/shopify/shopify-studio-film";
import TrustbarSection from "@/elements/business/shopify/trustbar-section";
import ResultSection from "@/elements/business/shopify/shopify-results-section";
import LandingReviewsSection from "@/elements/business/shopify/landing-reviews-section";
import CustomerSatisfactionSection from "@/elements/business/shopify/customer-satisfaction";
import { studioCopy, studioPlans } from "@/content/landing/shopify-studio-content";

import JsonLd from "@/components/common/json-ld";
import { shopifyServiceSchema } from "@/content/landing/shopify-seo-content";

export default function ShopifyDevelopmentPage() {
  return (
    <main>
      <JsonLd data={shopifyServiceSchema} />
      <ShopifyLandingHeroSection />
      <TrustbarSection />
      {/* The 3-step studio sits directly under the hero so ad visitors reach designs and prices first. */}
      <ShopifyStoreStudio copy={studioCopy} plans={studioPlans} />
      <LandingReviewsSection />
      <ShopifyStudioFilm copy={studioCopy} />
      <ResultSection />
      <OurAchievementSection />
      <InformationSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <ShopifyLandingFaq />
      <LandingCTASection />
      <CustomerSatisfactionSection />
    </main>
  );
}
