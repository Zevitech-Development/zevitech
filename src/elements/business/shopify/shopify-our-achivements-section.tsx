"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, ChevronDown, ImageOff, LoaderCircle, RotateCcw } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { shopifyPortfolioProjects, shopifyAdditionalReferences } from "@/content/landing/shopify-portfolio-projects";
import { shopifyLandingSalesContent } from "@/content/landing/shopify-landing-sales-content";
import type { ShopifyPortfolioCardProps } from "@/interfaces/shopify-portfolio-interface";
import { cn } from "@/lib/utils";

type PreviewState = "loading" | "loaded" | "error";

function PortfolioCard({ project, eager = false }: ShopifyPortfolioCardProps) {
  const copy = shopifyLandingSalesContent.portfolio;
  const [thumbnailState, setThumbnailState] = useState<PreviewState>("loading");
  const [thumbnailAttempt, setThumbnailAttempt] = useState(0);
  const [fullState, setFullState] = useState<PreviewState>("loading");
  const [fullAttempt, setFullAttempt] = useState(0);
  const imageWidth = { "--portfolio-image-width": `${project.image.width}px` } as CSSProperties;
  const thumbWidth = { "--portfolio-image-width": `${project.thumbnail.width}px` } as CSSProperties;

  return (
    <Dialog onOpenChange={open => { if (open) setFullState("loading"); }}>
      <article className="group h-full min-w-0 overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`${copy.open}: ${project.name}`}
            className="block w-full min-w-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-secondary-background px-4 py-3" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-mix-paragraph/30" />
              <span className="h-2 w-2 rounded-full bg-mix-paragraph/20" />
              <span className="h-2 w-2 rounded-full bg-mix-paragraph/15" />
              <span className="ml-3 text-xs font-medium text-paragraph">{copy.frame}</span>
            </div>
            <div className="border-b border-border bg-secondary-background">
              <div
                aria-busy={thumbnailState === "loading"}
                className="relative mx-auto aspect-[16/10] w-full max-w-[var(--portfolio-image-width)] overflow-hidden"
                style={thumbWidth}
              >
                <Image
                  key={thumbnailAttempt}
                  src={project.thumbnail}
                  alt={`${project.name} ${copy.thumbnailAlt}`}
                  fill
                  quality={95}
                  sizes={eager ? "(min-width: 1440px) 640px, (min-width: 768px) 46vw, 92vw" : "(min-width: 1440px) 420px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"}
                  loading={eager ? "eager" : "lazy"}
                  unoptimized={eager || thumbnailAttempt > 0}
                  onLoad={() => setThumbnailState("loaded")}
                  onError={() => setThumbnailState("error")}
                  className={cn("object-cover object-top transition-opacity duration-200 motion-reduce:transition-none", thumbnailState === "loaded" ? "opacity-100" : "opacity-0")}
                />
                {thumbnailState !== "loaded" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-paragraph" role="status">
                    {thumbnailState === "error" ? <ImageOff aria-hidden="true" className="h-7 w-7" /> : <LoaderCircle aria-hidden="true" className="h-6 w-6 animate-spin motion-reduce:animate-none" />}
                    <span className="text-sm">{thumbnailState === "error" ? copy.imageError : copy.loading}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="min-w-0 break-words p-4 md:p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-paragraph">{project.category}</p>
              <h3 className="mt-2 font-heading text-2xl leading-tight text-heading">{project.name}</h3>
              <span className="mt-4 flex min-h-11 items-center justify-between gap-3 border-t border-border pt-3 text-sm font-semibold text-primary">
                {copy.open}<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
              </span>
            </div>
          </button>
        </DialogTrigger>
        {thumbnailState === "error" && (
          <div className="border-t border-border px-4 py-3">
            <button
              type="button"
              onClick={() => { setThumbnailState("loading"); setThumbnailAttempt(attempt => attempt + 1); }}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-secondary-background px-4 py-2 text-sm font-semibold text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />{copy.retry}
            </button>
          </div>
        )}
      </article>
      <DialogContent className="flex max-h-[90dvh] w-[calc(100%-2rem)] min-w-0 max-w-5xl flex-col gap-0 overflow-hidden rounded-2xl p-0 motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-lg [&>button]:border [&>button]:border-border [&>button]:bg-background [&>button]:opacity-100">
        <div className="shrink-0 break-words border-b border-border py-4 pl-4 pr-20 md:py-5 md:pl-5">
          <DialogTitle className="font-heading text-xl leading-tight md:text-2xl">{project.name}</DialogTitle>
          <DialogDescription className="mt-2 text-sm leading-relaxed">{copy.note}</DialogDescription>
          <p className="mt-3 flex items-center gap-2 text-xs font-medium text-paragraph"><ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />{copy.scroll}</p>
        </div>
        <div
          className="min-h-0 min-w-0 overflow-y-auto overscroll-contain bg-secondary-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          role="region"
          tabIndex={0}
          aria-label={`${project.name} ${copy.fullAlt}`}
          aria-busy={fullState === "loading"}
        >
          <div
            className={cn("relative mx-auto w-full max-w-[var(--portfolio-image-width)]", fullState !== "loaded" && "min-h-64")}
            style={imageWidth}
          >
            <Image
              key={fullAttempt}
              src={project.image}
              alt={`${project.name} ${copy.fullAlt}`}
              quality={95}
              sizes={`(min-width: 1056px) ${Math.min(project.image.width, 1024)}px, calc(100vw - 32px)`}
              loading="eager"
              unoptimized={project.image.width < 1024 || fullAttempt > 0}
              onLoad={() => setFullState("loaded")}
              onError={() => setFullState("error")}
              className={cn("h-auto w-full", fullState !== "loaded" && "absolute inset-x-0 top-0 opacity-0")}
            />
            {fullState !== "loaded" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-paragraph" role="status">
                {fullState === "error" ? <ImageOff aria-hidden="true" className="h-8 w-8" /> : <LoaderCircle aria-hidden="true" className="h-6 w-6 animate-spin motion-reduce:animate-none" />}
                <p className="text-sm">{fullState === "error" ? copy.imageError : copy.loading}</p>
                {fullState === "error" && (
                  <button
                    type="button"
                    onClick={() => { setFullState("loading"); setFullAttempt(attempt => attempt + 1); }}
                    className="mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <RotateCcw aria-hidden="true" className="h-4 w-4" />{copy.retry}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="shrink-0 border-t border-border p-3">
          <DialogClose className="min-h-11 w-full rounded-lg bg-secondary-background px-4 py-3 font-semibold text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{copy.close}</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function OurAchievementSection() {
  const copy = shopifyLandingSalesContent.portfolio;
  const [additionalOpen, setAdditionalOpen] = useState(false);
  return (
    <section id="shopify-portfolio" className="section-padding-standard scroll-mt-6">
      <div className="layout-standard">
        <div className="mb-8 max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{copy.eyebrow}</p><h2 className="font-heading text-3xl font-bold leading-tight text-heading md:text-4xl lg:text-5xl">{copy.title}</h2><p className="mt-4 text-base leading-relaxed text-paragraph md:text-lg">{copy.description}</p></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{shopifyPortfolioProjects.map(project => <PortfolioCard key={project.name} project={project} />)}</div>
        <details className="group mt-6" onToggle={event => setAdditionalOpen(event.currentTarget.open)}>
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 font-semibold text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"><span><span className="group-open:hidden">{copy.more}</span><span className="hidden group-open:inline">{copy.fewer}</span></span><ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary>
          {additionalOpen && (
            <>
              <p className="my-5 text-sm leading-relaxed text-paragraph">{copy.extraIntro}</p>
              <div className="grid gap-5 md:grid-cols-2">{shopifyAdditionalReferences.map(project => <PortfolioCard key={project.name} project={project} eager />)}</div>
            </>
          )}
        </details>
      </div>
    </section>
  );
}
