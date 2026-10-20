const baselineCapabilities = {
  presetPalette: true,
  logo: true,
  productImages: true,
  customPalette: false,
  layoutSelection: false,
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
    label: "Essential themes",
    requirementId: null,
    layouts: [0, 1],
    description: "An Editorial storefront with your logo, product photos and a preset colour palette.",
    customization: "Personalise the branding and images within the selected layout.",
    capabilities: baselineCapabilities,
  },
  {
    packageName: "Growth",
    label: "Branded themes",
    requirementId: "theme-growth",
    layouts: [0, 1, 2],
    description: "Adds the Spotlight collection, custom colours and editable hero messaging.",
    customization: "Set your own colour palette and tailor the store headline.",
    capabilities: growthCapabilities,
  },
  {
    packageName: "Level Up",
    label: "Collection themes",
    requirementId: "theme-level-up",
    layouts: [0, 1, 2, 3, 5],
    description: "Adds Boutique layouts, collection browsing and more product presentation choices.",
    customization: "Switch between included layouts and personalise product details.",
    capabilities: levelUpCapabilities,
  },
  {
    packageName: "Pro",
    label: "Campaign themes",
    requirementId: "theme-pro",
    layouts: [0, 1, 2, 3, 4, 5],
    description: "Adds Campaign layouts with benefit sections, promotional content and richer storytelling.",
    customization: "Plan custom content sections and campaign assets with your team.",
    capabilities: proCapabilities,
  },
  {
    packageName: "Executive",
    label: "Immersive themes",
    requirementId: "theme-executive",
    layouts: [0, 1, 2, 3, 4, 5, 6, 7],
    description: "Adds Dimensional and Parallax themes with layered product stories and controlled motion.",
    customization: "Shape the visual story, page sections and motion direction.",
    capabilities: executiveCapabilities,
  },
  {
    packageName: "Top Tier",
    label: "Signature commerce themes",
    requirementId: "theme-top-tier",
    layouts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    description: "Adds Cinematic and Commerce Studio themes alongside every preceding collection.",
    customization: "Combine signature layouts with the package’s advanced commerce functionality.",
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
  galleryNote: "The gallery shows designs included in your selected package. Each preview is an illustrative starting point.",
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
  cumulative: "Each higher package includes the themes and customisation options below it.",
  fixedLayout: "Your selected layout is included. Level Up adds switching between included layouts.",
};
