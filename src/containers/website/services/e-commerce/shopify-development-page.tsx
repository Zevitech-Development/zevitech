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

export default function ShopifyDevelopmentPage() {
  return (
    <main>
      <ShopifyLandingHeroSection />
      <TrustbarSection />
      <ShopifyStudioFilm copy={studioCopy} />
      <OurAchievementSection />
      <ResultSection />
      <LandingReviewsSection />
      <ShopifyStoreStudio copy={studioCopy} plans={studioPlans} />
      <InformationSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <ShopifyLandingFaq />
      <LandingCTASection />
      <CustomerSatisfactionSection />
    </main>
  );
}
