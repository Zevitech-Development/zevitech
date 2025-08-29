import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export interface CustomSystemFieldInterface {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export interface CustomInputInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export interface CustomTextareaInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  options: SelectOption[];
}

export interface WhyChooseUsSection01Props {
  img01: StaticImageData;
  img03: StaticImageData;
  img02: StaticImageData;
  title: string;
  desc01: string;
  desc02: string;
}

export interface HomePageBrandSectionProps {
  heading: string;
  ratingText: string;
  logos: {
    brandImg: StaticImageData;
    alt: string;
  }[];
}

export interface CTAProps {
  backgroundImageClass: string;
  heading: string;
  highlightedText: string;
  paragraph: string;
}

export interface CaseStudyProps {
  title: string;
  description: string;
  tags: Array<{
    label: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  }>;
  features: string[];

  ctaText: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  images: Array<{
    src: string | StaticImageData;
    alt: string;
    className?: string;
  }>;
  layout?: "image-right" | "image-left";
  className?: string;
}

export interface ServicesHeroSection01Props {
  title: string;
  desc: string;
}

export interface ServicesPorfolioSection01Props {
  title: string;
  description: string;
  portfolioImages: { img: string | StaticImageData; alt: string }[];
}

export interface ServicesPorfolioSection02Props {
  title: string;
  description: string;
  portfolioImages: { img: string | StaticImageData; alt: string }[];
}

export interface ServicesProcessSection01Props {
  title: string;
  description: string;

  process01Icon: ReactNode;
  process01Title: string;
  process01Desc: string;

  process02Icon: ReactNode;
  process02Title: string;
  process02Desc: string;

  process03Icon: ReactNode;
  process03Title: string;
  process03Desc: string;
}

export interface Location {
  location: string;
  title?: string;
  content: string;
  image: string | StaticImageData;
}

export interface LocationStepsProps {
  locations: Location[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

export interface AboutSectionProps {
  badge: {
    text: string;
  };
  heading: string;
  paragraphs: string[];
  buttons: {
    primary: {
      text: string;
    };
    secondary: {
      text: string;
    };
  };
  badges: {
    src: string | StaticImageData;
    alt: string;
    width: number;
  }[];
  rightSideImage: {
    src: string | StaticImageData;
    alt: string;
    className?: string;
  };
}

export interface CTA02Props {
  backgroundClass: string;
  heading: string;
  text: string;
}

export interface Cta03Props {
  image: StaticImageData;
  heading: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  list: string[];
}

export interface FaqSectionProps {
  faqs: FaqItem[];
}

export interface PricingItem {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  description: string;
  features: string[];
  badge?: "BEST SELLER" | "FREE $500 ADS CREDIT" | string | null;
  buttonText?: string;
}

export interface PricingSectionProps {
  // Header content
  subtitle: string;
  title: string;
  highlightedWord?: string;
  description: string;

  // Pricing data
  pricingData: PricingItem[];

  // Optional customizations
  className?: string;
  showChatButton?: boolean;
  ctaButtonText?: string;
  chatButtonText?: string;

  // Optional callbacks
  onCtaClick?: (item: PricingItem) => void;
  onChatClick?: () => void;
}

export interface SectionData {
  id: string;
  title: string;
  content: string[];
}

export interface PrivacyData {
  title: string;
  companyName: string;
  contactEmail: string;
  sections: SectionData[];
}

// Component props interface
export interface PrivacyPolicySidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  data: PrivacyData;
}

export interface GlobalAccordianProps {
  data: PrivacyData;
}
