"use client"
import React from "react";
import Link from "next/link";

import { TrustedUsers } from "@/components/common/trusted-users";

import { Button } from "@/components/ui/button";

import { IoChatbox } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { Phone } from "lucide-react";

import DailogLeadForm from "@/forms/dailog-lead-form";

import { OpenLiveChat } from "@/utils/open-live-chat";

function CampaignsSection() {
  return (
    <>
      <section className="relative overflow-hidden bg-campaign-cta bg-cover bg-opacity-20 py-12 px-6 lg:px-8">
        {/* Black Overlay */}
        <div className="absolute z-10 inset-0 bg-black/70" />

        <div className="relative z-20 layout-standard text-center ">
          <div className="inline-flex items-center gap-2 bg-[#D1FADF] text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-green-200">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            Live on Passionfroot 🌟
          </div>

          <h1 className="text-center font-heading text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wider">
            Thousands of <span className="text-primary">Campaigns</span>
            <br />
            launched to date
          </h1>

          <TrustedUsers
            avatars={[
              "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=80&h=80&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=faces",
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=faces",
            ]}
            rating={5}
            totalUsersText={5000}
            caption="Loved by"
            starColorClass="text-yellow-400"
            ringColors={[
              "ring-pink-500",
              "ring-green-500",
              "ring-blue-500",
              "ring-purple-500",
            ]}
            captionClassName="text-white"
          />

          <div className="flex flex-col items-start lg:items-end justify-start gap-6">
            <div className="w-full flex-center gap-4">
              {/* Get Started Button (Dialog) */}
              <DailogLeadForm
                trigger={
                  <Button className="cta-button bg-gray-900 !border-primary hover:bg-primary text-primary-foreground md:text-lg md:px-6 md:py-6">
                    Let&apos;s Get Started
                    <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
                  </Button>
                }
              ></DailogLeadForm>

              {/* Live Chat Button */}
              <Button
                variant={"outline"}
                onClick={OpenLiveChat}
                className="cta-button-02 hover:bg-primary-hover text-primary"
              >
                <IoChatbox /> Chat Now
              </Button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 mx-auto">
              <div className="px-3">
                <p className="flex flex-col sm:flex-row items-center gap-2 text-sm sm:text-base">
                  <Phone /> CONTACT NUMBER :{" "}
                  <Link
                    href={"tel:(302) 217-6211"}
                    className="font-bold text-primary"
                  >
                    (302) 217-6211
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CampaignsSection;
