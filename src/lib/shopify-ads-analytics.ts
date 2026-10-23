type ShopifyGtag = (command: "config" | "event", name: string, params?: Record<string, unknown>) => void;

/** Only explicit Google Ads conversion destinations may select an account. */
export function shopifyAdsDestination(value?: string): string | undefined {
  return value && /^AW-\d+\/[A-Za-z0-9_-]+$/.test(value) ? value : undefined;
}

export function isShopifyProductionBrowser(): boolean {
  return typeof window !== "undefined" && process.env.NODE_ENV === "production"
    && ["zevitech.com", "www.zevitech.com"].includes(window.location.hostname);
}

/** Register each destination once per gtag instance, without another page view. */
export function createShopifyAdsConfigurator() {
  const configured = new WeakMap<ShopifyGtag, Set<string>>();
  return (sender: ShopifyGtag | undefined, destinations: (string | undefined)[]): boolean => {
    const ids = Array.from(new Set(destinations.map(shopifyAdsDestination).filter(Boolean).map(destination => destination!.split("/")[0])));
    if (!ids.length) return true;
    if (!sender) return false;
    const sent = configured.get(sender) || new Set<string>();
    configured.set(sender, sent);
    let complete = true;
    for (const id of ids) {
      if (sent.has(id)) continue;
      try { sender("config", id, { send_page_view: false }); sent.add(id); }
      catch { complete = false; }
    }
    return complete;
  };
}

const configure = createShopifyAdsConfigurator();
export function configureShopifyAds(): boolean {
  if (!isShopifyProductionBrowser()) return true;
  const sender = (window as Window & { gtag?: ShopifyGtag }).gtag;
  return configure(typeof sender === "function" ? sender : undefined, [
    process.env.NEXT_PUBLIC_SHOPIFY_ADS_PURCHASE_SEND_TO,
    process.env.NEXT_PUBLIC_SHOPIFY_ADS_LEAD_SEND_TO,
  ]);
}
