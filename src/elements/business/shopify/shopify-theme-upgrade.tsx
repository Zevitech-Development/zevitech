"use client";
import { Check, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ShopifyDeliveryEstimate from "./shopify-delivery-estimate";
import { themeUpgradeCopy as copy } from "@/content/landing/shopify-theme-upgrade-content";
import { studioCopy } from "@/content/landing/shopify-studio-content";
import { getThemeTierByPackage } from "@/lib/shopify-theme-access";
import type { ShopifyThemeUpgradeProps } from "@/interfaces/shopify-theme-upgrade-interface";
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
export default function ShopifyThemeUpgrade({ plans, currentIndex, pending, onConfirm, onCancel }: ShopifyThemeUpgradeProps) {
  const current = plans[currentIndex];
  const next = pending ? plans[pending.packageIndex] : null;
  const tier = next ? getThemeTierByPackage(next.name) : null;
  return <Dialog open={!!pending} onOpenChange={open => { if (!open) onCancel(); }}>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl p-5 sm:p-6 [&>button]:h-11 [&>button]:w-11">
      <DialogHeader><DialogTitle>{copy.title}</DialogTitle><DialogDescription>{copy.body}</DialogDescription></DialogHeader>
      {pending && next && <>
        <div className="rounded-xl bg-mix-primary/5 p-4"><p className="text-xs font-semibold text-primary">{copy.theme}</p><p className="mt-1 font-heading text-xl">{pending.label}</p><p className="mt-2 text-sm text-paragraph">{tier?.description}</p></div>
        <dl className="space-y-3 rounded-xl border border-border p-4 text-sm">
          <div className="flex flex-wrap justify-between gap-2"><dt>{copy.current}</dt><dd>{current.name} · {money(current.price)}</dd></div>
          <div className="flex flex-wrap justify-between gap-2"><dt>{copy.proposed}</dt><dd className="font-semibold">{next.name} · {money(next.price)}</dd></div>
          <div className="flex flex-wrap justify-between gap-2 border-t border-border pt-3"><dt>{copy.difference}</dt><dd className="font-semibold text-primary">+{money(next.price-current.price)}</dd></div>
        </dl>
        <ShopifyDeliveryEstimate packageName={next.name} showNote />
        <p className="text-sm text-paragraph">{tier?.customization}</p>
        <ul className="space-y-2 text-sm">{next.additions.slice(0, 4).map(feature => <li className="flex items-start gap-2" key={feature}><Check size={16} className="mt-1 shrink-0 text-primary" aria-hidden="true" /><span>{feature}</span></li>)}</ul>
        <p className="text-xs leading-relaxed text-paragraph">{studioCopy.billing}</p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="min-h-12 rounded-lg border border-border px-4 py-3 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-primary">{copy.cancel}</button>
          <button type="button" onClick={onConfirm} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary">{copy.confirm}<ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </>}
    </DialogContent>
  </Dialog>;
}
