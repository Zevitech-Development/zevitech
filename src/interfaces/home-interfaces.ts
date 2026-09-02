import type React from "react";
import { StaticImageData } from "next/image";

export interface TechItem {
  name: string;
  icon: StaticImageData | string;
}

export interface MarqueeColumnProps {
  items: TechItem[];
  direction: "up" | "down";
  speed?: number;
}

export interface HomePageBrandSectionProps {
  heading: string;
  ratingText: string;
  logos: {
    brandImg: StaticImageData;
    alt: string;
  }[];
}

export interface TechStackExpertiseProps {
  /** Overrides the default section heading. Lets the homepage set its own
      keyword-targeted h2 without changing the landing pages that reuse this. */
  heading?: React.ReactNode;
}
