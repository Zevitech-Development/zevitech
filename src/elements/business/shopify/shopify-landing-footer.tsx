import Link from "next/link";
import { shopifyLandingFooterContent as copy } from "@/content/landing/shopify-landing-footer-content";

export default function ShopifyLandingFooter() {
  const legalLinkClass = "inline-flex min-h-11 items-center rounded px-2 text-xs text-muted-foreground underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <footer className="bg-secondary-background py-8">
      <div className="layout-standard space-y-4">
        <p className="text-center text-sm font-semibold text-heading">{copy.copyright}</p>
        <nav aria-label={copy.legalLabel} className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href={copy.privacyHref} className={legalLinkClass}>{copy.privacy}</Link>
          <Link href={copy.termsHref} className={legalLinkClass}>{copy.terms}</Link>
          <Link href={copy.policyHref} className={legalLinkClass}>{copy.policyTitle}</Link>
        </nav>
        <p className="mx-auto max-w-5xl text-center text-xs leading-relaxed text-muted-foreground">{copy.description}</p>
      </div>
    </footer>
  );
}
