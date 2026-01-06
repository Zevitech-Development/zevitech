import React from "react";
import { Metadata } from "next";
import Script from "next/script";


import { GetPageMetadata } from "@/utils/meta-data";
import ThankyouPage from "@/containers/bussiness/thankyou-page";

export const metadata: Metadata = GetPageMetadata({
  title: "Thank You | Form Submission Successful - Zevitech",
  description:
    "Your payment was successful. Thank you for choosing Zevitech for your digital solutions — from mobile apps to SaaS, Shopify, UI/UX, and web platforms. We'll be in touch shortly.",
});

function Thankyou() {
  return (
    <>
      {/* Google Ads Tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17789624484"
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'AW-17789624484');
          `}
      </Script>
      
      {/* Conversion event for Submit lead form */}
      <Script id="aw-submit-lead-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17789624484/Cu82CPTzlc4bEKTB4KJC',
            'value': 1.0, 
            'currency': 'USD'
          });
        `}
      </Script>
      <Script id="aw-submit-lead-conversion-secondary" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-16979187198/cYc6CMq_-90bEP6rp6A_',
            'value': 35.0,
            'currency': 'USD',
            'transaction_id': ''
          });
        `}
      </Script>

      <ThankyouPage />
    </>
  );
}

export default Thankyou;
