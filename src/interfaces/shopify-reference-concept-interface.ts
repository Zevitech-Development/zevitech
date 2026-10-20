export interface ShopifyReferenceConcept {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ShopifyConceptReferenceProps {
  conceptImage: ShopifyReferenceConcept;
  className?: string;
}
