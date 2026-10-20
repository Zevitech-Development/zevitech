import LandingHeader from "@/elements/business/shopify/shopify-landing-header";
import ShopifyLandingFooter from "@/elements/business/shopify/shopify-landing-footer";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingHeader />
      {children}
      <ShopifyLandingFooter />
    </>
  );
}
