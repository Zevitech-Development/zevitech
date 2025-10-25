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
