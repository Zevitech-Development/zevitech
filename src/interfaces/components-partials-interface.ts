import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

export interface ReviewCardInterface {
  ProfilePicture: StaticImageData | string;
  ClientName: string;
  ReviewDate: string;
  ReviewsQuote: string;
  className?: string;
}

export interface ProcessStepInterface {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image?: string | StaticImageData | StaticImport;
  video?: string;
  technologies: { name: string; icon: string | IconType }[];
  category: string;
  bgColor: string;
}

export interface CustomProjectItem {
  slug: string;
  title: string;
  tag: string;
  description: string;
  image?: string | StaticImageData | StaticImport;
  liveUrl?: string;
  client: string;
  year: string;
  scope: string;
  result: string;
  technologies: { name: string; icon: string | IconType }[];
  bgColor: string;
}

export interface ComingSoonSectionProps {
  serviceName: string;
}

export interface CustomProjectDetailPageProps {
  slug: string;
}

export interface CustomProjectDetailProps {
  slug: string;
}
