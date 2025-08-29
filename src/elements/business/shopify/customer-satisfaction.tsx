import React from "react";
import Image from "next/image";
import Link from "next/link";

import CustomerSatisfactionLogo01 from "../../../../public/images/customer-satisfaction-logo-01.svg";
import CustomerSatisfactionLogo02 from "../../../../public/images/customer-satisfaction-logo-02.svg";
import CustomerSatisfactionLogo03 from "../../../../public/images/customer-satisfaction-logo-03.svg";
import CustomerSatisfactionLogo04 from "../../../../public/images/customer-satisfaction-logo-04.svg";
import CustomerSatisfactionLogo05 from "../../../../public/images/customer-satisfaction-logo-05.svg";
import TrustpilotIcon from "../../../../public/icons/trustpilot-footer-icon.png";
import CertificateFooterIcon from "../../../../public/icons/certificate-footer-icon.png";

function CustomerSatisfactionSection() {
  return (
    <section className="layout-standard section-padding-standard">
      <div className="flex flex-col gap-4 items-center text-center lg:mb-16 mb-12">
        <h1 className="text-heading font-heading md:text-6xl text-4xl font-bold text-center lg:max-w-4xl tracking-widest">
          Customer <span className="text-secondary">Satisfaction </span> Is Our
          Top Priority
        </h1>
        <p className="md:text-2xl text-base lg:max-w-3xl text-center font-medium text-paragraph">
          Our designs have helped over 5000 clients make $1.5M+ in revenue. Join
          us, and let&apos;s create success together!
        </p>
      </div>

      <div className="w-full grid lg:grid-cols-5 md:grid-cols-2 col-span-1 gap-4">
        <div className="w-full h-[200px] bg-white border border-border flex-center rounded-2xl shadow-2xl col-span-1">
          <Image
            src={CustomerSatisfactionLogo01}
            alt="Customer Satisfaction"
            width={180}
          />
        </div>

        <div className="w-full h-[200px] bg-white border border-border flex-center rounded-2xl shadow-2xl col-span-1">
          <Image
            src={CustomerSatisfactionLogo02}
            alt="Customer Satisfaction"
            width={180}
          />
        </div>

        <div className="w-full h-[200px] bg-white border border-border flex-center rounded-2xl shadow-2xl col-span-1">
          <Image
            src={CustomerSatisfactionLogo03}
            alt="Customer Satisfaction"
            width={180}
          />
        </div>

        <div className="w-full h-[200px] bg-white border border-border flex-center rounded-2xl shadow-2xl col-span-1">
          <Image
            src={CustomerSatisfactionLogo04}
            alt="Customer Satisfaction"
            width={180}
          />
        </div>

        <div className="w-full h-[200px] bg-white border border-border flex-center rounded-2xl shadow-2xl max-lg:col-span-2 max-md:col-span-1">
          <Image
            src={CustomerSatisfactionLogo05}
            alt="Customer Satisfaction"
            width={180}
          />
        </div>
      </div>

      <div className="section-padding-standard pb-4 mt-16 flex items-center lg:justify-between max-lg:flex-col gap-4">
        <Link
          href={"https://www.trustpilot.com/review/zevitech.com"}
          target="_blank"
        >
          <Image src={TrustpilotIcon} alt="Trustpilot" />
        </Link>

        <Image
          src={CertificateFooterIcon}
          alt="Certificate Logos"
          width={250}
        />

        <div className="flex flex-col max-lg:text-center">
          <h1 className="text-heading text-xl font-bold mb-1">Get in Touch</h1>
          <Link
            href="tel:+13022176872"
            className="hover:text-primary transition-colors"
          >
            (302) 217-6211
          </Link>
          <Link
            href="mailto:info@zevitech.com"
            className="hover:text-primary transition-colors"
          >
            info@zevitech.com
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CustomerSatisfactionSection;
