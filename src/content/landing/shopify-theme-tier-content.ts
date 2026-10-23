const baselineCapabilities = {
  presetPalette: true,
  logo: true,
  productImages: true,
  customPalette: false,
  layoutSelection: true,
  headline: false,
  productDetails: false,
  customSections: false,
  motionControls: false,
  advancedCommerce: false,
};

const growthCapabilities = {
  ...baselineCapabilities,
  customPalette: true,
  headline: true,
};

const levelUpCapabilities = {
  ...growthCapabilities,
  layoutSelection: true,
  productDetails: true,
};

const proCapabilities = {
  ...levelUpCapabilities,
  customSections: true,
};

const executiveCapabilities = {
  ...proCapabilities,
  motionControls: true,
};

export const themeTiers = [
  {
    packageName: "Beginner",
    label: "Essential setup",
    requirementId: null,
    layouts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    description: "Choose any reference design. Includes essential storefront setup and your branding and product photos.",
    customization: "Personalise the branding and images within the selected layout.",
    capabilities: baselineCapabilities,
  },
  {
    packageName: "Growth",
    label: "Brand customization",
    requirementId: "theme-growth",
    layouts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    description: "Choose any reference design. Adds custom colours, hero messaging, newsletter and email automation setup.",
    customization: "Set your own colour palette and tailor the store headline.",
    capabilities: growthCapabilities,
  },
  {
    packageName: "Level Up",
    label: "Product discovery",
    requirementId: "theme-level-up",
    layouts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    description: "Choose any reference design. Adds product discovery tools, filters and product detail customization.",
    customization: "Personalise product details and plan product discovery tools.",
    capabilities: levelUpCapabilities,
  },
  {
    packageName: "Pro",
    label: "Campaign functionality",
    requirementId: "theme-pro",
    layouts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    description: "Choose any reference design. Adds reviews, campaign content and supported integrations.",
    customization: "Plan custom content sections and campaign assets with your team.",
    capabilities: proCapabilities,
  },
  {
    packageName: "Executive",
    label: "Advanced customization",
    requirementId: "theme-executive",
    layouts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    description: "Choose any reference design. Adds deeper customization, motion direction and multilingual scope.",
    customization: "Shape the visual story, page sections and motion direction.",
    capabilities: executiveCapabilities,
  },
  {
    packageName: "Top Tier",
    label: "Advanced commerce",
    requirementId: "theme-top-tier",
    layouts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    description: "Choose any reference design. Adds the most extensive customization and commerce functionality.",
    customization: "Plan the package’s advanced commerce functionality around your chosen design.",
    capabilities: {
      ...executiveCapabilities,
      advancedCommerce: true,
    },
  },
] as const;

export const themeCapabilityCopy = {
  presetPalette: "Preset colour palettes",
  logo: "Your logo",
  productImages: "Your product photos",
  customPalette: "Custom colour palette",
  layoutSelection: "Choose an included layout",
  headline: "Store headline",
  productDetails: "Product details",
  customSections: "Custom content sections",
  motionControls: "Motion direction",
  advancedCommerce: "Advanced commerce",
};

export const themeTierCopy = {
  galleryNote: "Every design is available with every package. Preview functionality is illustrative; your package defines the delivered scope.",
  illustrativeReference: "Illustrative reference",
  includedIn: "Included in {package}",
  unlockWithPrice: "Unlock with {package} · {price}",
  previewReference: "Preview reference",
  previewReferenceLabel: "Preview {name}",
  included: "Included in your package",
  requires: "Available with {package}",
  upgrade: "Review theme upgrade",
  preview: "Preview theme",
  apply: "Use this theme",
  customization: "Your customisation options",
  locked: "Unlock with {package}",
  cumulative: "Every package includes all design references. Higher packages add customization and functionality.",
  fixedLayout: "Choose any reference layout with any package.",
};
