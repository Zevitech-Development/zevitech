import logo2dImg from "../../../../public/images/services/branding/2d-logo-portfolio-21.jpg";
import logo3dImg from "../../../../public/images/services/branding/why-choose-us-2d-01.png";
import AnimatedImg from "../../../../public/images/services/branding/why-choose-us-animated-01.jpg";
import MascotImg from "../../../../public/images/services/branding/why-choose-us-mascot-03.jpg";
import MinimalLogoImg from "../../../../public/images/services/branding/2d-logo-portfolio-04.webp";
import WordmarkImg from "../../../../public/images/services/branding/customize-logo-portfolio-41.jpg";
import CustomizeImg from "../../../../public/images/services/branding/why-choose-us-customize-03.jpg";

import MarqueeLogoImg01 from "../../../../public/images/services/branding/2d-logo-portfolio-13.jpg";
import MarqueeLogoImg02 from "../../../../public/images/services/branding/2d-logo-portfolio-45.png";
import MarqueeLogoImg03 from "../../../../public/images/services/branding/2d-logo-portfolio-15.jpg";
import MarqueeLogoImg04 from "../../../../public/images/services/branding/2d-logo-portfolio-16.jpg";
import MarqueeLogoImg05 from "../../../../public/images/services/branding/2d-logo-portfolio-46.png";
import MarqueeLogoImg06 from "../../../../public/images/services/branding/why-choose-us-wordmark-04.webp";
import MarqueeLogoImg07 from "../../../../public/images/services/branding/mascot-logo-portfolio-45.png";
import MarqueeLogoImg08 from "../../../../public/images/services/branding/2d-logo-portfolio-20.png";
import MarqueeLogoImg09 from "../../../../public/images/services/branding/2d-logo-portfolio-28.jpg";
import MarqueeLogoImg10 from "../../../../public/images/services/branding/2d-logo-portfolio-41.png";
// Import your portfolio data
import {
  Portfolio2DLogoDesignContent,
  Portfolio3DLogoDesignContent,
  PortfolioAnimatedLogoDesignContent,
  PortfolioMascotLogoDesignContent,
  PortfolioMinimalLogoDesignContent,
  PortfolioWordmarkLogoDesignContent,
  PortfolioCustomizeLogoDesignContent,
} from "@/content/services/branding-content";

import { Search, Brush, Sparkles, MessageSquare, Rocket } from "lucide-react";
import { CheckCircle, Zap, Clock } from "lucide-react";
import { Gem, Crown, Briefcase } from "lucide-react";

import { LogoDesignService } from "@/interfaces/logo-landing-interface";

export const logoDesignServices: LogoDesignService[] = [
  {
    id: 1,
    name: "2D Logo Design",
    category: "Creative Branding",
    profile: logo2dImg,
    href: "/landing-pages/logo-design/2d-design",
  },
  {
    id: 2,
    name: "3D Logo Design",
    category: "Visual Identity",
    profile: logo3dImg,
    href: "/landing-pages/logo-design/3d-design",
  },
  {
    id: 3,
    name: "Animated Logo Design",
    category: "Motion Branding",
    profile: AnimatedImg,
    href: "/landing-pages/logo-design/animated-design",
  },
  {
    id: 4,
    name: "Minimal Logo Design",
    category: "Elegant Simplicity",
    profile: MinimalLogoImg,
    href: "/landing-pages/logo-design/minimal-design",
  },
  {
    id: 5,
    name: "Mascot Logo Design",
    category: "Character Branding",
    profile: MascotImg,
    href: "/landing-pages/logo-design/mascot-design",
  },
  {
    id: 6,
    name: "Wordmark Logo Design",
    category: "Typography Branding",
    profile: WordmarkImg,
    href: "/landing-pages/logo-design/wordmark-design",
  },
  {
    id: 7,
    name: "Custom Logo Design",
    category: "Tailored Identity",
    profile: CustomizeImg,
    href: "/landing-pages/logo-design/customize-design",
  },
];

// Logo Brand Identity
export const features = [
  { icon: CheckCircle, title: "100% Satisfaction Guaranteed" },
  { icon: Zap, title: "Unique Design Guaranteed" },
  { icon: Clock, title: "24/7 Design Consultancy" },
];

