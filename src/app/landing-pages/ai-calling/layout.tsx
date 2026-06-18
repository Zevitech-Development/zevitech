"use client";

import { useEffect } from "react";
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
    <div className={`${sora.variable} ${spaceMono.variable}`}>{children}</div>
  );
}
