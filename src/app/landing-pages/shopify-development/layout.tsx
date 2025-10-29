import LandingHeader from "@/components/layouts/landing-header";
import BusinessFooter from "@/components/layouts/business-footer";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingHeader />
      {children}
      <BusinessFooter description='Zevitech is an independent company that provides design and development services for e-commerce solutions. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Shopify Inc., or any of its subsidiaries or affiliates. The name "Shopify" as well as related names, marks, emblems, and images are registered trademarks of their respective owners.' />
    </>
  );
}
