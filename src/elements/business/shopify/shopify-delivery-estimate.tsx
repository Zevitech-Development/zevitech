import { Clock3 } from "lucide-react";
import {
  getShopifyDeliveryEstimate,
  shopifyDeliveryCopy as copy,
} from "@/content/landing/shopify-delivery-content";
import type { ShopifyDeliveryEstimateProps } from "@/interfaces/shopify-delivery-estimate-interface";
import { cn } from "@/lib/utils";

export default function ShopifyDeliveryEstimate({
  packageName,
  showNote = false,
  className,
}: ShopifyDeliveryEstimateProps) {
  const estimate = getShopifyDeliveryEstimate(packageName);
  if (!estimate) return null;

  return (
    <span className={cn("block text-sm leading-relaxed text-paragraph", className)}>
      <span className="flex items-start gap-2">
        <Clock3 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
        <span>
          {copy.label}: <strong className="font-semibold text-heading">{estimate}</strong>
        </span>
      </span>
      {showNote && (
        <span className="mt-2 block text-xs leading-relaxed text-paragraph">
          {copy.timingNote}
        </span>
      )}
    </span>
  );
}
