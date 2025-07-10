import BusinessHeader from "@/components/layouts/business-header";
import BusinessFooter from "@/components/layouts/business-footer";

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BusinessHeader />
      {children}
      <BusinessFooter />
    </>
  );
}
