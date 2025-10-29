import { logoPricingData } from "../services/logo-landing-content/logo-landing-content";

export type LogoCategory = keyof typeof logoPricingData;

export const categoryLabels: Record<LogoCategory, string> = {
  twoDLogoDesign: "2D Logo Design",
  threeDLogoDesign: "3D Logo Design",
  animatedLogoDesign: "Animated Logo Design",
  minimalLogoDesign: "Minimal Logo Design",
  mascotLogoDesign: "Mascot Logo Design",
  wordmarkLogoDesign: "Wordmark Logo Design",
  customizeLogoDesign: "Customize Logo Design",
};