// Logo Design Process Data
export const logoDesignProcessData = [
  {
    title: "Discovery & Research",
    icon: <Search className="w-6 h-6" />,
    description:
      "We start by understanding your brand, audience, and competition. This helps us define the visual direction and tone that perfectly fits your business identity.",
  },
  {
    title: "Concept Creation",
    icon: <Brush className="w-6 h-6" />,
    description:
      "Our designers brainstorm and craft unique logo concepts that combine creativity and strategic thinking to reflect your brand’s personality.",
  },
  {
    title: "Design Refinement",
    icon: <Sparkles className="w-6 h-6" />,
    description:
      "We refine the best concepts with attention to detail — from shapes and spacing to color psychology — ensuring a logo that’s both beautiful and balanced.",
  },
  {
    title: "Feedback & Revisions",
    icon: <MessageSquare className="w-6 h-6" />,
    description:
      "Your feedback matters. We collaborate closely with you to make adjustments and improvements until the design aligns perfectly with your vision.",
  },
  {
    title: "Final Delivery",
    icon: <Rocket className="w-6 h-6" />,
    description:
      "Once approved, we deliver all final logo files in multiple formats, ensuring readiness for print, digital, and branding use across all platforms.",
  },
];

// Logo categories with their portfolio data
export const logoCategories = [
  {
    id: "logo2d",
    name: "2D Logo Design",
    portfolioImages: Portfolio2DLogoDesignContent,
  },
  {
    id: "logo3d",
    name: "3D Logo Design",
    portfolioImages: Portfolio3DLogoDesignContent,
  },
  {
    id: "logoAnimated",
    name: "Animated Logo Design",
    portfolioImages: PortfolioAnimatedLogoDesignContent,
  },
  {
    id: "logoMinimal",
    name: "Minimal Logo Design",
    portfolioImages: PortfolioMinimalLogoDesignContent,
  },
  {
    id: "logoMascot",
    name: "Mascot Logo Design",
    portfolioImages: PortfolioMascotLogoDesignContent,
  },
  {
    id: "logoWordmark",
    name: "Wordmark Logo Design",
    portfolioImages: PortfolioWordmarkLogoDesignContent,
  },
  {
    id: "logoCustom",
    name: "Customize Logo Design",
    portfolioImages: PortfolioCustomizeLogoDesignContent,
  },
];

export const FaqDataLogoDesign = [
  {
    id: "logo-design-importance",
    question: "Why is a professional logo important for my business?",
    answer:
      "A professional logo builds brand recognition, establishes trust, and communicates your business identity effectively. It helps your brand stand out and leaves a lasting impression on your audience.",
  },
  {
    id: "logo-design-process",
    question: "What is your logo design process?",
    answer:
      "Our process begins with understanding your brand, audience, and goals. We then create concepts, refine the best design, and ensure it aligns with your brand identity and visual style.",
  },
  {
    id: "logo-design-types",
    question: "What types of logos do you create?",
    answer:
      "We craft a diverse range of logo styles — including 2D, 3D, animated, wordmark, mascot, custom, and minimal designs — each thoughtfully tailored to reflect your brand’s personality, vision, and industry.",
  },
  {
    id: "logo-design-industry",
    question: "Do you design logos for specific industries?",
    answer:
      "Yes, we design logos across various industries such as technology, fashion, real estate, food, healthcare, and entertainment — ensuring each design fits the target audience and market trends.",
  },
  {
    id: "logo-design-branding",
    question: "Can you help with complete branding along with my logo?",
    answer:
      "Absolutely. Along with logo design, we offer complete brand identity solutions including color palettes, typography, and brand guidelines to create a cohesive and memorable visual identity.",
  },
];

// Logo Marquee Data
export const logoMarqueeData = [
  {
    logoImg: MarqueeLogoImg01,
  },
  {
    logoImg: MarqueeLogoImg02,
  },
  {
    logoImg: MarqueeLogoImg03,
  },
  {
    logoImg: MarqueeLogoImg04,
  },
  {
    logoImg: MarqueeLogoImg05,
  },
  {
    logoImg: MarqueeLogoImg06,
  },
  {
    logoImg: MarqueeLogoImg07,
  },
  {
    logoImg: MarqueeLogoImg08,
  },
  {
    logoImg: MarqueeLogoImg09,
  },
  {
    logoImg: MarqueeLogoImg10,
  },
];

