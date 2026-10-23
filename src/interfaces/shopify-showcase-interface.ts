export interface ShopifyShowcaseHotspot {
  /** Horizontal position as a percentage of the image width. */
  x: number;
  /** Vertical position as a percentage of the image height. */
  y: number;
  title: string;
  detail: string;
}

export interface ShopifyShowcase {
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
  hotspots: ShopifyShowcaseHotspot[];
}

export interface ShopifyShowcasePreviewProps {
  showcase: ShopifyShowcase;
  brand: string;
  mobile?: boolean;
  expanded?: boolean;
}
