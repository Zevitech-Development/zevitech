import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

// import { Toaster } from "@/components/ui/sonner";

import { GetPageMetadata } from "@/utils/meta-data";

// STYLE SHEETS SOURCE
import "../styles/globals.css";
import "../styles/include.css";
import "../styles/animation.css";
import Script from "next/script";

import { Header } from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import RootHeaderFooterGuard from "@/components/layouts/RootHeaderFooterGuard";

// FONT CONFIGURATIONS
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// WEBSITE METADATA AND VIEWPORT
export const metadata: Metadata = {
  ...GetPageMetadata(),
  icons: {
    icon: [
      { url: "/favicon/logo-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/logo-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/logo-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon/logo-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-visual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable}`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4V3XW7Q5EG"
          strategy="afterInteractive"
        />

        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4V3XW7Q5EG');
          `}
        </Script>

        <Script id="livechat-widget" strategy="afterInteractive">
          {`
    window.__lc = window.__lc || {};
    window.__lc.license = 19229942;
    window.__lc.integration_name = "manual_channels";
    window.__lc.product_name = "livechat";

    (function(n, t, c) {
      function i(n) {
        return e._h ? e._h.apply(null, n) : e._q.push(n);
      }
      var e = {
        _q: [],
        _h: null,
        _v: "2.0",
        on: function() { i(["on", c.call(arguments)]) },
        once: function() { i(["once", c.call(arguments)]) },
        off: function() { i(["off", c.call(arguments)]) },
        get: function() {
          if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
          return i(["get", c.call(arguments)]);
        },
        call: function() { i(["call", c.call(arguments)]) },
        init: function() {
          var s = t.createElement("script");
          s.async = true;
          s.type = "text/javascript";
          s.src = "https://cdn.livechatinc.com/tracking.js";
          t.head.appendChild(s);
        }
      };
      if (!n.__lc.asyncInit) e.init();
      n.LiveChatWidget = n.LiveChatWidget || e;
    })(window, document, [].slice);
  `}
        </Script>

        <noscript>
          <a href="https://www.livechat.com/chat-with/19229942/" rel="nofollow">
            Chat with us
          </a>
          , powered by{" "}
          <a
            href="https://www.livechat.com/?welcome"
            rel="noopener nofollow"
            target="_blank"
          >
            LiveChat
          </a>
        </noscript>
          {/* <Header /> */}
        <RootHeaderFooterGuard>
          {children}
          {/* <Footer /> */}
        </RootHeaderFooterGuard>

        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
