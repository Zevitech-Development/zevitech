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
      { url: "/favicon.ico", sizes: "32x32" }, // Standard fallback
      { url: "/favicon/logo-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/logo-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/logo-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }], // Explicit shortcut icon
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

        {/* Google Ads global tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17789624484"
          strategy="afterInteractive"
        />
        <Script id="gtag-aw" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'AW-17789624484');
          `}
        </Script>
        <Script id="aw-conversion-helper" strategy="afterInteractive">
          {`
            // Helper function to hash user data with SHA-256
            async function hashUserData(value) {
              if (!value) return '';
              const normalized = String(value).toLowerCase().trim();
              const encoder = new TextEncoder();
              const data = encoder.encode(normalized);
              const hashBuffer = await crypto.subtle.digest('SHA-256', data);
              const hashArray = Array.from(new Uint8Array(hashBuffer));
              return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            }

            // Enhanced conversion helper with user data support
            window.gtag_report_conversion = window.gtag_report_conversion || async function(url, userData) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };

              if (typeof gtag === 'function') {
                const conversionData = {
                  'send_to': 'AW-17789624484/Cu82CPTzlc4bEKTB4KJC',
                  'value': 1.0,
                  'currency': 'USD',
                  'event_callback': callback
                };

                // Add enhanced conversion data if provided
                if (userData) {
                  const enhancedUserData = {};

                  // Hash email
                  if (userData.email) {
                    enhancedUserData.email = await hashUserData(userData.email);
                  }

                  // Hash phone (normalize: remove spaces, dashes, parentheses)
                  if (userData.phone) {
                    const normalizedPhone = String(userData.phone).replace(/[\s\-\(\)]/g, '');
                    enhancedUserData.phone_number = await hashUserData(normalizedPhone);
                  }

                  // Hash name (split into first and last)
                  if (userData.firstName || userData.lastName) {
                    enhancedUserData.address = {};
                    if (userData.firstName) {
                      enhancedUserData.address.first_name = await hashUserData(userData.firstName);
                    }
                    if (userData.lastName) {
                      enhancedUserData.address.last_name = await hashUserData(userData.lastName);
                    }
                  }

                  // Add enhanced user data to conversion
                  if (Object.keys(enhancedUserData).length > 0) {
                    conversionData.user_data = enhancedUserData;
                  }
                }

                gtag('event', 'conversion', conversionData);
              }
              return false;
            };
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

        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ujhgmiiqop");
          `}
        </Script>
      </body>
    </html>
  );
}
