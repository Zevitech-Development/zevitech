import { ReactNode } from "react";
import { StaticImageData } from "next/image";

export interface CTAButton01Props {
  class?: string;
  ctaButton01Text: string;
  ctaButton01OnClick?: () => void;
}

export interface CTAButton02Props {
  class?: string;
  ctaButton02Text: string;
  ctaButton02IconLeft?: ReactNode;
  ctaButton02OnClick?: () => void;
  ctaButton02IconRight?: ReactNode;
}

export interface MegaMenuProps {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  setIsServicesOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProcessStepInterface {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ReviewCardInterface {
  ProfilePicture: StaticImageData | string;
  ClientName: string;
  ReviewDate: string;
  ReviewsQuote: string;
  className?: string;
}

