import { XMLParser, XMLValidator } from "fast-xml-parser";
import type { ShopifyCheckoutPayment } from "@/schemas/shopify-checkout-schema";
import type { ShopifyCheckoutOrder } from "@/services/shopify-checkout-store";
import { getShopifyPaymentSchedule, SHOPIFY_PAYMENT_VERSION } from "@/lib/shopify-payment-schedule";

export interface NmiPaymentResult {
  status: "paid" | "declined" | "pending";
  transactionId?: string;
  gatewayCode?: string;
  gatewayIssue?: "duplicate";
}
export interface ShopifyCheckoutGateway {
  charge(order: ShopifyCheckoutOrder, input: ShopifyCheckoutPayment): Promise<NmiPaymentResult>;
  reconcile(order: ShopifyCheckoutOrder): Promise<NmiPaymentResult>;
}

// NMI distinguishes hard rejections from transport/duplicate/processor uncertainty.
// https://docs.nmi.com/reference/response-codes
export function isDefiniteNmiRejection(code: string): boolean {
  return /^2\d{2}$/.test(code) || ["300", "410", "411", "440", "441", "460", "461"].includes(code);
}
function duplicateRejection(text: string) {
  return /duplicate (?:transaction|payment)|already (?:processed|charged)/i.test(text);
}
function ambiguousRejectionText(text: string) {
  return duplicateRejection(text) || /timed?\s*out|timeout|communication|unknown status/i.test(text);
}
export function parseNmiChargeResponse(body: string): NmiPaymentResult {
  const values = new URLSearchParams(body);
  const code = values.get("response_code") || "";
  const transactionId = values.get("transactionid") || "";
  if (values.get("response") === "1" && code === "100" && Number(values.get("partial_payment_balance") || "0") === 0 && /^[1-9][0-9]*$/.test(transactionId)) {
    return { status: "paid", transactionId, gatewayCode: code };
  }
  // A duplicate rejection is a final failure of THIS submission, not a payment
  // still running. Keep retries blocked because an earlier payment may exist.
  if (["2", "3"].includes(values.get("response") || "") && ["300", "430"].includes(code)
    && duplicateRejection(values.get("responsetext") || "")) {
    return { status: "declined", gatewayCode: code, gatewayIssue: "duplicate" };
  }
  if (["2", "3"].includes(values.get("response") || "") && isDefiniteNmiRejection(code)
    && !ambiguousRejectionText(values.get("responsetext") || "")) {
    return { status: "declined", gatewayCode: code };
  }
  return { status: "pending", gatewayCode: /^\d{3}$/.test(code) ? code : undefined };
}

export function parseNmiQueryResponse(body: string, order: ShopifyCheckoutOrder): NmiPaymentResult {
  if (body.length > 1_000_000 || /<!DOCTYPE|<!ENTITY/i.test(body) || XMLValidator.validate(body) !== true) return { status: "pending" };
  const parsed = new XMLParser({ parseTagValue: false, processEntities: false }).parse(body);
  const found = parsed?.nm_response?.transaction;
  const transactions: Record<string, unknown>[] = Array.isArray(found) ? found : found ? [found] : [];
  const matching = transactions.filter((transaction) => transaction.order_id === (order.gatewayOrderId || order.id));
  const approved = matching.filter((transaction) => ["pendingsettlement", "complete"].includes(String(transaction.condition)));
  if (approved.length === 1) {
    const transaction = approved[0];
    const actions = Array.isArray(transaction.action) ? transaction.action : transaction.action ? [transaction.action] : [];
    if (actions.some((action) => ["refund", "void", "return"].includes(String(action.action_type)) && String(action.success) === "1")) return { status: "pending" };
    const successfulSale = actions.find((action) => action.action_type === "sale" && String(action.success) === "1" && Number(action.amount) === order.amount);
    if (successfulSale && transaction.currency === "USD" && /^[1-9][0-9]*$/.test(String(transaction.transaction_id))) {
      return { status: "paid", transactionId: String(transaction.transaction_id), gatewayCode: "100" };
    }
  }
  // An old decline must not unlock a newer, still-ambiguous attempt. New attempts
  // use unique gateway order IDs. Legacy recovery is limited to one first attempt.
  if (approved.length === 0 && matching.length === 1 && (order.gatewayOrderId || order.attempts === 1)) {
    const transaction = matching[0];
    const actions = Array.isArray(transaction.action) ? transaction.action : transaction.action ? [transaction.action] : [];
    const sales = actions.filter((action) => action.action_type === "sale");
    const sale = sales[0];
    const code = String(sale?.response_code || "");
    if (transaction.condition === "failed" && transaction.currency === "USD" && sales.length === 1
      && String(sale.success) === "0" && Number(sale.amount) === order.amount
      && !actions.some((action) => String(action.success) === "1")
      && isDefiniteNmiRejection(code) && !ambiguousRejectionText(String(sale.response_text || ""))) {
      return { status: "declined", gatewayCode: code };
    }
  }
  // Empty results, communication failures and duplicate responses prove no outcome.
  return { status: "pending" };
}

export function createNmiCheckoutGateway(): ShopifyCheckoutGateway {
  const mode = process.env.SHOPIFY_CHECKOUT_MODE;
  const secret = process.env.NMI_SECURITY_KEY;
  if (!secret || !["live", "sandbox"].includes(mode || "")) throw new Error("CHECKOUT_GATEWAY_UNAVAILABLE");
  const origin = mode === "live" ? "https://secure.nmi.com" : "https://sandbox.nmi.com";
  async function post(path: string, params: URLSearchParams) {
    params.set("security_key", secret!);
    const response = await fetch(`${origin}${path}`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: params, cache: "no-store", signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error("GATEWAY_RESULT_UNCONFIRMED");
    return response.text();
  }
  return {
    async charge(order, input) {
      const schedule = getShopifyPaymentSchedule(order.totalAmount ?? 0);
      if (order.paymentVersion !== SHOPIFY_PAYMENT_VERSION || order.paymentStage !== "upfront"
        || order.amount !== schedule.upfront || order.upfrontAmount !== schedule.upfront
        || order.balanceAmount !== schedule.balance || order.currency !== "USD") {
        throw new Error("PAYMENT_TERMS_CHANGED");
      }
      const params = new URLSearchParams({
        type: "sale", amount: order.amount.toFixed(2), currency: "USD",
        payment_token: input.paymentToken, orderid: order.gatewayOrderId || order.id,
        order_description: `Zevitech Shopify development - ${order.packageName} - 10% upfront payment`,
        first_name: input.billing.firstName, last_name: input.billing.lastName,
        email: order.brief.business.email, address1: input.billing.address,
        city: input.billing.city, state: input.billing.state, zip: input.billing.postalCode,
        country: input.billing.country, customer_receipt: "true",
      });
      const result = parseNmiChargeResponse(await post("/api/transact.php", params));
      if (result.status !== "paid") console.warn("[shopify-checkout] Gateway outcome", {
        status: result.status, code: result.gatewayCode, issue: result.gatewayIssue || "none",
      });
      return result;
    },
    async reconcile(order) {
      return parseNmiQueryResponse(await post("/api/query.php", new URLSearchParams({ order_id: order.gatewayOrderId || order.id, action_type: "sale" })), order);
    },
  };
}
