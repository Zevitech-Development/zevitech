import { randomUUID } from "node:crypto";
import { hashCheckoutValue, resolveCheckoutRedisConfig } from "./shopify-checkout-store";
import type { ShopifyLeadType } from "@/schemas/shopify-lead-schema";

export interface StoredShopifyLead { id: string; lead: ShopifyLeadType; createdAt: string }
export interface ShopifyLeadStore {
  save(lead: ShopifyLeadType): Promise<StoredShopifyLead>;
  pending(): Promise<StoredShopifyLead[]>;
  claim(id: string): Promise<boolean>;
  finish(id: string, sent: boolean): Promise<void>;
}
/** Dedicated Zevitech Redis, 30-day retention, pending-email queue and a short delivery lease. */
export function createShopifyLeadStore(): ShopifyLeadStore {
  const config = resolveCheckoutRedisConfig();
  if (!config) throw new Error("LEAD_STORAGE_UNAVAILABLE");
  const prefix = "zevitech:shopify-lead:v1:";
  const queue = `${prefix}pending`;
  async function command<T>(args: (string | number)[]): Promise<T> {
    const response = await fetch(config!.url, { method: "POST", headers: { Authorization: `Bearer ${config!.token}`, "Content-Type": "application/json" }, body: JSON.stringify(args), cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("LEAD_STORAGE_UNAVAILABLE");
    const body = await response.json() as { result: T; error?: string };
    if (body.error) throw new Error("LEAD_STORAGE_UNAVAILABLE");
    return body.result;
  }
  return {
    async save(lead) {
      const record = { id: `lead-${randomUUID()}`, lead, createdAt: new Date().toISOString() };
      const dedup = `${prefix}dedup:${hashCheckoutValue(JSON.stringify(lead))}`;
      const raw = await command<string>(["EVAL", `
        local old = redis.call('GET', KEYS[1])
        if old then local stored = redis.call('GET', ARGV[3] .. old); if stored then return stored end end
        redis.call('SET', KEYS[1], ARGV[1], 'EX', 86400)
        redis.call('SET', ARGV[3] .. ARGV[1], ARGV[2], 'EX', 2592000)
        redis.call('ZADD', KEYS[2], ARGV[4], ARGV[1])
        return ARGV[2]`, 2, dedup, queue, record.id, JSON.stringify(record), prefix, Date.now()]);
      return JSON.parse(raw);
    },
    async pending() {
      const ids = await command<string[]>(["ZRANGE", queue, 0, 9]);
      const records: StoredShopifyLead[] = [];
      for (const id of ids) {
        const raw = await command<string | null>(["GET", `${prefix}${id}`]);
        if (raw) records.push(JSON.parse(raw));
        else await command(["ZREM", queue, id]);
      }
      return records;
    },
    async claim(id) {
      return await command<number>(["EVAL", `
        if not redis.call('ZSCORE', KEYS[1], ARGV[1]) then return 0 end
        if redis.call('SET', KEYS[2], 'sending', 'NX', 'EX', 120) then return 1 end
        return 0`, 2, queue, `${prefix}lease:${id}`, id]) === 1;
    },
    async finish(id, sent) {
      await command(["EVAL", `
        if ARGV[2] == '1' then redis.call('ZREM', KEYS[1], ARGV[1])
        else redis.call('ZADD', KEYS[1], ARGV[3], ARGV[1]) end
        redis.call('DEL', KEYS[2]); return 1`, 2, queue, `${prefix}lease:${id}`, id, sent ? "1" : "0", Date.now()]);
    },
  };
}
