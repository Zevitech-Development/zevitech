import { ServiceGroup } from "../interfaces/header-interface";
import { Facebook, Handshake, Instagram, Twitter } from "lucide-react";
import { FaPhoneSquareAlt } from "react-icons/fa";

import { MdContactMail, MdMarkEmailRead } from "react-icons/md";

export const companyLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Pricing", href: "/pricing" },
];

export const Footerconfig = {
  companyName: "ZeviTech",
  year: "2025",
  location: "Florida & Georgia",
  contactEmail: "support@zevitech.com",
};
export const serviceLinks = [
  {
    name: "Logo Design",
    href: "/services/branding-design/logo-design/3d-design",
  },
  {
    name: "Product Packaging & Label Design",
    href: "/services/branding-design/product-packaging-label-design",
  },
  {
    name: "Social Media Kit Design",
    href: "/services/branding-design/social-media-kit-design",
  },
  { name: "E-Commerce Website", href: "/landing/shopify-development" },
];

export const socialLinks = [
  { icon: Facebook, name: "Facebook", url: "https://facebook.com/zevitech" },
  { icon: Twitter, name: "Twitter", url: "https://twitter.com/zevitech" },
  { icon: Instagram, name: "Instagram", url: "https://instagram.com/zevitech" },
];
export const servicesConfig = {
  heading: "Our Services",
  text: "We blend audience insight with digital innovation to align your brand vision with real-world results. From design to strategy, our tailored services drive impact, growth, and consistency across all digital channels.",
  items: [
    // {
    //   id: "logo-design",
    //   label: "Logo Design",
    //   href: "/services/branding-design/logo-design",
    //   children: [],
    // },

    {
      id: "logo-design",
      label: "Logo Design",
      href: "/services/branding-design/logo-design",
      children: [
        {
          label: "2D Logo Design",
          href: "/services/branding-design/logo-design/2d-design",
        },
        {
          label: "3D Logo Design",
          href: "/services/branding-design/logo-design/3d-design",
        },
        {
          label: "Animated Logo Design",
          href: "/services/branding-design/logo-design/animated-design",
        },
        {
          label: "Minimal Logo Design",
          href: "/services/branding-design/logo-design/minimal-design",
        },
        {
          label: "Mascot Logo Design",
          href: "/services/branding-design/logo-design/mascot-design",
        },
        {
          label: "Wordmark Logo Design",
          href: "/services/branding-design/logo-design/wordmark-design",
        },
        {
          label: "Customize Logo Design",
          href: "/services/branding-design/logo-design/customize-design",
        },
      ],
    },

    {
      id: "product-packaging-design",
      label: "Product Packaging & Label Design",
      href: "/services/branding-design/product-packaging-label-design",
      children: [],
    },
    {
      id: "social-media-kit-design",
      label: "Social Media Kit Design",
      href: "/services/branding-design/social-media-kit-design",
      children: [],
    },
    {
      id: "ecommerce",
      label: "E-Commerce",
      href: "/services/ecommerce",
      children: [
        {
          label: "OpenCart Website Development",
          href: "/services/ecommerce/opencart-website-development",
        },
        {
          label: "Magento Website Development",
          href: "/services/ecommerce/magento-website-development",
        },
        {
          label: "Shopify Website Development",
          href: "/services/ecommerce/shopify-development",
        },
        {
          label: "WooCommerce Website Development",
          href: "/services/ecommerce/woocommerce-website-development",
        },
        {
          label: "Wix Website Development",
          href: "/services/ecommerce/wix-website-development",
        },
        {
          label: "Custom E-Commerce Development",
          href: "/services/ecommerce/custom-ecommerce-development",
        },
      ],
    },
    {
      id: "design-development",
      label: "Design & Development",
      href: "/services/design-development",
      children: [
        {
          label: "WordPress Web Design",
          href: "/services/design-&-development/wordpress-web-design",
        },
        {
          label: "Custom Website Design",
          href: "/services/design-&-development/custom-website-design",
        },
        {
          label: "Joomla Website Development",
          href: "/services/design-&-development/joomla-website-development",
        },
        {
          label: "PHP Website Development",
          href: "/services/design-&-development/php-website-development",
        },
      ],
    },
    {
      id: "web-maintenance",
      label: "Web Maintenance",
      href: "/services/web-maintenance",
      children: [],
    },
    {
      id: "app-development",
      label: "App Development",
      href: "/services/app-development",
      children: [
        {
          label: "iOS Development",
          href: "/services/app-development/ios-development",
        },
        {
          label: "Game Development",
          href: "/services/app-development/game-development",
        },
        {
          label: "Android Development",
          href: "/services/app-development/android-development",
        },
        {
          label: "App Testing",
          href: "/services/app-development/app-testing",
        },
      ],
    },
    {
      id: "video-animation",
      label: "Video Animation",
      href: "/services/video-animation",
      children: [],
    },
    {
      id: "digital-marketing",
      label: "Digital Marketing",
      href: "/services/digital-marketing",
      children: [
        {
          label: "Social Media Marketing",
          href: "/services/digital-marketing/social-media-marketing",
        },
        {
          label: "Pay Per Click",
          href: "/services/digital-marketing/pay-per-click",
        },
        {
          label: "Amazon Marketing",
          href: "/services/digital-marketing/amazon-marketing",
        },
      ],
    },
    {
      id: "amazon",
      label: "Amazon",
      href: "https://zevitechautomation.com",
      children: [],
    },
  ],
};

export const ContactOptions = [
  {
    icon: MdContactMail,
    text: "Contact Us",
    href: "/contact-us",
  },
  {
    icon: FaPhoneSquareAlt,
    text: "Call Now",
    href: "tel:(302) 217-6872",
  },
  {
    icon: Handshake,
    text: "About Us",
    href: "/about-us",
  },
  {
    icon: MdMarkEmailRead,
    text: "Email Us",
    href: "mailto:support@zevitech.com",
  },
];

export const navigationItems = [
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Portfolio", href: "/portfolio" },
];

export const allNavigationItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  ...navigationItems,
];
