"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

import { OpenLiveChat } from "@/utils/open-live-chat";
import DailogLeadForm from "../forms/dailog-lead-form";

import Logo from "../../../public/favicon/logo-black.png";

import { IoChatbox } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

type WebDesignHeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

function WebDesignHeader({
  ctaHref,
  ctaLabel = "Let's get started!",
}: WebDesignHeaderProps) {
  return (
    <header className="absolute top-0 z-50 bg-transparent w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          {ctaHref ? (
            <Button
              asChild
              className="cta-button-02 bg-transparent !border-primary text-black hover:bg-primary"
            >
              <a href={ctaHref}>
                {ctaLabel} <FaArrowRightLong />
              </a>
            </Button>
          ) : (
            <DailogLeadForm
              trigger={
                <Button className="cta-button-02 bg-transparent !border-primary text-black hover:bg-primary">
                  {ctaLabel} <FaArrowRightLong />
                </Button>
              }
            />
          )}
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

export default WebDesignHeader;
