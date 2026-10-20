import Image from "next/image";
import { shopifyConceptReferenceCopy as copy } from "@/content/landing/shopify-concept-reference-content";
import type { ShopifyConceptReferenceProps } from "@/interfaces/shopify-reference-concept-interface";
import { cn } from "@/lib/utils";

export default function ShopifyConceptReference({ conceptImage, className }: ShopifyConceptReferenceProps) {
  return (
    <figure aria-label={copy.label} className={cn("mx-auto w-full min-w-0 max-w-3xl overflow-hidden rounded-xl border border-border bg-background", className)}>
      <Image
        src={conceptImage.src}
        alt={conceptImage.alt}
        width={conceptImage.width}
        height={conceptImage.height}
        sizes="(max-width: 767px) 100vw, 768px"
        loading="eager"
        unoptimized
        className="block h-auto w-full"
      />
      <figcaption className="border-t border-border p-4 text-xs leading-relaxed text-paragraph">
        {copy.caption}
      </figcaption>
    </figure>
  );
}
