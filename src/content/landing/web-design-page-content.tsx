import PortfolioWebDesignImg01 from "../../../public/images/services/design-and-development/portfolio-wordpress-img01.png";
import PortfolioWebDesignImg02 from "../../../public/images/services/design-and-development/portfolio-php-website-img06.png";
import PortfolioWebDesignImg03 from "../../../public/images/services/design-and-development/portfolio-wordpress-img04.png";
import PortfolioWebDesignImg04 from "../../../public/images/services/e-commerce/portfolio-magento-website-img04.png";
import PortfolioWebDesignImg05 from "../../../public/images/services/e-commerce/portfolio-custom-ecommerce02.png";
import PortfolioWebDesignImg06 from "../../../public/images/services/e-commerce/why-choose-open-cart-06.jpg";

import {
  Crown,
  Zap,
  Building2,
  ShoppingCart,
  Store,
  Sparkles,
} from "lucide-react";

export const websitePricingData = {
  websiteDesign: [
    {
      plan: "Starter Website",
      price: 999,
      currency: "AED",
      features: [
        "1–3 Pages",
        "Custom Home Page",
        "Mobile Responsive",
        "Basic Contact Form",
        "SEO-Friendly Structure",
        "SSL Setup",
        "Speed Optimization",
        "2 Revisions",
      ],
      logoDesign: ["Basic Logo (1 Concept + 1 Revision)"],
      isFeatured: false,
      badge: "",
      icon: Zap,
    },
    {
      plan: "Professional Website",
      price: 3699,
      currency: "AED",
      features: [
        "5–7 Pages",
        "Premium UI/UX",
        "Fully Responsive",
        "Advanced Contact Form",
        "Social Media Integration",
        "On-Page SEO",
        "Blog Section",
        "Stock Images",
        "4 Revisions",
      ],
      logoDesign: ["Standard Logo (2 Concepts + PNG/JPG + 2 Revisions)"],
      isFeatured: true,
      badge: "Most Popular",
      icon: Crown,
    },
    {
      plan: "Premium Corporate Website",
      price: 4799,
      currency: "AED",
      features: [
        "Up to 12 Pages",
        "Custom Figma Design",
        "Multi-Language Support",
        "Speed Score 90+",
        "Security Optimization",
        "Advanced Animations",
        "Blog + Portfolio",
        "Monthly Backup Setup",
        "6 Revisions",
      ],
      logoDesign: [
        "Premium Logo (3 Concepts + Color Palette + Typography + 3 Revisions)",
      ],
      isFeatured: false,
      badge: "",
      icon: Building2,
    },
    {
      plan: "Ecommerce Starter",
      price: 8199,
      currency: "AED",
      features: [
        "Up to 20 Products",
        "Shopping Cart + Wishlist",
        "Secure Checkout",
        "Payment Gateway Integration",
        "Categories Setup",
        "Coupons & Discounts",
        "Product Variations",
        "Basic SEO",
        "3 Revisions",
        "1 month free maintenance",
      ],
      logoDesign: ["Standard Logo (2 Concepts + 2 Revisions)"],
      isFeatured: false,
      badge: "",
      icon: ShoppingCart,
    },
    {
      plan: "Ecommerce Business",
      price: 13799,
      currency: "AED",
      features: [
        "Up to 100 Products",
        "Premium Store UI/UX",
        "Advanced Filters",
        "Live Chat Integration",
        "Shipping Setup",
        "Product Reviews",
        "Abandoned Cart",
        "Advanced SEO",
        "Blog Section",
        "Speed Optimization",
        "5 Revisions",
        "2 month free maintenance",
      ],
      logoDesign: ["Premium Logo (3 Concepts + Brand Kit + 3 Revisions)"],
      isFeatured: true,
      badge: "Best Value",
      icon: Store,
    },
    {
      plan: "Custom Website Package",
      price: "Custom Quote",
      currency: "AED",
      features: [
        "Fully Custom Website (No Page Limit)",
        "Tailored UI/UX designed 100% from scratch in Figma",
        "Unlimited Sections & Advanced Animations",
        "Custom-Built Features (as per requirements)",
        "Integration with APIs / CRM / Custom Systems",
        "Multi-Language Setup",
        "High-Speed Optimization (95+ Score)",
        "Advanced Security Hardening",
        "Priority Support",
        "Dedicated Project Manager",
        "Unlimited Revisions (during design phase)",
      ],
      logoDesign: [
        "Exclusive Logo (4 Concepts)",
        "Full Brand Guidelines (Colors, Fonts, Logo Usage)",
        "Social Media DP + Cover",
        "All File Formats (AI, SVG, PNG, JPG)",
      ],
      isFeatured: false,
      badge: "Enterprise",
      icon: Sparkles,
    },
  ],
};

export const landingWebDesignServices = [
  {
    title: "UI / UX",
    description:
      "Discover UI/UX solutions with best practices and leading expertise to elevate your digital presence and user experience.",
    ctaText: "Enquire Now",
    ctaHref: "/contact-us",
  },
  {
    title: "Responsive Design",
    description:
      "Responsive Design expert delivering great user experiences, best-in-class functionality, and optimal performance.",
    ctaText: "Enquire Now",
    ctaHref: "/contact-us",
  },
  {
    title: "Mobile-First Web Design",
    description:
      "Mobile-first web design that is fast, responsive, and user-friendly for modern audiences.",
    ctaText: "Enquire Now",
    ctaHref: "/contact-us",
  },
  {
    title: "E-commerce Web Design",
    description:
      "Responsive, user-friendly online stores with secure, fast-loading pages and seamless checkout to boost sales.",
    ctaText: "Enquire Now",
    ctaHref: "/contact-us",
  },
  {
    title: "Landing Page Design",
    description:
      "High-converting, responsive landing pages tailored to your marketing goals to capture leads and boost conversions.",
    ctaText: "Enquire Now",
    ctaHref: "/contact-us",
  },
  {
    title: "Portfolio & Personal Website Design",
    description:
      "Stunning, responsive personal sites and portfolios to showcase your work, enhance your online presence, and attract clients.",
    ctaText: "Enquire Now",
    ctaHref: "/contact-us",
  },
  {
    title: "Website Redesign & Optimization",
    description:
      "Revamp your existing website with modern UI, improved UX, faster load times, and SEO-friendly performance that drives measurable results.",
    ctaText: "Enquire Now",
    ctaHref: "/contact-us",
  },
  {
    title: "Custom Web Applications",
    description:
      "Build tailored web applications integrated with your workflows—secure, scalable, and aligned to your business goals.",
    ctaText: "Enquire Now",
    ctaHref: "/contact-us",
  },
];

// Web Design Portfolio

export const WebDesignPortfolioData = [
  { img: PortfolioWebDesignImg01, alt: "client-01" },
  { img: PortfolioWebDesignImg02, alt: "client-02" },
  { img: PortfolioWebDesignImg03, alt: "client-03" },
  { img: PortfolioWebDesignImg04, alt: "client-04" },
  { img: PortfolioWebDesignImg05, alt: "client-05" },
  { img: PortfolioWebDesignImg06, alt: "client-06" },
];
