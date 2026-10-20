import Image from "next/image";
import { shopifyRestoredLogos } from "@/content/landing/shopify-restored-proof-content";

export default function TrustbarSection() {
  return (
    <div className="border-b border-border py-8">
      <div className="layout-standard grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
        {shopifyRestoredLogos.map((logo) => <Image key={logo.clientNo} src={logo.img} alt={logo.name} sizes="(min-width: 1024px) 140px, 120px" className="h-auto max-h-12 w-auto max-w-full object-contain" />)}
      </div>
    </div>
  );
}
