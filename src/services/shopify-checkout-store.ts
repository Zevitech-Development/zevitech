import { createHash, timingSafeEqual } from "node:crypto";
import type { ShopifyCheckoutAttribution, ShopifyCheckoutPublicOrder } from "@/interfaces/shopify-checkout-interface";
import type { ShopifyCheckoutValidatedBrief } from "@/schemas/shopify-checkout-schema";

type PaymentScheduleFields = "totalAmount" | "upfrontAmount" | "balanceAmount" | "amountPaid" | "paymentStage" | "paymentVersion";

// Older records predate instalments. Their original amount remains authoritative
// for reconciliation; uncharged legacy records must start a new deposit checkout.
export interface ShopifyCheckoutOrder extends Omit<ShopifyCheckoutPublicOrder, PaymentScheduleFields>, Partial<Pick<ShopifyCheckoutPublicOrder, PaymentScheduleFields>> {
  accessHash: string;
  briefHash: string;
  brief: ShopifyCheckoutValidatedBrief;
  attribution?: ShopifyCheckoutAttribution;
  features: string[];
  productLimit: number;
  createdAt: string;
  updatedAt: string;
  consentVersion: string;
  attempts: number;
  attemptId?: string;
  gatewayCode?: string;
  operatorNotification?: { status: "processing" | "sent" | "failed"; updatedAt: string };
}

export interface CheckoutStore {
  create(order: ShopifyCheckoutOrder): Promise<ShopifyCheckoutOrder>;
  get(id: string): Promise<ShopifyCheckoutOrder | null>;
  claim(id: string, tokenHash: string, attemptId: string): Promise<boolean>;
  finish(id: string, attemptId: string, patch: Partial<ShopifyCheckoutOrder>): Promise<void>;
  cancel(id: string): Promise<boolean>;
  rateLimit(key: string, limit: number, seconds: number): Promise<boolean>;
  claimNotification?(id: string): Promise<boolean>;
  finishNotification?(id: string, success: boolean): Promise<void>;
}

export const hashCheckoutValue = (value: string) => createHash("sha256").update(value).digest("hex");
export function checkoutAccessMatches(order: ShopifyCheckoutOrder, token: string) {
  const expected = Buffer.from(order.accessHash, "hex");
  const actual = Buffer.from(hashCheckoutValue(token), "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function resolveCheckoutRedisConfig(env: Record<string, string | undefined> = process.env) {
  // Prefer an explicit dedicated pair. Never mix a URL and token from different
  // integrations or fall back to an unrelated project's generic KV credentials.
  const explicit = env.SHOPIFY_CHECKOUT_REDIS_REST_URL !== undefined || env.SHOPIFY_CHECKOUT_REDIS_REST_TOKEN !== undefined;
  const url = (explicit ? env.SHOPIFY_CHECKOUT_REDIS_REST_URL : env.SHOPIFY_CHECKOUT_KV_REST_API_URL)?.trim();
  const token = (explicit ? env.SHOPIFY_CHECKOUT_REDIS_REST_TOKEN : env.SHOPIFY_CHECKOUT_KV_REST_API_TOKEN)?.trim();
  if (!url || !token) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== "/") return null;
    return { url: parsed.origin, token };
  } catch { return null; }
}

