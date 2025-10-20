import { StaticImageData } from "next/image";
import { Control, FieldValues, Path } from "react-hook-form";

export interface TabContent {
  id: string;
  title: string;
  heading: string;
  subheading: string;
  subtitle: string;
  description: string;
  image: StaticImageData | string;
}

export interface FaqItem {
  question: string;
  answer: string;
  list?: string[];
}

export interface FaqSectionProps {
  faqItems: FaqItem[];
  defaultOpenIndex?: number; // open first FAQ by default or specific index
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

// common-interfaces.ts
export interface LocationItem {
  location: string;
  title: string;
  content: string;
  image: StaticImageData;
}

export interface LocationStepsProps {
  locations: LocationItem[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string; // ✅ add this
}

export interface WhyChooseUsSection01Props {
  img01: StaticImageData;
  img03: StaticImageData;
  img02: StaticImageData;
  badgeCotent: string;
  title: string;
  desc01: string;
  desc02: string;
  sectionOrder?: string;
}

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
  control: any;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  options: SelectOption[];
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

export interface CtaProps {
  image: StaticImageData;
  heading: string;
  text: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServicesProps {
  title: string;
  highlightedText: string;
  description: string;
  servicesData: ServiceItem[];
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showChatButton?: boolean;
}

export interface ApproachItem {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export interface TestingApproachesSectionProps {
  mainTitle: string;
  highlightedWord: string;
  subtitle: string;

  leftCardTitle: string;
  leftCardDescription: string;

  approaches: ApproachItem[];
}

export interface DynamicHeroSection01Props {
  badgeText: string;
  badgeIcon: React.ReactNode;
  title: string;
  desc: string;
}

// Define props
export interface DynamicHeroProps {
  badgeIcon: React.ReactNode;
  badgeText: string;
  heading: string;
  highlightText?: string;
  subheading: string;
  description: string;
  heroImage: StaticImageData;
}
// Dynamic Website Dev Hero
export interface DynamicWebsiteDevHeroProps {
  badgeIcon: React.ReactNode;
  badgeText: string;
  heading: string;
  highlightText: string;
  subheading: string;
  description: string;
  heroImage: any;
}
