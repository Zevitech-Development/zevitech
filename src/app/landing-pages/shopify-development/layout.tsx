import LandingHeader from "@/elements/business/shopify/shopify-landing-header";
import ShopifyLandingFooter from "@/elements/business/shopify/shopify-landing-footer";
import ShopifyConversionTracking from "@/elements/business/shopify/shopify-conversion-tracking";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShopifyConversionTracking />
      <LandingHeader />
      {children}
      <ShopifyLandingFooter />
    </>
  );
}
