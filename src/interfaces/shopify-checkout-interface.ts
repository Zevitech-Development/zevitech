export interface ShopifyCheckoutAttribution {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
}

export interface ShopifyCheckoutBrief {
  version?: number;
  package: { name: string; price?: number; currency?: string; productLimit?: number };
  business: {
    name: string;
    email: string;
    phone: string;
    brand: string;
    brief: string;
    projectType: string;
    requirements?: string;
    [key: string]: unknown;
  };
  design: { template: string; layout: string; palette: string };
  imageFilenames: string[];
  logoFilename: string;
  priorities: string[];
  needs: { designLayout?: number; customizationIds?: ("customPalette" | "headline" | "productDetails" | "customSections" | "motionControls" | "advancedCommerce")[]; productCount: string; featureIds: string[]; scopeConfirmed: boolean; featureLabels?: string[] };
}

export interface ShopifyPackageCheckoutProps {
  brief: ShopifyCheckoutBrief;
  onValidate?: () => Promise<boolean>;
  onReviewRequirements?: () => void;
}

export interface ShopifyCheckoutPreviewProps {
  brief: ShopifyCheckoutBrief;
  onEdit: () => void;
}

export interface ShopifyCheckoutPublicOrder {
  id: string;
  status: "created" | "processing" | "pending" | "declined" | "paid" | "cancelled";
  packageName: string;
  /** Amount charged by this checkout, not the complete project value. */
  amount: number;
  totalAmount: number;
  upfrontAmount: number;
  balanceAmount: number;
  amountPaid: number;
  paymentStage: "upfront" | "full";
  paymentVersion: "upfront-40-v1" | "legacy-full-v1";
  currency: "USD";
  mode: "sandbox" | "live";
  briefFingerprint: string;
  transactionId?: string;
  declineCode?: string;
}

export interface ShopifyCheckoutConfig {
  available: boolean;
  mode: "sandbox" | "live";
  tokenizationKey?: string;
  scriptUrl?: string;
  statementDescriptor?: string;
}
