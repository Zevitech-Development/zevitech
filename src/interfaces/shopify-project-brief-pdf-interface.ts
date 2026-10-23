export interface ProjectBriefPdfInput {
  createdAt: string;
  plan: {
    name: string;
    price: number;
    products: number;
    features: string[];
  };
  business: {
    projectType: string;
    businessType?: string;
    businessCategory?: string;
    brand: string;
    brief: string;
    existingStore: string;
    name: string;
    email: string;
    phone?: string;
  };
  design: {
    reference: string;
    layout: string;
    palette: string;
    customColors?: { label: string; value: string }[];
    priorities: string[];
    references: string;
    requirements: string;
  };
  assets: {
    logoName: string;
    productNames: string[];
  };
  fonts: {
    regular: Uint8Array;
    bold: Uint8Array;
  };
}
