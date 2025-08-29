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
      {/* Google Tag (gtag.js) */}
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

      <ThankyouPage />
    </>
  );
}

export default Thankyou;
