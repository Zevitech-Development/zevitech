"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { shopifyRestoredProofContent, shopifyRestoredScreenshots } from "@/content/landing/shopify-restored-proof-content";
import { cn } from "@/lib/utils";

export default function ResultSection() {
  const [expanded, setExpanded] = useState(false);
  const copy = shopifyRestoredProofContent.results;
  return (
    <section id="store-results" aria-labelledby="store-results-title" className="section-padding-standard scroll-mt-6 bg-secondary-background">
      <div className="layout-standard">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{copy.eyebrow}</p>
          <h2 id="store-results-title" className="font-heading text-3xl font-bold leading-tight text-heading md:text-4xl lg:text-5xl">{copy.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-paragraph md:text-lg">{copy.description}</p>
        </div>
        <div id="store-results-gallery" className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shopifyRestoredScreenshots.map((result, index) => (
            <div key={result.resultNo} hidden={!expanded && index >= 3} className="min-w-0">
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" aria-label={`${copy.open}: ${result.name}`} className="group w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    <div className="aspect-[3/4] overflow-hidden border-b border-border bg-background p-3">
                      <Image src={result.img} alt={`${result.name}: ${result.subject}`} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" className="h-full w-full object-contain" />
                    </div>
                    <div className="flex min-h-20 items-center justify-between gap-3 p-4">
                      <span className="min-w-0 break-words"><span className="block font-semibold text-heading">{result.name}</span><span className="mt-1 block text-sm leading-relaxed text-paragraph">{result.subject}</span></span>
                      <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="flex max-h-[90dvh] w-[calc(100%-2rem)] min-w-0 max-w-3xl flex-col gap-0 overflow-hidden rounded-2xl p-0 motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-lg [&>button]:border [&>button]:border-border [&>button]:bg-background [&>button]:opacity-100">
                  <div className="min-h-0 min-w-0 overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" role="region" tabIndex={0} aria-label={`${copy.open}: ${result.name}`}>
                    <div className="break-words border-b border-border py-5 pl-5 pr-20"><DialogTitle className="font-heading text-2xl leading-tight">{result.name}</DialogTitle><DialogDescription className="mt-2 leading-relaxed">{result.subject}</DialogDescription></div>
                    <div className="bg-secondary-background p-3"><Image src={result.img} alt={`${result.name}: ${result.subject}`} sizes="(min-width: 640px) 576px, calc(100vw - 56px)" className="mx-auto h-auto w-full max-w-xl" /></div>
                  </div>
                  <div className="shrink-0 border-t border-border p-3"><DialogClose className="min-h-11 w-full rounded-lg bg-secondary-background px-4 py-3 font-semibold text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{copy.close}</DialogClose></div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-paragraph">{copy.note}</p>
          <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="store-results-gallery" className="inline-flex min-h-12 max-w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-center text-sm font-semibold text-heading transition-colors hover:bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {expanded ? copy.fewer : copy.more}<ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform motion-reduce:transition-none", expanded && "rotate-180")} />
          </button>
        </div>
      </div>
    </section>
  );
}
