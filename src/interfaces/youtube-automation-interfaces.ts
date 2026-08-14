import { StaticImageData } from "next/image";

export interface YoutubeGrowthSectionProps {
  introTitle: string;
  /** Trailing part of the intro heading, rendered in the primary colour */
  introTitleHighlight: string;
  introDescription: string;
  cardTitle: string;
  /** Trailing part of the card heading, rendered in the primary colour */
  cardTitleHighlight: string;
  cardDescription: string;
  phoneNumber: string;
  image: StaticImageData;
  imageAlt: string;
}

export interface YoutubeResultItem {
  /** Chip shown in the top-left corner of the card, e.g. "All-Time" */
  tag: string;
  /** Pill shown in the top-right corner of the card, e.g. "$27,593.76" */
  revenue: string;
  /** Caption rendered over the bottom fade, e.g. "459.3M Views" */
  views: string;
  /** Resting 3D rotation, in degrees — the card animates flat on hover */
  rotateY: number;
  rotateX: number;
  rotateZ: number;
  /** Colour of the blurred glow sitting behind the card */
  glowColor: string;
  img: string | StaticImageData;
}

export interface YoutubeResultsSectionProps {
  eyebrow: string;
  title: string;
  highlightText: string;
  description: string;
  results: YoutubeResultItem[];
  footnote: string;
  ctaText: string;
}
