import React from 'react'
import ServicesHeroSections01 from '@/components/common/services-hero-sections'
import ContactUsCardsSection from '@/elements/website/contact/contact-cards-section'
import ContactFormSection from '@/elements/website/contact/contact-form-section'

function ContactUsPage() {
  return (
    <>
       <ServicesHeroSections01
        title="Contact Us – Turning Ideas into Solutions"
        desc="Have a vision? We have the tools and expertise to bring it to life. Reach out and let’s make something extraordinary together."
      />

      <ContactUsCardsSection />

      <ContactFormSection />
    </>
  )
}

export default ContactUsPage