// Only a dedicated Zevitech datastore is used. No local-file fallback on Vercel:
// the order and atomic charge reservation must survive process restarts.
export function createCheckoutStore(): CheckoutStore {
  const config = resolveCheckoutRedisConfig();
  if (!config) throw new Error("CHECKOUT_STORAGE_UNAVAILABLE");
  const { url, token } = config;
  const key = (id: string) => `zevitech:shopify-checkout:v1:order:${id}`;
  async function command<T>(args: (string | number)[]): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(args), cache: "no-store", signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("CHECKOUT_STORAGE_UNAVAILABLE");
    const payload = await response.json() as { result: T; error?: string };
    if (payload.error) throw new Error("CHECKOUT_STORAGE_UNAVAILABLE");
    return payload.result;
  }
  return {
    async get(id) {
      const raw = await command<string | null>(["GET", key(id)]);
      return raw ? JSON.parse(raw) as ShopifyCheckoutOrder : null;
    },
    async create(order) {
      const raw = await command<string>(["EVAL", `
        local existing = redis.call('GET', KEYS[1])
        if existing then return existing end
        redis.call('SET', KEYS[1], ARGV[1], 'EX', 604800)
        return ARGV[1]`, 1, key(order.id), JSON.stringify(order)]);
      return JSON.parse(raw) as ShopifyCheckoutOrder;
    },
    async claim(id, tokenHash, attemptId) {
      const result = await command<number>(["EVAL", `
        local raw = redis.call('GET', KEYS[1])
        if not raw then return 0 end
        local order = cjson.decode(raw)
        if order.status ~= 'created' and order.status ~= 'declined' then return 0 end
        if order.attempts >= 3 or redis.call('EXISTS', KEYS[2]) == 1 then return 0 end
        order.status = 'processing'; order.attemptId = ARGV[1]
        order.attempts = order.attempts + 1; order.updatedAt = ARGV[2]
        redis.call('SET', KEYS[2], 'used', 'EX', 2592000)
        redis.call('SET', KEYS[1], cjson.encode(order))
        return 1`, 2, key(id), `zevitech:shopify-checkout:v1:token:${tokenHash}`, attemptId, new Date().toISOString()]);
      return result === 1;
    },
    async finish(id, attemptId, patch) {
      const result = await command<number>(["EVAL", `
        local raw = redis.call('GET', KEYS[1])
        if not raw then return 0 end
        local order = cjson.decode(raw)
        if order.attemptId ~= ARGV[1] or order.status == 'paid' then return 0 end
        local patch = cjson.decode(ARGV[2])
        for field, value in pairs(patch) do order[field] = value end
        redis.call('SET', KEYS[1], cjson.encode(order))
        return 1`, 1, key(id), attemptId, JSON.stringify({ ...patch, updatedAt: new Date().toISOString() })]);
      if (result !== 1) {
        const current = await this.get(id);
        if (current?.status !== "paid") throw new Error("CHECKOUT_STATE_NOT_SAVED");
      }
    },
    async cancel(id) {
      const result = await command<number>(["EVAL", `
        local raw = redis.call('GET', KEYS[1])
        if not raw then return 0 end
        local order = cjson.decode(raw)
        if order.status ~= 'created' and order.status ~= 'declined' then return 0 end
        order.status = 'cancelled'; order.updatedAt = ARGV[1]
        redis.call('SET', KEYS[1], cjson.encode(order), 'EX', 604800)
        return 1`, 1, key(id), new Date().toISOString()]);
      return result === 1;
    },
    async rateLimit(rateKey, limit, seconds) {
      const value = await command<number>(["EVAL", `
        local count = redis.call('INCR', KEYS[1])
        if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
        return count`, 1, `zevitech:shopify-checkout:v1:rate:${rateKey}`, seconds]);
      return value <= limit;
    },
    async claimNotification(id) {
      const result = await command<number>(["EVAL", `
        local raw = redis.call('GET', KEYS[1])
        if not raw then return 0 end
        local order = cjson.decode(raw)
        if order.status ~= 'paid' or not order.transactionId or order.operatorNotification then return 0 end
        order.operatorNotification = {status = 'processing', updatedAt = ARGV[1]}
        redis.call('SET', KEYS[1], cjson.encode(order))
        return 1`, 1, key(id), new Date().toISOString()]);
      return result === 1;
    },
    async finishNotification(id, success) {
      await command<number>(["EVAL", `
        local raw = redis.call('GET', KEYS[1])
        if not raw then return 0 end
        local order = cjson.decode(raw)
        if order.status ~= 'paid' or not order.operatorNotification or order.operatorNotification.status ~= 'processing' then return 0 end
        order.operatorNotification = {status = ARGV[1], updatedAt = ARGV[2]}
        redis.call('SET', KEYS[1], cjson.encode(order))
        return 1`, 1, key(id), success ? "sent" : "failed", new Date().toISOString()]);
    },
  };
}
