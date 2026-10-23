import { randomUUID } from "node:crypto";
import { studioPlans } from "@/content/landing/shopify-studio-content";
import { templateCopy } from "@/content/landing/shopify-studio-templates";
import type { ShopifyCheckoutPublicOrder } from "@/interfaces/shopify-checkout-interface";
import { shopifyPackageMatchesNeeds } from "@/lib/shopify-package-recommendation";
import { getShopifyPaymentSchedule, SHOPIFY_PAYMENT_VERSION, SHOPIFY_LEGACY_PAYMENT_VERSION } from "@/lib/shopify-payment-schedule";
import { canUseThemeLayout, canUseShopifyCustomizations, getThemeLayoutFromLabel } from "@/lib/shopify-theme-access";
import { ShopifyCheckoutBriefSchema, ShopifyCheckoutCreateSchema, type ShopifyCheckoutPayment, type ShopifyCheckoutValidatedBrief } from "@/schemas/shopify-checkout-schema";
import { checkoutAccessMatches, hashCheckoutValue, type CheckoutStore, type ShopifyCheckoutOrder } from "@/services/shopify-checkout-store";
import { isDefiniteNmiRejection, type ShopifyCheckoutGateway } from "@/services/shopify-checkout-nmi";
import { notifyPaidShopifyOrder } from "@/services/shopify-checkout-notifications";

export class ShopifyCheckoutError extends Error {
  constructor(public code: string, public status: number) { super(code); }
}

export function publicCheckoutOrder(order: ShopifyCheckoutOrder): ShopifyCheckoutPublicOrder {
  const isUpfront = (order.paymentVersion === SHOPIFY_PAYMENT_VERSION || order.paymentVersion === "upfront-10-v2" || order.paymentVersion === "upfront-40-v1") && order.paymentStage === "upfront";
  return {
    id: order.id, status: order.status, packageName: order.packageName, amount: order.amount,
    totalAmount: isUpfront ? order.totalAmount! : order.amount,
    upfrontAmount: isUpfront ? order.upfrontAmount! : 0,
    balanceAmount: isUpfront ? order.balanceAmount! : 0,
    amountPaid: order.status === "paid" ? order.amount : 0,
    paymentStage: isUpfront ? "upfront" : "full",
    paymentVersion: isUpfront ? order.paymentVersion! : SHOPIFY_LEGACY_PAYMENT_VERSION,
    ...(order.status === "declined" && isDefiniteNmiRejection(order.gatewayCode || "") ? { declineCode: order.gatewayCode } : {}),
    ...(order.gatewayIssue === "duplicate" ? { gatewayIssue: "duplicate" as const } : {}),
    ...(["pending", "processing"].includes(order.status) && Number.isFinite(Date.parse(order.updatedAt))
      ? { verificationEndsAt: new Date(Date.parse(order.updatedAt) + 120000).toISOString() } : {}),
    retryAllowed: order.gatewayIssue !== "duplicate" && order.attempts < 3 && !["410", "411", "460"].includes(order.gatewayCode || ""),
    currency: order.currency, mode: order.mode, transactionId: order.transactionId, briefFingerprint: order.briefHash,
  };
}

function currentPaymentScheduleMatches(order: ShopifyCheckoutOrder, packageTotal: number) {
  const schedule = getShopifyPaymentSchedule(packageTotal);
  return order.paymentStage === "upfront" && order.paymentVersion === SHOPIFY_PAYMENT_VERSION
    && order.amount === schedule.upfront && order.totalAmount === schedule.total
    && order.upfrontAmount === schedule.upfront && order.balanceAmount === schedule.balance;
}

function eligibleCheckoutPlan(brief: ShopifyCheckoutValidatedBrief) {
  const planIndex = studioPlans.findIndex(plan => plan.name === brief.package.name);
  const plan = studioPlans[planIndex];
  const layouts = [
    brief.needs.designLayout,
    getThemeLayoutFromLabel(brief.design.layout),
    getThemeLayoutFromLabel(brief.design.template),
  ].filter((layout): layout is number => layout !== undefined && layout !== null);
  const customizationIds: string[] = [...(brief.needs.customizationIds ?? [])];
  if (brief.design.palette.trim().toLowerCase() === templateCopy.customPalette.toLowerCase()) {
    customizationIds.push("customPalette");
  }
  // Recompute scope from the catalogue; neither a client flag nor omitted optional IDs grant access.
  if (!plan || brief.business.projectType !== "New store" || brief.business.requirements.trim()
    || !shopifyPackageMatchesNeeds(studioPlans, planIndex, brief.needs.productCount, brief.needs.featureIds)
    || !layouts.every(layout => canUseThemeLayout(plan.name, layout))
    || !canUseShopifyCustomizations(plan.name, customizationIds)) {
    throw new ShopifyCheckoutError("SCOPE_REVIEW_REQUIRED", 409);
  }
  return plan;
}

