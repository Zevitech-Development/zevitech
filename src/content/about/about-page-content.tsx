import Location01USA from "../../../public/images/location-01-us.jpg";
import Location02UK from "../../../public/images/location-02-uk.jpg";
import Location03UAE from "../../../public/images/location-03-uae.jpg";
// CTA Section Imports
import { MdContactMail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";

export const locations = [
  {
    location: "Middletown, DE, USA",
    title: "US Address",
    content:
      "Our office located at 651 N. Broad St, Suite 201, serving as a key operational base in the United States.",
    image: Location01USA,
  },
  {
    location: "London, England, UK",
    title: "UK Head Office",
    content:
      "Our head office situated at 30 Riverhead Close, London, leading strategic operations across the UK.",
    image: Location02UK,
  },
  {
    location: "Dubai, United Arab Emirates",
    title: "Dubai Office",
    content:
      "Located at F-1-144, Hor Al Anz, Plot No.739-0, Makani: 33107 96617 — a central hub for our Middle East operations.",
    image: Location03UAE,
  },
];

// FAQ About Us
export const FaqDataAboutUs = [
  {
    question: "Who is ZeviTech?",
    answer:
      "ZeviTech is a creative and technology-driven agency offering a wide range of digital solutions to help businesses grow online and offline.",
    list: [
      "Full-service web and design agency",
      "Experts in eCommerce and branding",
      "Creative meets technical expertise",
      "Trusted by clients worldwide",
    ],
  },
  {
    question: "What services does ZeviTech provide?",
    answer:
      "We offer a complete suite of services to meet your business needs — from web development to branding and marketing.",
    list: [
      "Shopify & custom web development",
      "Logo & brand identity design",
      "WordPress website solutions",
      "Amazon store setup & optimization",
      "Professional video editing",
    ],
  },
  {
    question: "Why choose ZeviTech?",
    answer:
      "We combine creativity, strategy, and technology to deliver solutions that are visually appealing and business-focused.",
    list: [
      "Tailor-made strategies for every project",
      "Mobile-friendly, modern designs",
      "Scalable solutions to grow with your brand",
      "Dedicated support and clear communication",
    ],
  },
  {
    question: "Do you work with all types of businesses?",
    answer:
      "Yes, we work with startups, small businesses, and established enterprises across various industries.",
    list: [
      "Affordable packages for new businesses",
      "Advanced solutions for enterprise needs",
      "Flexible services for every budget",
      "Global client base with diverse niches",
    ],
  },
];

// About Us CTA Section
export const AboutUsCtaData = [
  { icon: MdContactMail, text: "Contact Us" },
  { icon: FaPhoneSquareAlt, text: "866-561-4250" },
  { icon: BsFillChatSquareDotsFill, text: "Chat Now" },
  { icon: MdMarkEmailRead, text: "Drop Your Email" },
];

// Faq Data :
export const AboutFaqData = [
  {
    id: "who-is-zeviTech",
    question: "Who is ZeviTech?",
    answer:
      "ZeviTech is a creative and technology-driven agency offering a wide range of digital solutions to help businesses grow online and offline. We are a full-service web and design agency, experts in eCommerce and branding, where creativity meets technical expertise, trusted by clients worldwide.",
  },
  {
    id: "services",
    question: "What services does ZeviTech provide?",
    answer:
      "We offer a complete suite of services to meet your business needs — from web development to branding and marketing. Our services include Shopify & custom web development, logo & brand identity design, WordPress website solutions, Amazon store setup & optimization, and professional video editing.",
  },
  {
    id: "why-choose",
    question: "Why choose ZeviTech?",
    answer:
      "We combine creativity, strategy, and technology to deliver solutions that are visually appealing and business-focused. Our approach includes tailor-made strategies for every project, mobile-friendly and modern designs, scalable solutions to grow with your brand, and dedicated support with clear communication.",
  },
];
