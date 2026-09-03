"use client";
import Script from "next/script";

import WebDesignHeader from "@/components/layouts/web-design-header";
import WebDesignFooter from "@/components/layouts/web-design-footer";
import WhatsAppPopup from "@/elements/business/logo-design/whatsapp-popup";
import { useEffect } from "react";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // This page uses Tawk.to instead of the site-wide LiveChat widget, so hide
    // LiveChat here and restore it when navigating away. The body class covers
    // the window between first paint and the widget script finishing loading.
    document.body.classList.add("google-ads-livechat-hidden");
    let liveChatAttempts = 0;
    let tawkAttempts = 0;

    const hideLiveChat = () => {
      try {
        const widget = (window as any).LiveChatWidget;
        if (!widget) return false;
        widget.call("hide");
        return true;
      } catch {
        return false;
      }
    };

    // Tawk.to survives client-side navigation, so if we hid it on the way out
    // it needs showing again on the way back in.
    const showTawk = () => {
      try {
        const tawk = (window as any).Tawk_API;
        if (!tawk || typeof tawk.showWidget !== "function") return false;
        tawk.showWidget();
        return true;
      } catch {
        return false;
      }
    };

    hideLiveChat();

    const liveChatInterval = window.setInterval(() => {
      liveChatAttempts += 1;
      if (hideLiveChat() || liveChatAttempts >= 20) {
        window.clearInterval(liveChatInterval);
      }
    }, 250);

    const tawkInterval = window.setInterval(() => {
      tawkAttempts += 1;
      if (showTawk() || tawkAttempts >= 20) window.clearInterval(tawkInterval);
    }, 250);

    return () => {
      window.clearInterval(liveChatInterval);
      window.clearInterval(tawkInterval);

      document.body.classList.remove("google-ads-livechat-hidden");

      try {
        (window as any).LiveChatWidget?.call("show");
      } catch {}

      try {
        (window as any).Tawk_API?.hideWidget?.();
      } catch {}
    };
  }, []);

  return (
    <>
      {/*
        PPC Google Ads account for this page only. The gtag.js library and the
        window.gtag shim are already loaded site-wide in the root layout, so we
        only register the extra Ads destination here. The conversion events fire
        from the lead form (trackGoogleAdsPpcLeadConversion) and the Calendly
        scheduler (trackGoogleAdsPpcBookingConversion).
      */}
      <Script id="ga-ppc-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18263994803');
        `}
      </Script>

      {/* Tawk.to chat — replaces the site-wide LiveChat widget on this page only. */}
      <Script id="tawk-to-widget" strategy="afterInteractive">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6a6625684cde7a1d48836bb4/1jufg48si';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>

      <WebDesignHeader
        ctaHref="#google-ads-growth-form"
        ctaLabel="Request Free Growth Audit"
      />
      {children}
      <WhatsAppPopup
        bodyMessage="👋 Want more qualified leads and online sales from Google Ads?"
        supportMessage="Tell us what you sell and where growth is getting stuck."
        prefilledMessage="Hi! I’d like to discuss growing leads and sales with Google Ads."
        ctaLabel="Chat About Google Ads"
        startMinimized
        bubblePositionClassName="bottom-24 right-2"
        panelPositionClassName="bottom-40 right-2"
      />
      <WebDesignFooter />
    </>
  );
}
