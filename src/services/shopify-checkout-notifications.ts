import nodemailer from "nodemailer";
import { shopifyOrderNotificationCopy as copy } from "@/content/landing/shopify-order-notification-content";
import { getShopifyDeliveryEstimate } from "@/content/landing/shopify-delivery-content";
import { packageFeatureNeeds } from "@/content/landing/shopify-package-recommendation-content";
import type { CheckoutStore, ShopifyCheckoutOrder } from "@/services/shopify-checkout-store";

export interface ShopifyOrderNotification {
  subject: string;
  text: string;
  html: string;
  orderId: string;
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;",
}[character]!));
const money = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

/** Only explicit fulfilment fields enter the notification; credentials never do. */
export function renderShopifyOrderNotification(order: ShopifyCheckoutOrder): ShopifyOrderNotification {
  const upfront = order.paymentStage === "upfront";
  const payment = [
    [copy.order, order.id], [copy.transaction, order.transactionId || ""],
    [copy.package, order.packageName], [copy.total, money(order.totalAmount ?? order.amount)],
    [copy.paid, money(order.amountPaid ?? order.amount)], [copy.balance, money(order.balanceAmount ?? 0)],
    [copy.stage, upfront ? copy.upfront : copy.full], [copy.productLimit, String(order.productLimit)],
    [copy.delivery, getShopifyDeliveryEstimate(order.packageName) || ""],
  ];
  const fieldPairs = (labels: Record<string, string>, values: Record<string, unknown>) =>
    Object.entries(labels).map(([key, label]) => [label, String(values[key] ?? "")]).filter(([, value]) => value);
  const requirements = [
    [copy.products, order.brief.needs.productCount],
    [copy.features, order.brief.needs.featureIds.map(id => packageFeatureNeeds.find(feature => feature.id === id)?.label || id).join(", ")],
    [copy.priorities, order.brief.priorities.join(", ")],
    [copy.customizations, (order.brief.needs.customizationIds || []).join(", ")],
  ];
  const groups = [
    { heading: copy.title, fields: payment },
    { heading: copy.customer, fields: fieldPairs(copy.businessFields, order.brief.business) },
    { heading: copy.design, fields: fieldPairs(copy.designFields, order.brief.design) },
    { heading: copy.needs, fields: requirements },
    { heading: copy.assets, fields: [[copy.logo, order.brief.logoFilename], [copy.images, order.brief.imageFilenames.join(", ")]] },
  ];
  const notes = [copy.assetNote, ...(upfront ? [copy.noAutomaticCharge] : [])];
  return {
    orderId: order.id,
    subject: `${copy.subject} — ${order.id}`,
    text: [copy.intro, ...groups.map(group => `${group.heading}\n${group.fields.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join("\n")}`), `${copy.inclusions}\n${order.features.map(feature => `- ${feature}`).join("\n")}`, ...notes].join("\n\n"),
    html: `<p>${escapeHtml(copy.intro)}</p>${groups.map(group => `<h2>${escapeHtml(group.heading)}</h2><dl>${group.fields.filter(([, value]) => value).map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value).replace(/\r?\n/g, "<br>")}</dd>`).join("")}</dl>`).join("")}<h2>${escapeHtml(copy.inclusions)}</h2><ul>${order.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>${notes.map(note => `<p>${escapeHtml(note)}</p>`).join("")}`,
  };
}

/** Uses the existing Zevitech business-mailbox configuration; never accepts a client recipient. */
export async function sendShopifyOrderNotification(message: ShopifyOrderNotification): Promise<void> {
  const user = process.env.EMAIL_USER?.trim();
  const recipient = (process.env.BUSINESS_EMAIL || process.env.EMAIL_USER)?.trim();
  const password = process.env.EMAIL_PASSWORD;
  if (!user || !password || !recipient) throw new Error("ORDER_NOTIFICATION_UNAVAILABLE");
  const port = Number(process.env.EMAIL_PORT || "587");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("ORDER_NOTIFICATION_UNAVAILABLE");
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com", port, secure: port === 465,
    auth: { user, pass: password }, connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 8000,
  });
  try {
    const result = await transport.sendMail({
      from: user, to: recipient, subject: message.subject, text: message.text, html: message.html,
      messageId: `<shopify-${message.orderId}@zevitech.com>`, disableFileAccess: true, disableUrlAccess: true,
    });
    if (!result.accepted?.length) throw new Error("ORDER_NOTIFICATION_UNCONFIRMED");
  } finally { transport.close(); }
}

/** A notification failure never alters a confirmed payment or unlocks another charge. */
export async function notifyPaidShopifyOrder(
  order: ShopifyCheckoutOrder,
  store: CheckoutStore,
  sender: (message: ShopifyOrderNotification) => Promise<void> = sendShopifyOrderNotification,
): Promise<void> {
  if (order.mode !== "live" || order.status !== "paid" || !/^[1-9][0-9]*$/.test(order.transactionId || "")
    || !store.claimNotification || !store.finishNotification) return;
  let claimed = false;
  try {
    claimed = await store.claimNotification(order.id);
    if (!claimed) return;
    await sender(renderShopifyOrderNotification(order));
    await store.finishNotification(order.id, true);
  } catch {
    // A provider error can follow delivery. Record for manual review, not automatic resend.
    if (claimed) await store.finishNotification(order.id, false).catch(() => undefined);
  }
}
