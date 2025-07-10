import { StaticImageData } from "next/image";

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
