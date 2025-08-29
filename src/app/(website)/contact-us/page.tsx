import React from "react";
import { Metadata } from "next";

import ContactUsPage from "@/containers/website/contact-us-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Contact Us | Zevitech – Let’s Build Something Great Together",
  description:
    "Get in touch with Zevitech to discuss your next big idea. Whether it's custom software, app development, branding, or digital transformation, we're here to help. Reach out for a free consultation today.",
});

function ContactUs() {
  return <ContactUsPage />;
}

export default ContactUs;
