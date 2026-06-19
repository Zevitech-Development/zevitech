"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Sora, Space_Mono } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

// Injected before first paint — reads localStorage and stamps ai-dark on the
// wrapper so there is zero flash when the user has dark mode saved.
const DARK_INIT_SCRIPT = `
(function(){
  try {
    if(localStorage.getItem('ai-calling-dark')==='1'){
      document.getElementById('ai-lp-root')?.classList.add('ai-dark');
    }
  } catch(e){}
})();
`;

export default function AiCallingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window as any).LiveChatWidget) {
        (window as any).LiveChatWidget.call("hide");
      }
    } catch {}
    return () => {
      try {
        if (typeof window !== "undefined" && (window as any).LiveChatWidget) {
          (window as any).LiveChatWidget.call("show");
        }
      } catch {}
    };
  }, []);

  return (
    <div className={`${sora.variable} ${spaceMono.variable}`}>
      {/* Blocking script — must run before paint to avoid dark-mode flash */}
      <Script
        id="ai-dark-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: DARK_INIT_SCRIPT }}
      />
      {children}
    </div>
  );
}
