"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

import { OpenLiveChat } from "@/utils/open-live-chat";


import Logo from "../../../public/favicons/logo-white.png";
import { IoChatbox } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

function LandingHeader() {
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


          <Button
            onClick={OpenLiveChat}
            className="cta-button-02 bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            <IoChatbox /> Chat Now
          </Button>

          <Button className="cta-button-02 bg-transparent !border-primary text-primary-foreground hover:bg-primary">
            Let&apos;s get started! <FaArrowRightLong />
          </Button>
        </div>

        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center gap-2">


          <Button
            onClick={OpenLiveChat}
            className="bg-primary text-primary-foreground !h-[48px] !rounded-xl !px-6"
          >
            <IoChatbox />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default LandingHeader;
