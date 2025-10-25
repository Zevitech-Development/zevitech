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
      <BusinessFooter />
    </>
  );
}
