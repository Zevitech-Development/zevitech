import Image, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
/** Approved artwork photos stay separate from the functional HTML controls. */
export default function ShopifyPreviewImage(props: ImageProps) {
  const match = typeof props.src === "string" && props.src.match(/^(\/store-studio\/showcase\/[a-z0-9-]+\.webp)#art=([\d.,]+)$/);
  if (!match) return <Image {...props} alt={props.alt} />;
  const [x,y,w,h] = match[2].split(",").map(Number);
  if (![x,y,w,h].every(Number.isFinite) || w <= 0 || h <= 0 || w >= 100 || h >= 100) return null;
  return <span role={props.alt ? "img" : undefined} aria-label={props.alt || undefined} aria-hidden={!props.alt || undefined}
    className={cn("block bg-no-repeat bg-[image:var(--art-src)] [background-size:var(--art-size)] [background-position:var(--art-position)]",props.className)}
    style={{...props.style,"--art-src":`url("${match[1]}")`,"--art-size":`${10000/w}% ${10000/h}%`,"--art-position":`${100*x/(100-w)}% ${100*y/(100-h)}%`} as CSSProperties} />;
}
