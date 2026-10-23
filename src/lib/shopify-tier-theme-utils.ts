import type { ShopifyPremiumProduct } from "@/interfaces/shopify-premium-preview-interface";

/** Numeric price from a formatted label such as "$1,240.00". */
export const priceOf = (product: Pick<ShopifyPremiumProduct, "priceLabel">) => Number(product.priceLabel.replace(/[^0-9.]/g, "")) || 0;

export const formatMoney = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: amount % 1 ? 2 : 0 }).format(amount);

/** Request a smaller rendition of remote photography; local images pass through unchanged. */
export const sizedImage = (src: string, width: number) => src.replace(/([?&])w=\d+/, `$1w=${Math.max(1200, width * 2)}`);

/** Pick a product by position, wrapping around short catalogues. */
export const productAt = <T,>(products: T[], index: number) => products[((index % products.length) + products.length) % products.length];
