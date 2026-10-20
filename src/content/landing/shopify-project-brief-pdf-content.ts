export const shopifyProjectBriefPdfContent = {
  brand: "ZEVITECH",
  header: "Shopify development",
  title: "Sales-focused Shopify store",
  subtitle: "Project brief",
  introduction:
    "Your selected scope, business details and design direction, ready for a project conversation.",
  planningLabel: "YOUR PROJECT AT A GLANCE",
  status: "Planning brief — not a payment receipt.",
  footer: "Zevitech | Project brief",
  page: "Page",
  of: "of",
  continued: "continued",
  created: "Created",
  noDate: "Date not provided",
  notProvided: "Not provided",
  creator: "Zevitech project brief builder",
  scope: {
    title: "Selected scope",
    package: "Selected package",
    fee: "Total package price",
    upfront: "Due at checkout — 40% upfront",
    balance: "Due after delivery — 60% balance",
    paymentPlan: "Pay 40% upfront so we can start your project. The remaining 60% is due after delivery. This brief does not confirm a payment.",
    currency: "USD",
    products: "Product setup",
    productPrefix: "Up to",
    productSuffix: "products",
    features: "Included in this package",
    noFeatures: "Package features to be confirmed.",
    exclusionsLabel: "Separate costs and custom requirements",
    exclusions:
      "Shopify subscriptions, paid themes, apps and third-party fees are separate. Custom requirements are scoped before payment.",
  },
  business: {
    title: "Project details",
    projectType: "Project type",
    businessType: "Business type",
    businessCategory: "Business category",
    brand: "Business name",
    brief: "About the business",
    existingStore: "Current website",
    name: "Contact name",
    email: "Email address",
    phone: "Phone number",
  },
  design: {
    title: "Design preferences",
    reference: "Starting reference",
    referenceNote:
      "The selected reference is a starting direction. The final store design will be refined around your business and agreed scope.",
    layout: "Layout direction",
    palette: "Colour palette",
    customColors: "Custom colours",
    priorities: "Design priorities",
    noPriorities: "No priorities selected.",
    references: "Inspiration and reference links",
    requirements: "Additional requirements",
  },
  assets: {
    title: "Supplied asset filenames",
    note: "Only filenames are recorded here. The files themselves are not embedded in this PDF or sent to Zevitech by this export.",
    logo: "Logo filename",
    noLogo: "No logo selected.",
    products: "Product image filenames",
    noProducts: "No product images selected.",
  },
  next: {
    title: "Next steps",
    steps: [
      {
        title: "Review your brief",
        description:
          "Check the package, contact details and design preferences. Keep this PDF as a copy of your current selections.",
      },
      {
        title: "Share it when you are ready",
        description:
          "Share your brief and original assets with Zevitech to discuss your project. Downloading this PDF does not submit a project request.",
      },
      {
        title: "Confirm the project scope",
        description:
          "Agree the requirements, timeline, final scope and any additional costs with the team before proceeding to payment.",
      },
    ],
    closing:
      "This planning document reflects your current selections. Check your checkout confirmation for order and payment status. Downloading this brief does not create or change an order.",
  },
  errors: {
    invalidScope: "The selected package has an invalid price or product count.",
    unsupportedCharacters:
      "The PDF font cannot display these characters. A font with additional character support is required:",
  },
} as const;

// PDF rendering uses the same primary and ice-blue colours as the site. These
// tokens live here because a standalone PDF has no access to CSS variables.
export const shopifyProjectBriefPdfTheme = {
  primary: "#007afc",
  ink: "#17243a",
  paragraph: "#33445a",
  muted: "#53677e",
  ice: "#eaf4ff",
  border: "#dce7f2",
  white: "#ffffff",
} as const;
