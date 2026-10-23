"use client";
import WebDesignHeader from "@/components/layouts/web-design-header";
import WebDesignFooter from "@/components/layouts/web-design-footer";
import WhatsAppPopup from "@/elements/business/logo-design/whatsapp-popup";
import FloatingCtaButton from "@/components/common/floating-cta-button";
import Script from "next/script";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <WebDesignHeader />
      {children}
      <WhatsAppPopup />
      <FloatingCtaButton />
      <WebDesignFooter />
    </>
  );
}
