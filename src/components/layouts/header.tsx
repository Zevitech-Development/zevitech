"use client";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";

import { HeaderNavLinks } from "@/content/components.layout-content";

import Logo from "../partials/logo";
import { CTAButton01 } from "../partials/cta-buttons";
import DailogLeadForm from "@/forms/dailog-lead-form";

import MegaMenu from "./mega-menu";

import { FaChevronDown } from "react-icons/fa6";
import { MobileHeader } from "./mobile-header";

function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  // const router = useRouter();

  let timer: NodeJS.Timeout;

  // const handleNavigate = (path: string) => {
  //   router.push(path);
  // };

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  return (
    <header className="h-[90px] bg-transparent absolute w-full z-20">
      <div className="layout-standard border-b border-border flex items-center h-full justify-between">
        <Logo />

        <ul className="max-lg:hidden flex items-center gap-8">
          {HeaderNavLinks.map((nav, index) => (
            <li
              key={index}
              className="text-white text-base relative group"
              onMouseEnter={
                nav.title === "Our Services" ? handleMouseEnter : undefined
              }
            >
              <Link
                href={nav.href || ""}
                className="relative inline-flex items-center gap-2"
              >
                {nav.title}

                {nav.title === "Our Services" && (
                  <FaChevronDown className="text-sm translate-y-[1px] transition-transform duration-300 group-hover:rotate-180" />
                )}

                {/* Underline animation */}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <DailogLeadForm
            trigger={
              <CTAButton01
                ctaButton01Text="Let's get started"
                class="max-lg:!hidden"
              />
            }
          />
        </div>
        
        <div className="lg:hidden">
          <MobileHeader />
        </div>
      </div>

      {isServicesOpen && (
        <MegaMenu
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          setIsServicesOpen={setIsServicesOpen}
        />
      )}
    </header>
  );
}

export default Header;
