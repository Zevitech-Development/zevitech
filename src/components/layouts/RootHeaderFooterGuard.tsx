"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Header } from "./header";
import Footer from "./footer";

export default function RootHeaderFooterGuard({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname() || "";

  // Hide global header/footer only on specific landing roots
  const landingRoots = [
    "/landing-pages/logo-design",
    "/landing-pages/shopify-development",
    "/landing-pages/website-design",
    // Add other landing roots here if they have their own layout
  ];
  const isLandingRoot = landingRoots.includes(pathname);

  return (
    <>
      {!isLandingRoot && <Header />}
      {children}
      {!isLandingRoot && <Footer />}
    </>
  );
}
