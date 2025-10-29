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
      <BusinessFooter description="Zevitech is an independent creative agency specializing in professional logo design and brand identity solutions. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with any third-party brands or design platforms. All trademarks, logos, and brand names mentioned are the property of their respective owners." />
    </>
  );
}
