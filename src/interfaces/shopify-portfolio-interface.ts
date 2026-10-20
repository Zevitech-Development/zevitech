import type { StaticImageData } from "next/image";

export interface ShopifyPortfolioProject {
  name: string;
  image: StaticImageData;
  thumbnail: StaticImageData;
  category: string;
}

export interface ShopifyPortfolioCardProps {
  project: ShopifyPortfolioProject;
  eager?: boolean;
}
