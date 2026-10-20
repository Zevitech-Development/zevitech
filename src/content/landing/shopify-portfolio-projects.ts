import type { ShopifyPortfolioProject } from "@/interfaces/shopify-portfolio-interface";
import DakinFull from "../../../public/images/shopify-portfolio-img01.png";
import DemureFull from "../../../public/images/shopify-portfolio-img02.png";
import CornerFull from "../../../public/images/shopify-portfolio-img03.png";
import DakinHero from "../../../public/images/portfolio/EcommerceImg11.png";
import DemureHero from "../../../public/images/portfolio/ecommerce-img09.png";
import CornerHero from "../../../public/images/portfolio/ecommerce-img10.png";
import DressUp from "../../../public/store-studio/portfolio/dressup-refined.webp";
import Ego from "../../../public/store-studio/portfolio/ego-refined.webp";
import EcoLife from "../../../public/store-studio/portfolio/ecolife-refined.webp";
import Clotya from "../../../public/store-studio/portfolio/clotya-refined.webp";

export const shopifyPortfolioProjects: ShopifyPortfolioProject[] = [
  { name: "Dakinstore", category: "Apparel & accessories", image: DakinFull, thumbnail: DakinHero },
  { name: "Forever Demure", category: "Fashion & beauty", image: DemureFull, thumbnail: DemureHero },
  { name: "JH Corner Outdoors", category: "Outdoor living", image: CornerFull, thumbnail: CornerHero },
];

export const shopifyAdditionalReferences: ShopifyPortfolioProject[] = [
  { name: "DressUp", category: "Fashion", image: DressUp, thumbnail: DressUp },
  { name: "EGO Scooter", category: "Electric mobility", image: Ego, thumbnail: Ego },
  { name: "EcoLife", category: "Food & grocery", image: EcoLife, thumbnail: EcoLife },
  { name: "Clotya", category: "Fashion", image: Clotya, thumbnail: Clotya },
];
