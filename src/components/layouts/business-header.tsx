"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

import { OpenLiveChat } from "@/utils/open-live-chat";

import Logo from "../../../public/favicons/logo-white.png";
import { IoCall, IoChatbox } from "react-icons/io5";

function BusinessHeader() {
  return (
    <header className="absolute w-full top-0 left-0">
      <div className="layout-standard h-[110px] flex justify-between items-center border-b border-white/20">
        <Link href={"/"} passHref className="group flex items-center">
          <Image
            src={Logo}
            alt="Zevitech"
            priority
            width={140}
            className="group-hover:scale-105 transition-transform max-md:w-[120px]"
          />
        </Link>

        {/* DESKTOP HEADER */}
        <div className="md:flex hidden items-center gap-3">
          <a
            href="https://wa.me/13022190703?text=Hello%20I%20am%20interested%20in%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="cta-button bg-transparent border-4 border-primary text-primary-foreground text-lg h-[48px] font-bold rounded-full px-6 hover:bg-primary hover:scale-105 !animation-standard">
              <IoCall /> What&apos;sapp Now
            </Button>
          </a>

          <Button
            onClick={OpenLiveChat}
            className="cta-button bg-primary text-primary-foreground text-lg h-[48px] font-semibold rounded-full px-6 hover:bg-primary-hover hover:scale-105 !animation-standard"
          >
            <IoChatbox /> Chat Now
          </Button>
        </div>

        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center gap-2">
          <a href="tel:+13022176872">
            <Button className="cta-button bg-transparent border-4 border-primary text-primary-foreground h-[48px] rounded-xl px-6">
              <IoCall />
            </Button>
          </a>

          <Button
            onClick={OpenLiveChat}
            className="cta-button bg-primary text-primary-foreground h-[48px] rounded-xl px-6"
          >
            <IoChatbox />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default BusinessHeader;
