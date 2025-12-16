"use client";
import WebDesignHeader from "@/components/layouts/web-design-header";
import WebDesignFooter from "@/components/layouts/web-design-footer";
import WhatsAppPopup from "@/elements/business/logo-design/whatsapp-popup";
import Script from "next/script";
import { useEffect } from "react";

export default function BusinessLayout({
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
        if (typeof window !== "undefined" && (window as any).Tawk_API) {
          const api = (window as any).Tawk_API;
          if (typeof api.hideWidget === "function") api.hideWidget();
        }
      } catch {}
    };
  }, []);
  
  return (
    <>
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
          // Google Ads conversion helper; call only after successful validation
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            if (typeof gtag === 'function') {
              gtag('event', 'conversion', {
                  'send_to': 'AW-17789624484/Cu82CPTzlc4bEKTB4KJC',
                  'value': 1.0,
                  'currency': 'USD',
                  'event_callback': callback
              });
            }
            return false;
          }
        `}
      </Script>
      <Script id="tawk-to" strategy="afterInteractive">
        {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/660354441ec1082f04dbb073/1hpug2bip';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        `}
      </Script>
      <WebDesignHeader />
      {children}
      <WhatsAppPopup />
      <WebDesignFooter />
    </>
  );
}
