"use client";
import React from "react";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { homeAmazonContent } from "@/content/homepage/home-page-content";

const content = [];
export function HomeAmazonSection() {
  return (
    <div className="w-full section-padding-standard ">
      <StickyScroll content={homeAmazonContent} />
    </div>
  );
}
