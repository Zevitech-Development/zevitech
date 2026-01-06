import React from "react";
import { Metadata } from "next";

import ContactUsPage from "@/containers/website/contact-us-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Contact Us | Zevitech – Let’s Build Something Great Together",
  description:
    "Get in touch with Zevitech to discuss your next big idea—from custom software and app development to branding and digital transformation. Free consultation.",
});

function ContactUs() {
  return <ContactUsPage />;
}

export default ContactUs;
