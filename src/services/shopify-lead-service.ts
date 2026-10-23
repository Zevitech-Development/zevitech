import { randomUUID } from "node:crypto";
import { shopifyLeadCopy as copy } from "@/content/landing/shopify-lead-content";
import type { ShopifyLeadType } from "@/schemas/shopify-lead-schema";
import { sanitizeShopifyCheckoutAttribution } from "@/lib/shopify-checkout-attribution";
import { packageFeatureNeeds } from "@/content/landing/shopify-package-recommendation-content";
import { sendShopifyOrderNotification, type ShopifyOrderNotification } from "@/services/shopify-checkout-notifications";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;",
}[character]!));

/** Builds the business-mailbox email for a captured lead. Only listed fields are included. */
export function renderShopifyLead(lead: ShopifyLeadType): ShopifyOrderNotification {
  const quote = lead.intent === "quote";
  const f = copy.fields;
  const customer: [string, string][] = [
    [f.name, lead.name], [f.email, lead.email], [f.phone, lead.phone], [f.brand, lead.brand], [f.brief, lead.brief],
  ];
  const project: [string, string][] = [
    [f.projectType, lead.projectType], [f.businessType, lead.businessType], [f.businessCategory, lead.businessCategory],
    [f.customCategory, lead.customCategory || ""], [f.existingStore, lead.existingStore || ""],
    [f.design, lead.design], [f.package, lead.packageName], [f.price, `$${lead.packagePrice.toLocaleString("en-US")}`],
    [f.productCount, lead.productCount || ""],
    [f.featureIds, (lead.featureIds || []).map(id => packageFeatureNeeds.find(feature => feature.id === id)?.label || id).join(", ")],
    [f.designNotes, lead.designNotes || ""], [f.customRequirements, lead.customRequirements || ""],
  ];
  const attribution = sanitizeShopifyCheckoutAttribution(lead.attribution) || {};
  const campaign = Object.entries(attribution).map(([key, value]) => [key, String(value)] as [string, string]);
  const groups = [
    { heading: copy.customer, fields: customer },
    { heading: copy.project, fields: project },
    ...(campaign.length ? [{ heading: copy.campaign, fields: campaign }] : []),
  ].map(group => ({ ...group, fields: group.fields.filter(([, value]) => value) }));
  const intro = quote ? copy.introQuote : copy.introCheckout;
  return {
    orderId: `lead-${randomUUID()}`,
    subject: `${quote ? copy.subjectQuote : copy.subjectCheckout} — ${lead.name} (${lead.brand})`,
    text: [intro, ...groups.map(group => `${group.heading}\n${group.fields.map(([label, value]) => `${label}: ${value}`).join("\n")}`)].join("\n\n"),
    html: `<p>${escapeHtml(intro)}</p>${groups.map(group => `<h2>${escapeHtml(group.heading)}</h2><dl>${group.fields.map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value).replace(/\r?\n/g, "<br>")}</dd>`).join("")}</dl>`).join("")}`,
  };
}

export async function sendShopifyLead(lead: ShopifyLeadType, sender = sendShopifyOrderNotification) {
  await sender(renderShopifyLead(lead));
}

/** Persist first; mail failure must never discard an accepted enquiry. */
export async function captureShopifyLead(lead: ShopifyLeadType, store: import("./shopify-lead-store").ShopifyLeadStore, sender = sendShopifyOrderNotification) {
  const record = await store.save(lead);
  await deliverStoredShopifyLead(record, store, sender);
  return record.id;
}
export async function deliverStoredShopifyLead(record: import("./shopify-lead-store").StoredShopifyLead, store: import("./shopify-lead-store").ShopifyLeadStore, sender = sendShopifyOrderNotification) {
  let claimed = false;
  try {
    if (!await store.claim(record.id)) return;
    claimed = true;
    const message = renderShopifyLead(record.lead);
    await sender({ ...message, orderId: record.id });
    await store.finish(record.id, true);
  } catch {
    // A failed release leaves a short lease; the durable queue is retried later.
    try { if (claimed) await store.finish(record.id, false); } catch { /* Durable record remains. */ }
  }
}
