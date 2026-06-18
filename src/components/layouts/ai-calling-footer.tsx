import Image from "next/image";
import { aiFooterLinks } from "@/content/landing/ai-calling-page-content";

export default function AiCallingFooter() {
  return (
    <footer className="border-t border-[var(--ai-line)] pt-[50px] pb-10 relative z-[2] bg-[var(--ai-bg2)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center flex-wrap gap-5">
          <div className="relative h-8 w-[180px]">
            <Image
              src="/favicon/logo-black.png"
              alt="Zevitech"
              fill
              className="object-contain object-left ai-logo-light"
            />
            <Image
              src="/favicon/logo-white.png"
              alt="Zevitech"
              fill
              className="object-contain object-left ai-logo-dark"
            />
          </div>
          <div>
            {aiFooterLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--ai-muted)] ml-[22px] hover:text-[var(--ai-ink)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
          <span className="font-mono text-[13px] text-[var(--ai-muted)]">
            support@zevitech.com
          </span>
        </div>
        <p className="text-center text-[var(--ai-muted)] text-xs mt-[30px] opacity-80">
          © 2026 Zevitech · AI Sales Agents. Serving the US, UK, Australia &amp;
          Gulf. Built since 2009.
        </p>
      </div>
    </footer>
  );
}