// Pricing Data
export const logoPricingData = {
  twoDLogoDesign: [
    {
      plan: "Silver",
      price: 59,
      description:
        "Perfect for startups looking for a simple and creative 2D logo.",
      features: [
        "2 Logo Concepts",
        "3 Revisions",
        "Custom Logo Design",
        "Vector PDF File",
        "48 Hours Delivery",
        "HQ PNG + JPEG",
        "100% Ownership",
      ],
      isFeatured: false,
      icon: Gem,
    },
    {
      plan: "Gold",
      price: 99,
      description:
        "Great for small businesses seeking professional-quality 2D logos.",
      features: [
        "4 Logo Concepts",
        "Unlimited Revisions",
        "Custom Logo Design",
        "Vector EPS, PDF file",
        "24–48 H Delivery",
        "HQ PNG + JPEG",
        "100% Ownership",
      ],
      isFeatured: true,
      badge: "Most Popular",
      icon: Crown,
    },
    {
      plan: "Platinum",
      price: 139,
      description:
        "A premium package for brands wanting a refined, timeless 2D identity.",
      features: [
        "6 Logo Concepts",
        "Unlimited Revisions",
        "Custom Logo Design",
        "Editable Vector Ai File",
        "24–48 H Delivery",
        "HQ PNG + JPEG",
        "100% Ownership",
        "Business Card Design",
      ],
      isFeatured: false,
      icon: Zap,
    },
    {
      plan: "Custom-Package",
      price: "Custom Quote",
      description:
        "Fully tailored 2D logo design solutions with brand consultation and flexible deliverables.",
      features: [
        "Fully tailored logo design package",
        "Flexible deliverables & timelines",
        "Dedicated creative director",
        "Pricing based on project scope",
        "Comprehensive brand consultation",
        "Multiple concept explorations",
        "Priority design revisions",
        "Complete brand identity coverage",
        "Strategic market research integration",
      ],
      isFeatured: true,
      badge: "Enterprise",
      icon: Briefcase,
    },
  ],
  threeDLogoDesign: [
    {
      plan: "Silver",
      price: 89,
      description:
        "Great for individuals exploring 3D depth in their brand logo.",
      features: [
        "1 3D Logo Mockup",
        "2 Revisions",
        "Basic Lighting Effects",
        "PNG + JPEG Files",
        "72 Hours Delivery",
        "100% Ownership",
      ],
      isFeatured: false,
      icon: Gem,
    },
    {
      plan: "Gold",
      price: 139,
      description:
        "Perfect for brands wanting modern, realistic 3D logo visuals.",
      features: [
        "2 3D Mockups",
        "Unlimited Revisions",
        "Source File Included",
        "24–48 H Delivery",
        "HQ PNG + JPEG",
        "Vector EPS File",
        "100% Ownership",
      ],
      isFeatured: true,
      badge: "Most Popular",
      icon: Crown,
    },
    {
      plan: "Platinum",
      price: 189,
      description:
        "Advanced 3D branding with full texture and motion previews.",
      features: [
        "3 Detailed 3D Mockups",
        "Unlimited Revisions",
        "Custom Texturing & Shadows",
        "Editable Vector Ai File",
        "Priority Delivery",
        "HQ PNG + JPEG",
        "Ownership Rights",
      ],
      isFeatured: false,
      icon: Zap,
    },
    {
      plan: "Custom-Package",
      price: "Custom Quote",
      description:
        "End-to-end 3D branding with multiple perspectives and motion-ready deliverables.",
      features: [
        "Fully tailored 3D branding suite",
        "Flexible deliverables & timelines",
        "Dedicated creative director",
        "Pricing based on project scope",
        "Advanced rendering & texturing",
        "Multiple perspective explorations",
        "Priority design revisions",
        "Full motion-ready setup",
        "Strategic creative consultation",
      ],
      isFeatured: true,
      badge: "Enterprise",
      icon: Briefcase,
    },
  ],
  animatedLogoDesign: [
    {
      plan: "Silver",
      price: 99,
      description:
        "A great start for simple and engaging animated logo reveals.",
      features: [
        "1 Logo Animation (5s)",
        "Basic Motion Transitions",
        "MP4 Format",
        "HD Quality Output",
        "72 Hours Delivery",
        "2 Revisions",
      ],
      isFeatured: false,
      icon: Gem,
    },
    {
      plan: "Gold",
      price: 159,
      description:
        "Ideal for small businesses wanting dynamic motion branding.",
      features: [
        "2 Logo Animations (10s)",
        "Sound FX Included",
        "Unlimited Revisions",
        "Source File Included",
        "24–48 H Delivery",
        "HQ MP4 + MOV",
        "Ownership Rights",
      ],
      isFeatured: true,
      badge: "Most Popular",
      icon: Crown,
    },
    {
      plan: "Platinum",
      price: 229,
      description:
        "Comprehensive motion identity with custom animation scripts and HD renders.",
      features: [
        "Custom Motion Script",
        "HD Rendering",
        "Full Source Files",
        "Sound FX + Transitions",
        "Priority Delivery",
        "Unlimited Revisions",
        "Logo Reveal + Outro Versions",
      ],
      isFeatured: false,
      icon: Zap,
    },
    {
      plan: "Custom-Package",
      price: "Custom Quote",
      description:
        "Custom motion branding suite for premium animated logo experiences.",
      features: [
        "Fully tailored motion branding",
        "Flexible deliverables & timelines",
        "Dedicated motion designer",
        "Pricing based on project scope",
        "Sound + Visual direction consultation",
        "Multiple animation style explorations",
        "Priority rendering support",
        "Complete motion identity coverage",
      ],
      isFeatured: true,
      badge: "Enterprise",
      icon: Briefcase,
    },
  ],
  minimalLogoDesign: [
    {
      plan: "Silver",
      price: 49,
      description: "Clean and simple logo design for startups and freelancers.",
      features: [
        "2 Logo Concepts",
        "2 Revisions",
        "Minimal Custom Design",
        "PNG + JPEG Files",
        "48 Hours Delivery",
        "Ownership Rights",
      ],
      isFeatured: false,
      icon: Gem,
    },
    {
      plan: "Gold",
      price: 89,
      description:
        "Perfect balance of creativity and simplicity for small brands.",
      features: [
        "4 Logo Concepts",
        "Unlimited Revisions",
        "Custom Vector Design",
        "EPS + PDF Files",
        "24–48 H Delivery",
        "HQ PNG + JPEG",
        "Ownership Rights",
      ],
      isFeatured: true,
      badge: "Most Popular",
      icon: Crown,
    },
    {
      plan: "Platinum",
      price: 129,
      description:
        "Elegant and timeless logos for premium businesses and brands.",
      features: [
        "6 Logo Concepts",
        "Unlimited Revisions",
        "Editable Vector Ai File",
        "Business Card Design",
        "Brand Style Guide",
        "Priority Delivery",
      ],
      isFeatured: false,
      icon: Zap,
    },
    {
      plan: "Custom-Package",
      price: "Custom Quote",
      description:
        "Fully customized minimalist branding crafted with purpose and precision.",
      features: [
        "Fully tailored minimalist logo",
        "Flexible deliverables & timelines",
        "Dedicated creative director",
        "Pricing based on project scope",
        "Comprehensive design consultation",
        "Multiple refined concepts",
        "Priority design revisions",
        "Complete visual identity coverage",
      ],
      isFeatured: true,
      badge: "Enterprise",
      icon: Briefcase,
    },
  ],
  mascotLogoDesign: [
    {
      plan: "Silver",
      price: 99,
      description:
        "Basic character concept to bring personality to your brand.",
      features: [
        "1 Character Concept",
        "2 Revisions",
        "Basic Expressions",
        "PNG + JPEG Files",
        "72 Hours Delivery",
        "Ownership Rights",
      ],
      isFeatured: false,
      icon: Gem,
    },
    {
      plan: "Gold",
      price: 159,
      description:
        "Ideal for brands seeking expressive and detailed mascot characters.",
      features: [
        "2 Character Poses",
        "Unlimited Revisions",
        "Source File Included",
        "EPS + PDF File",
        "48 Hours Delivery",
        "Ownership Rights",
      ],
      isFeatured: true,
      badge: "Most Popular",
      icon: Crown,
    },
    {
      plan: "Platinum",
      price: 229,
      description:
        "Full mascot illustration and brand integration for maximum impact.",
      features: [
        "3 Character Angles (Front, Side, Back)",
        "Unlimited Revisions",
        "Editable Vector Ai",
        "HD PNG + JPEG",
        "Ownership Rights",
        "Priority Delivery",
      ],
      isFeatured: false,
      icon: Zap,
    },
    {
      plan: "Custom-Package",
      price: "Custom Quote",
      description:
        "Multi-character mascot suite tailored to your brand story and visuals.",
      features: [
        "Fully tailored mascot identity",
        "Flexible deliverables & timelines",
        "Dedicated creative director",
        "Pricing based on project scope",
        "Character personality exploration",
        "Multiple pose developments",
        "Priority design revisions",
        "Comprehensive brand illustration coverage",
      ],
      isFeatured: true,
      badge: "Enterprise",
      icon: Briefcase,
    },
  ],
  wordmarkLogoDesign: [
    {
      plan: "Silver",
      price: 59,
      description: "Simple and clean wordmark for startups and small brands.",
      features: [
        "2 Font Concepts",
        "3 Revisions",
        "Basic Typography Design",
        "Vector PDF File",
        "48 Hours Delivery",
        "Ownership Rights",
      ],
      isFeatured: false,
      icon: Gem,
    },
    {
      plan: "Gold",
      price: 99,
      description: "Professional typography-focused logo designs for clarity.",
      features: [
        "4 Font Concepts",
        "Unlimited Revisions",
        "Custom Typography",
        "Vector EPS File",
        "HQ PNG + JPEG",
        "Ownership Rights",
      ],
      isFeatured: true,
      badge: "Most Popular",
      icon: Crown,
    },
    {
      plan: "Platinum",
      price: 139,
      description: "Stylized lettermark with premium type detailing and files.",
      features: [
        "6 Concepts",
        "Unlimited Revisions",
        "Editable Vector Ai",
        "Business Card Design",
        "Ownership Rights",
        "Priority Delivery",
      ],
      isFeatured: false,
      icon: Zap,
    },
    {
      plan: "Custom-Package",
      price: "Custom Quote",
      description:
        "End-to-end typographic identity with custom lettering and strategy.",
      features: [
        "Fully tailored typographic logo",
        "Flexible deliverables & timelines",
        "Dedicated creative director",
        "Pricing based on project scope",
        "Custom font creation",
        "Advanced typographic exploration",
        "Priority design revisions",
        "Full visual identity alignment",
      ],
      isFeatured: true,
      badge: "Enterprise",
      icon: Briefcase,
    },
  ],
  customizeLogoDesign: [
    {
      plan: "Silver",
      price: 79,
      description: "Basic customized logo designed to match your brief.",
      features: [
        "2 Tailored Concepts",
        "3 Revisions",
        "Custom Design Based on Brief",
        "Vector PDF File",
        "48 Hours Delivery",
        "HQ PNG + JPEG",
        "Ownership Rights",
      ],
      isFeatured: false,
      icon: Gem,
    },
    {
      plan: "Gold",
      price: 129,
      description:
        "Perfect for brands needing versatile and creative custom logos.",
      features: [
        "4 Custom Concepts",
        "Unlimited Revisions",
        "Vector EPS, PDF File",
        "24–48 H Delivery",
        "HQ PNG + JPEG",
        "100% Ownership",
      ],
      isFeatured: true,
      badge: "Most Popular",
      icon: Crown,
    },
    {
      plan: "Platinum",
      price: 179,
      description:
        "Advanced custom logo design for brands seeking distinctive visual presence.",
      features: [
        "6 Tailored Concepts",
        "Unlimited Revisions",
        "Editable Vector Ai",
        "Priority Delivery",
        "HQ PNG + JPEG",
        "Ownership Rights",
        "Brand Kit Included",
      ],
      isFeatured: false,
      icon: Zap,
    },
    {
      plan: "Custom-Package",
      price: "Custom Quote",
      description:
        "Collaborative design experience with a creative director for a bespoke logo.",
      features: [
        "Fully tailored logo design package",
        "Flexible deliverables & timelines",
        "Dedicated creative director",
        "Pricing based on project scope",
        "Comprehensive brand consultation",
        "Multiple concept explorations",
        "Priority design revisions",
        "Complete brand identity coverage",
        "Strategic market research integration",
      ],
      isFeatured: true,
      badge: "Enterprise",
      icon: Briefcase,
    },
  ],
};
