export interface ShopifyProjectTermsProps {
  content: {
    title: string;
    description: string;
    backLabel: string;
    backHref: string;
    sections: { id: string; title: string; body: string }[];
    contactLabel: string;
    contactEmail: string;
  };
}
