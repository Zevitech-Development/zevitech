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

  // ✅ Hide header/footer ONLY for landing pages
  const isLandingRoute =
    pathname.startsWith("/landing-pages/logo-design")

  return (
    <>
      {!isLandingRoute && <Header />}
      {children}
      {!isLandingRoute && <Footer />}
    </>
  );
}
