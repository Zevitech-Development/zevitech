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
    // LiveChat is loaded globally in the root layout but may have been hidden by
    // another route's layout, so re-show it here (retrying until the widget loads).
    let attempts = 0;

    const showWidget = () => {
      try {
        const widget = (window as any).LiveChatWidget;
        if (!widget) return false;
        widget.call("show");
        return true;
      } catch {
        return false;
      }
    };

    document.body.classList.remove("google-ads-livechat-hidden");

    const interval = window.setInterval(() => {
      attempts += 1;
      if (showWidget() || attempts >= 20) window.clearInterval(interval);
    }, 250);

    showWidget();

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/*
        PPC Google Ads account for this page only. The gtag.js library and the
        window.gtag shim are already loaded site-wide in the root layout, so we
        only register the extra Ads destination here. The conversion event itself
        fires from the lead form via trackGoogleAdsPpcConversion().
      */}
      <Script id="ga-ppc-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18263994803');
        `}
      </Script>

      <WebDesignHeader ctaHref="#google-ads-growth-form" ctaLabel="Request Free Growth Audit" />
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
