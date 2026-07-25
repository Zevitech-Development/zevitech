"use client";
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
    let attempts = 0;
    let widget: any;
    document.body.classList.add("google-ads-livechat-hidden");

    const hideWidget = () => {
      try {
        widget = (window as any).LiveChatWidget;
        if (!widget) return false;
        widget.call("hide");
        return true;
      } catch {
        return false;
      }
    };

    const interval = window.setInterval(() => {
      attempts += 1;
      if (hideWidget() || attempts >= 20) window.clearInterval(interval);
    }, 250);

    hideWidget();

    return () => {
      window.clearInterval(interval);
      document.body.classList.remove("google-ads-livechat-hidden");
      try {
        widget = (window as any).LiveChatWidget;
        if (widget) widget.call("show");
      } catch {}
    };
  }, []);

  return (
    <>
      <WebDesignHeader ctaHref="#google-ads-growth-form" ctaLabel="Request Free Growth Audit" />
      {children}
      <WhatsAppPopup
        bodyMessage="👋 Want more qualified leads and online sales from Google Ads?"
        supportMessage="Tell us what you sell and where growth is getting stuck."
        prefilledMessage="Hi! I’d like to discuss growing leads and sales with Google Ads."
        ctaLabel="Chat About Google Ads"
        startMinimized
      />
      <WebDesignFooter />
    </>
  );
}
