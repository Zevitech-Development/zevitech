import { shopifyBillingCountryCodes } from "@/content/landing/shopify-billing-countries";

/** Editable suggestions only; a longer contact name does not reveal its given/family-name boundaries. */
export function suggestShopifyBillingName(contactName: string) {
  const parts = contactName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  if (parts.length === 2) return { firstName: parts[0], lastName: parts[1] };
  return { firstName: "", lastName: "" };
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region", fallback: "none" });

export const shopifyBillingCountries = shopifyBillingCountryCodes
  .map((code) => ({ code, name: regionNames.of(code) || code }))
  .sort((a, b) => a.name.localeCompare(b.name, "en"));
