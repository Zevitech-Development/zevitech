// import LandingHeader from "@/components/layouts/landing-header";
// import LandingFooter from "@/components/layouts/landing-footer";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
