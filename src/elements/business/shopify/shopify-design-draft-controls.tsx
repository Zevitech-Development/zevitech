"use client";

import { Bookmark, ArrowRight, Trash2 } from "lucide-react";
import { designDraftCopy as copy } from "@/content/landing/shopify-design-draft-content";
import type { ShopifyDesignDraftControlsProps } from "@/interfaces/shopify-design-draft-interface";
import { cn } from "@/lib/utils";

export default function ShopifyDesignDraftControls({saved, canSave, notice, onSave, onResume, onRemove}: ShopifyDesignDraftControlsProps) {
  if (!saved && !canSave && !notice) return null;
  const action = "min-h-11 rounded-lg px-3 py-2 text-sm font-semibold inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
  return <aside className="mb-5 rounded-xl border border-border bg-background p-4 md:p-5">
    {saved && !canSave && <div className="mb-3"><p className="font-semibold text-heading">{copy.title}</p><p className="mt-1 text-sm text-paragraph">{copy.intro}</p></div>}
    <div className="flex flex-wrap items-center gap-2">
      {canSave && <button type="button" className={cn(action, "border border-border text-heading")} onClick={onSave}><Bookmark size={16} aria-hidden="true" />{saved ? copy.update : copy.save}</button>}
      {saved && <><button type="button" className={cn(action, "bg-primary text-primary-foreground")} onClick={onResume}>{copy.resume}<ArrowRight size={16} aria-hidden="true" /></button><button type="button" className={cn(action, "text-paragraph")} onClick={onRemove}><Trash2 size={16} aria-hidden="true" />{copy.remove}</button></>}
    </div>
    <p className="mt-3 text-xs leading-relaxed text-paragraph">{copy.note}</p>
    <p role="status" className="mt-2 text-sm text-primary">{notice}</p>
  </aside>;
}
