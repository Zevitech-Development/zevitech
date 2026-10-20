import { shopifyPaymentCopy as copy } from "@/content/landing/shopify-payment-content";
import type { ShopifyPaymentScheduleProps } from "@/interfaces/shopify-payment-schedule-interface";
import { getShopifyPaymentSchedule } from "@/lib/shopify-payment-schedule";
import { cn } from "@/lib/utils";

const money = (amount: number) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD",
}).format(amount);

export default function ShopifyPaymentSchedule({ total, compact = false, highlight = false, className }: ShopifyPaymentScheduleProps) {
  const payment = getShopifyPaymentSchedule(total);
  if (compact) return (
    <span className={cn("block text-xs leading-relaxed text-paragraph", highlight && "rounded-lg bg-primary/10 px-3 py-2", className)}>
      <span className={cn("font-semibold", highlight ? "text-primary" : "text-heading")}>{copy.upfront}: {money(payment.upfront)}</span>
      {" · "}{copy.balance}: {money(payment.balance)}
    </span>
  );
  return (
    <dl className={cn("grid gap-3 rounded-xl bg-muted p-4 text-sm sm:grid-cols-2", className)}>
      <div><dt className="text-paragraph">{copy.upfront}</dt><dd className="mt-1 text-xl font-semibold text-heading">{money(payment.upfront)} USD</dd></div>
      <div><dt className="text-paragraph">{copy.balance}</dt><dd className="mt-1 text-xl font-semibold text-heading">{money(payment.balance)} USD</dd></div>
    </dl>
  );
}
