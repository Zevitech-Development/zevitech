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