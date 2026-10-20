"use client";
import { useState } from "react";
import ShopifyStudioSelect from "./shopify-studio-select";
import ShopifyPaymentSchedule from "./shopify-payment-schedule";
import { ShopifyStudioProps } from "@/interfaces/shopify-studio-interface";
import { comparisonCopy as c } from "@/content/landing/shopify-studio-comparison";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
  maximumFractionDigits: 0,
});
export default function ShopifyPackageComparison({
  plans,
}: Pick<ShopifyStudioProps, "plans">) {
  const [left, setLeft] = useState(0),
    [right, setRight] = useState(4);
  return (
    <details className="rounded-2xl border border-border bg-background mb-6 group min-w-0 [overflow-wrap:anywhere]">
      <summary className="min-h-12 cursor-pointer rounded-2xl p-4 md:p-5 font-heading text-lg md:text-xl leading-snug text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        {c.title}
      </summary>
      <div className="px-4 pb-4 md:px-5 md:pb-5">
        <p className="text-sm text-paragraph mb-5">{c.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {[
            { value: left, set: setLeft, label: c.left },
            { value: right, set: setRight, label: c.right },
          ].map((x) => (
            <label key={x.label} className="text-sm font-medium min-w-0">
              {x.label}
              <ShopifyStudioSelect
                aria-label={x.label}
                value={x.value}
                onChange={(e) => x.set(Number(e.target.value))}
                wrapperClassName="mt-2"
              >
                {plans.map((p, i) => (
                  <option key={p.name} value={i}>
                    {p.name} · ${p.price.toLocaleString()}
                  </option>
                ))}
              </ShopifyStudioSelect>
            </label>
          ))}
        </div>
        {left === right ? (
          <p role="status">{c.same}</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              {[left, right].map((index) => (
                <div key={index} className="min-w-0 rounded-xl bg-muted p-3 md:bg-transparent md:p-0">
                  <p className="font-heading text-xl text-heading">{plans[index].name}</p>
                  <p className="mt-1 text-sm text-paragraph">
                    {c.total}: {priceFormatter.format(plans[index].price)}
                  </p>
                  <ShopifyPaymentSchedule total={plans[index].price} compact className="mt-2" />
                </div>
              ))}
            </div>
            {c.rows.map((r) => (
              <div key={r.label} className="border-t border-border py-4">
                <h4 className="text-xs uppercase tracking-widest text-paragraph mb-2">
                  {r.label}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                  {[left, right].map((index) => (
                    <p key={index} className="min-w-0 text-sm font-medium leading-relaxed rounded-lg bg-muted p-3 md:bg-transparent md:p-0">
                      <span className="block mb-1 text-xs font-semibold text-primary md:sr-only">{plans[index].name}</span>
                      {r.values[index]}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-paragraph leading-relaxed bg-muted p-4 rounded-lg mt-3">
          {c.note}
        </p>
      </div>
    </details>
  );
}