export async function createShopifyCheckoutOrder(payload: unknown, store: CheckoutStore, mode: "sandbox" | "live") {
  const parsed = ShopifyCheckoutCreateSchema.safeParse(payload);
  if (!parsed.success) throw new ShopifyCheckoutError("INVALID_DETAILS", 400);
  const { brief, requestId, accessToken, attribution } = parsed.data;
  const plan = eligibleCheckoutPlan(brief);
  const schedule = getShopifyPaymentSchedule(plan.price);
  const now = new Date().toISOString();
  const order: ShopifyCheckoutOrder = {
    id: `ZVT-${requestId.replaceAll("-", "")}`,
    status: "created", packageName: plan.name, amount: schedule.upfront, currency: "USD", mode,
    totalAmount: schedule.total, upfrontAmount: schedule.upfront, balanceAmount: schedule.balance,
    amountPaid: 0, paymentStage: "upfront", paymentVersion: SHOPIFY_PAYMENT_VERSION,
    accessHash: hashCheckoutValue(accessToken), briefHash: hashCheckoutValue(JSON.stringify(brief)), briefFingerprint: hashCheckoutValue(JSON.stringify(brief)), brief,
    features: [...plan.features], productLimit: plan.products, createdAt: now, updatedAt: now,
    consentVersion: "shopify-development-10-upfront-delivery-2026-10-23", attempts: 0,
    ...(attribution && Object.keys(attribution).length ? { attribution } : {}),
  };
  const saved = await store.create(order);
  if (!checkoutAccessMatches(saved, accessToken) || saved.briefHash !== order.briefHash || saved.mode !== mode) throw new ShopifyCheckoutError("CHECKOUT_ALREADY_EXISTS", 409);
  // Never overwrite an earlier charge or let an old full-price session be reused
  // under new terms. A paid/pending legacy receipt remains recoverable by status.
  if (!currentPaymentScheduleMatches(saved, plan.price)) throw new ShopifyCheckoutError("PAYMENT_TERMS_CHANGED", 409);
  return publicCheckoutOrder(saved);
}

export async function authorizedCheckoutOrder(id: string, token: string, store: CheckoutStore) {
  const order = await store.get(id);
  if (!order || !checkoutAccessMatches(order, token)) throw new ShopifyCheckoutError("ORDER_NOT_FOUND", 404);
  return order;
}

export async function payShopifyCheckout(input: ShopifyCheckoutPayment, store: CheckoutStore, gateway: ShopifyCheckoutGateway, mode: "sandbox" | "live") {
  let order = await authorizedCheckoutOrder(input.orderId, input.accessToken, store);
  if (order.mode !== mode) throw new ShopifyCheckoutError("CHECKOUT_MODE_CHANGED", 409);
  if (order.status === "paid" || order.status === "processing" || order.status === "pending") {
    await notifyPaidShopifyOrder(order, store);
    return publicCheckoutOrder(order);
  }
  if (order.gatewayIssue === "duplicate") throw new ShopifyCheckoutError("PAYMENT_RETRY_BLOCKED", 409);
  if (order.status === "cancelled") throw new ShopifyCheckoutError("CHECKOUT_CANCELLED", 409);
  if (input.briefFingerprint !== order.briefHash) throw new ShopifyCheckoutError("CHECKOUT_BRIEF_CHANGED", 409);
  // Validate legacy and resumed uncharged orders before claiming a token or contacting a gateway.
  const parsedBrief = ShopifyCheckoutBriefSchema.safeParse(order.brief);
  if (!parsedBrief.success) throw new ShopifyCheckoutError("INVALID_DETAILS", 400);
  const plan = eligibleCheckoutPlan(parsedBrief.data);
  if (order.packageName !== plan.name || order.currency !== "USD") {
    throw new ShopifyCheckoutError("SCOPE_REVIEW_REQUIRED", 409);
  }
  if (!currentPaymentScheduleMatches(order, plan.price)) throw new ShopifyCheckoutError("PAYMENT_TERMS_CHANGED", 409);
  const attemptId = randomUUID();
  const claimed = await store.claim(order.id, hashCheckoutValue(input.paymentToken), attemptId);
  if (!claimed) {
    order = await authorizedCheckoutOrder(input.orderId, input.accessToken, store);
    if (["paid", "processing", "pending"].includes(order.status)) return publicCheckoutOrder(order);
    throw new ShopifyCheckoutError("PAYMENT_RETRY_BLOCKED", 409);
  }
  let result;
  try {
    order = await authorizedCheckoutOrder(order.id, input.accessToken, store);
    result = await gateway.charge(order, input);
  } catch {
    result = { status: "pending" as const };
  }
  // If persistence fails after a charge, keep processing locked. Status reconciliation
  // can recover by immutable order_id; a failed save never permits a second charge.
  await store.finish(order.id, attemptId, { ...result, amountPaid: result.status === "paid" ? order.amount : 0 });
  const finished = (await store.get(order.id))!;
  await notifyPaidShopifyOrder(finished, store);
  return publicCheckoutOrder(finished);
}

export async function cancelShopifyCheckout(id: string, token: string, store: CheckoutStore) {
  const order = await authorizedCheckoutOrder(id, token, store);
  if (!await store.cancel(order.id)) throw new ShopifyCheckoutError("PAYMENT_RETRY_BLOCKED", 409);
  return publicCheckoutOrder((await store.get(id))!);
}

export async function checkShopifyCheckout(id: string, token: string, store: CheckoutStore, gateway: ShopifyCheckoutGateway, mode: "sandbox" | "live") {
  let order = await authorizedCheckoutOrder(id, token, store);
  if (order.mode !== mode) throw new ShopifyCheckoutError("CHECKOUT_MODE_CHANGED", 409);
  if (["pending", "processing"].includes(order.status) && order.attemptId && Date.now() - Date.parse(order.updatedAt) > 25000) {
    const result = await gateway.reconcile(order).catch(() => ({ status: "pending" as const }));
    if (result.status === "pending") {
      // Numeric status only: never log billing data, tokens or raw gateway responses.
      console.warn("[shopify-checkout] Payment still unconfirmed", { orderId: order.id, gatewayCode: order.gatewayCode, attempts: order.attempts });
    }
    if (result.status === "paid" || result.status === "declined") {
      await store.finish(order.id, order.attemptId, { ...result, amountPaid: result.status === "paid" ? order.amount : 0 });
      order = (await store.get(order.id))!;
    }
  }
  await notifyPaidShopifyOrder(order, store);
  return publicCheckoutOrder(order);
}
