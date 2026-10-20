export const SHOPIFY_PAYMENT_VERSION = "upfront-40-v1" as const;
export const SHOPIFY_LEGACY_PAYMENT_VERSION = "legacy-full-v1" as const;

/** Split the agreed USD package total in integer cents; the balance gets the remainder. */
export function getShopifyPaymentSchedule(total: number): { total: number; upfront: number; balance: number } {
  const totalCents = Math.round(total * 100);
  if (!Number.isFinite(total) || total <= 0 || !Number.isSafeInteger(totalCents)
    || Math.abs(total - totalCents / 100) > 1e-9) {
    throw new RangeError("INVALID_SHOPIFY_PACKAGE_TOTAL");
  }
  const upfrontCents = Number((BigInt(totalCents) * BigInt(40) + BigInt(50)) / BigInt(100));
  return { total: totalCents / 100, upfront: upfrontCents / 100, balance: (totalCents - upfrontCents) / 100 };
}
