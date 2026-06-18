"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { aiNavLinks } from "@/content/landing/ai-calling-page-content";

interface AiCallingHeaderProps {
  onOpenModal?: () => void;
  onToggleDark?: () => void;
  isDark?: boolean;
}

export default function AiCallingHeader({
  onOpenModal,
  onToggleDark,
  isDark = false,
}: AiCallingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCta = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onOpenModal?.();
    },
    [onOpenModal]
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
        scrolled
          ? "bg-[var(--ai-bg2)] border-b border-[var(--ai-line)] shadow-[var(--ai-shadow-sm)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[74px]">
        {/* Brand */}
        <div className="flex items-center gap-[11px]">
          <div className="relative h-8 w-[180px]">
            <Image
              src="/favicon/logo-black.png"
              alt="Zevitech"
              fill
              className="object-contain object-left ai-logo-light transition-opacity duration-200"
              priority
            />
            <Image
              src="/favicon/logo-white.png"
              alt="Zevitech"
              fill
              className="object-contain object-left ai-logo-dark transition-opacity duration-200"
              priority
            />
          </div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--ai-muted)] border-l border-[var(--ai-line)] pl-[11px] uppercase hidden md:block">
            AI Sales Agents
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-7 items-center">
          {aiNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--ai-muted)] hover:text-[var(--ai-ink)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={onToggleDark}
            className="h-10 rounded-full border border-[var(--ai-line)] bg-[var(--ai-panel)] px-3 sm:px-4 flex items-center gap-2 text-sm font-semibold text-[var(--ai-ink)] hover:border-[var(--ai-blue)] transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none stroke-2 flex-shrink-0">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none stroke-2 flex-shrink-0">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
              </svg>
            )}
            <span className="hidden xs:inline">{isDark ? "Light" : "Dark"}</span>
          </button>

          <a
            href="#cta"
            onClick={handleCta}
            className="hidden md:inline-flex items-center gap-2 font-semibold text-sm px-5 py-[11px] rounded-full text-white transition-all duration-200 hover:shadow-[0_18px_44px_rgba(45,107,255,.45)]"
            style={{ background: "var(--ai-grad)", boxShadow: "0 12px 30px rgba(45,107,255,.32)" }}
          >
            Book a free demo
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden text-[var(--ai-ink)] text-2xl bg-none border-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[74px] left-0 right-0 bg-[var(--ai-panel)] border-b border-[var(--ai-line)] shadow-[var(--ai-shadow)] flex flex-col gap-4 px-6 py-4">
          {aiNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-[var(--ai-muted)] hover:text-[var(--ai-ink)] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={(e) => { handleCta(e); setMobileOpen(false); }}
            className="inline-flex items-center justify-center font-semibold text-sm px-5 py-3 rounded-full text-white mt-2"
            style={{ background: "var(--ai-grad)" }}
          >
            Book a free demo
          </a>
        </div>
      )}
    </header>
  );
}
