import { LogoCategory } from "@/content/checkout-page/checkout-page-content";
import { StaticImageData } from "next/image";

export interface LogoDesignService {
  id: number;
  name: string;
  category: string;
  profile: string | StaticImageData;
  href: string;
}

export interface LogoProcessItem {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export interface LogoProcessProps {
  approaches: LogoProcessItem[];
}

export interface BusinessFooterProps {
  description: string;
}

export interface OrderSummaryProps {
  selectedCategory: LogoCategory;
  selectedTier: number;
  onCategoryChange: (value: LogoCategory) => void;
  onTierChange: (index: number) => void;
}
