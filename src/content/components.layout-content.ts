import {
  Facebook,
  Handshake,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdContactMail, MdMarkEmailRead } from "react-icons/md";

export const HeaderNavLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about-us",
  },
  {
    title: "Our Services",
    href: "#",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
];

export const HeaderServicesNavLinkContent = [
  {
    title: "Branding & Design",
    subMenu: [
      {
        title: "Logo Design",
        menu: [
          {
            title: "2D Logo Design",
            href: "/services/branding-design/logo-design/2d-design",
          },

          {
            title: "3D Logo Design",
            href: "/services/branding-design/logo-design/3d-design",
          },

          {
            title: "Animated Logo Design",
            href: "/services/branding-design/logo-design/animated-design",
          },

          {
            title: "Minimal Logo Design",
            href: "/services/branding-design/logo-design/minimal-design",
          },

          {
            title: "Mascot Logo Design",
            href: "/services/branding-design/logo-design/mascot-design",
          },

          {
            title: "Wordmark Logo Design",
            href: "/services/branding-design/logo-design/wordmark-design",
          },

          {
            title: "Customize Logo Design",
            href: "/services/branding-design/logo-design/customize-design",
          },
        ],
      },

      {
        title: "Brand Identity Design",
        href: "/services/branding-design/brand-identity-design",
      },

      {
        title: "Product Packaging & Label Design",
        href: "/services/branding-design/product-packaging-label-design",
      },

      {
        title: "Social Media Kit Design",
        href: "/services/branding-design/social-media-kit-design",
      },
    ],
  },

  {
    title: "Website Development",
    subMenu: [
      {
        title: "E-Commerce Website",
        menu: [
          {
            title: "Shopify Development",
            href: "/landing/shopify-development",
          },

          // {
          //   title: "WooCommerce Development",
          //   href: "/services/website-development/ecommerce-website/woocommerce-development",
          // },

          // {
          //   title: "Custom Development",
          //   href: "/services/website-development/ecommerce-website/custom-development",
          // },
        ],
      },

      // {
      //   title: "Business Website",
      //   href: "/services/website-development/business-website-development",
      // },

      // {
      //   title: "SaaS Web App Development",
      //   href: "/services/website-development/saas-web-app-development",
      // },

      // {
      //   title: "Landing Page Development",
      //   href: "/services/website-development/landing-page-development",
      // },

      // {
      //   title: "Website Redesign & Optimization",
      //   href: "/services/website-development/website-redesign-optimization",
      // },

      // {
      //   title: "Website Maintenance & Support",
      //   href: "/services/website-development/website-maintenance-support",
      // },
    ],
  },

  // {
  //   title: "Mobile App Development",
  //   subMenu: [
  //     {
  //       title: "Hybrid App Development",
  //       menu: [
  //         {
  //           title: "Flutter Development",
  //           href: "/services/mobile-app-development/hybrid-app-development/flutter-development",
  //         },

  //         {
  //           title: "React Native Development",
  //           href: "/services/mobile-app-development/hybrid-app-development/react-native-development",
  //         },
  //       ],
  //     },

  //     {
  //       title: "iOS & Android App Development",
  //       href: "/services/mobile-app-development/ios-android-app-development",
  //     },

  //     {
  //       title: "App UI/UX Design",
  //       href: "/services/mobile-app-development/app-ui-ux-design",
  //     },

  //     {
  //       title: "App Store Optimization (ASO)",
  //       href: "/services/mobile-app-development/app-store-optimization",
  //     },

  //     {
  //       title: "App Maintenance & Updates",
  //       href: "/services/mobile-app-development/app-maintenance-updates",
  //     },
  //   ],
  // },

  // {
  //   title: "E-commerce Automation Stores",
  //   subMenu: [
  //     {
  //       title: "Amazon Automation",
  //       menu: [
  //         {
  //           title: "Amazon FBA",
  //           href: "/services/ecommerce-automation-stores/amazon/fba",
  //         },
  //         {
  //           title: "Amazon FBM",
  //           href: "/services/ecommerce-automation-stores/amazon/fbm",
  //         },
  //         {
  //           title: "Amazon Private Label",
  //           href: "/services/ecommerce-automation-stores/amazon/private-label",
  //         },
  //         {
  //           title: "Amazon Online Arbitrage",
  //           href: "/services/ecommerce-automation-stores/amazon/online-arbitrage",
  //         },
  //         {
  //           title: "Amazon Listing Optimization",
  //           href: "/services/ecommerce-automation-stores/amazon/listing-optimization",
  //         },
  //         {
  //           title: "Amazon Account Management",
  //           href: "/services/ecommerce-automation-stores/amazon/account-management",
  //         },
  //       ],
  //     },

  //     {
  //       title: "eBay Automation",
  //       menu: [
  //         {
  //           title: "eBay Dropshipping",
  //           href: "/services/ecommerce-automation-stores/ebay/dropshipping",
  //         },
  //         {
  //           title: "eBay Product Listing",
  //           href: "/services/ecommerce-automation-stores/ebay/product-listing",
  //         },
  //         {
  //           title: "eBay Store Optimization",
  //           href: "/services/ecommerce-automation-stores/ebay/store-optimization",
  //         },
  //         {
  //           title: "eBay Account Management",
  //           href: "/services/ecommerce-automation-stores/ebay/account-management",
  //         },
  //       ],
  //     },

  //     {
  //       title: "Walmart Automation",
  //       menu: [
  //         {
  //           title: "Walmart FBA (WFS)",
  //           href: "/services/ecommerce-automation-stores/walmart/wfs",
  //         },
  //         {
  //           title: "Walmart Dropshipping",
  //           href: "/services/ecommerce-automation-stores/walmart/dropshipping",
  //         },
  //         {
  //           title: "Walmart Listing Optimization",
  //           href: "/services/ecommerce-automation-stores/walmart/listing-optimization",
  //         },
  //         {
  //           title: "Walmart Account Management",
  //           href: "/services/ecommerce-automation-stores/walmart/account-management",
  //         },
  //       ],
  //     },

  //     {
  //       title: "Multi-Channel Store Management",
  //       href: "/services/ecommerce-automation-stores/multi-channel-store-management",
  //     },

  //     {
  //       title: "Marketplace Advertising & PPC",
  //       href: "/services/ecommerce-automation-stores/marketplace-advertising-ppc",
  //     },

  //     {
  //       title: "Product Content & Listing Optimization",
  //       href: "/services/ecommerce-automation-stores/product-listing-optimization",
  //     },
  //   ],
  // },

  // {
  //   title: "Video & Media Production",
  //   subMenu: [
  //     {
  //       title: "Video Editing",
  //       menu: [
  //         { title: "360 Video Editing", href: "/services/video-media-production/video-editing/360-video-editing" },
  //         { title: "Corporate Videos", href: "/services/video-media-production/video-editing/corporate-videos" },
  //         { title: "Edius Pro Editing", href: "/services/video-media-production/video-editing/edius-pro-editing" },
  //         { title: "Film Re-editing", href: "/services/video-media-production/video-editing/film-re-editing" },
  //         { title: "Final Cut Editing", href: "/services/video-media-production/video-editing/final-cut-editing" },
  //         { title: "Real Estate Video Editing", href: "/services/video-media-production/video-editing/real-estate-video-editing" },
  //         { title: "Holiday Vacation Video", href: "/services/video-media-production/video-editing/holiday-vacation-video" },
  //         { title: "Interview Video Editing", href: "/services/video-media-production/video-editing/interview-video-editing" },
  //         { title: "Premiere Pro Editing", href: "/services/video-media-production/video-editing/premiere-pro-editing" },
  //         { title: "Product Video Editing", href: "/services/video-media-production/video-editing/product-video-editing" },
  //         { title: "Real Estate Video Tour", href: "/services/video-media-production/video-editing/real-estate-video-tour" },
  //         { title: "YouTube Video Editing", href: "/services/video-media-production/video-editing/youtube-video-editing" },
  //         { title: "Sale Pitch Video Editing", href: "/services/video-media-production/video-editing/sale-pitch-video-editing" },
  //         { title: "Sports Video Editing", href: "/services/video-media-production/video-editing/sports-video-editing" },
  //         { title: "Testimonial Video Editing", href: "/services/video-media-production/video-editing/testimonial-video-editing" },
  //         { title: "Video Brochure", href: "/services/video-media-production/video-editing/video-brochure" },
  //         { title: "Video Clipping", href: "/services/video-media-production/video-editing/video-clipping" },
  //         { title: "Commercial Video Editing", href: "/services/video-media-production/video-editing/commercial-video-editing" },
  //         { title: "Video Stabilizing", href: "/services/video-media-production/video-editing/video-stabilizing" },
  //         { title: "Video Summary", href: "/services/video-media-production/video-editing/video-summary" },
  //         { title: "Video Tagging", href: "/services/video-media-production/video-editing/video-tagging" },
  //         { title: "Virtual Reality Post-Production", href: "/services/video-media-production/video-editing/virtual-reality-post-production" },
  //         { title: "Wedding Video Editing", href: "/services/video-media-production/video-editing/wedding-video-editing" },
  //         { title: "Adobe After Effects Editing", href: "/services/video-media-production/video-editing/adobe-after-effects-editing" }
  //       ]
  //     },

  //     {
  //       title: "Audio Editing",
  //       menu: [
  //         { title: "Corporate Audio", href: "/services/video-media-production/audio-editing/corporate-audio" },
  //         { title: "Radio Programs", href: "/services/video-media-production/audio-editing/radio-programs" },
  //         { title: "Music Editing & Mixing", href: "/services/video-media-production/audio-editing/music-editing-mixing" },
  //         { title: "Audio Conversion", href: "/services/video-media-production/audio-editing/audio-conversion" },
  //         { title: "Ad Jingle Creation", href: "/services/video-media-production/audio-editing/ad-jingle-creation" },
  //         { title: "Podcasts Editing", href: "/services/video-media-production/audio-editing/podcasts-editing" },
  //         { title: "Soundtrack Pro", href: "/services/video-media-production/audio-editing/soundtrack-pro" },
  //         { title: "Adobe Audition", href: "/services/video-media-production/audio-editing/adobe-audition" }
  //       ]
  //     },

  //     {
  //       title: "Storyboard",
  //       menu: [
  //         { title: "Corporate Audio", href: "/services/video-media-production/story-board/cartoon-storyboard" },
  //         { title: "Corporate Audio", href: "/services/video-media-production/story-board/character-creation" },
  //         { title: "Comic Book Storyboard", href: "/services/video-media-production/story-board/comic-book-storyboard" },
  //         { title: "E-Learning Storyboard", href: "/services/video-media-production/story-board/e-learning-storyboard" },
  //         { title: "Corporate Audio", href: "/services/video-media-production/story-board/illustration-storyboard" },
  //         { title: "Corporate Audio", href: "/services/video-media-production/story-board/photomatic-storyboard" },
  //         { title: "Corporate Audio", href: "/services/video-media-production/story-board/storyboard-animatics" },
  //         { title: "Corporate Audio", href: "/services/video-media-production/story-board/video-game-storyboard" },
  //       ]
  //     },

  //     // {
  //     //   title: "Animated Explainer Videos",
  //     //   href: "/services/video-media-production/animated-explainer-videos",
  //     // },

  //     // {
  //     //   title: "Logo Animations",
  //     //   href: "/services/video-media-production/logo-animations",
  //     // },

  //     // {
  //     //   title: "Reels & Short-form Content Creation",
  //     //   href: "/services/video-media-production/reels-short-form-content-creation",
  //     // },

  //     // {
  //     //   title: "Motion Graphics",
  //     //   href: "/services/video-media-production/motion-graphics",
  //     // },

  //     // {
  //     //   title: "YouTube Automation Videos",
  //     //   href: "/services/video-media-production/youtube-automation-videos",
  //     // },
  //   ],
  // },

  // {
  //   title: "Book Publishing",
  //   subMenu: [
  //     {
  //       title: "Print & Digital Publishing",
  //       href: "/services/book-publishing/print-digital-publishing",
  //     },

  //     {
  //       title: "Amazon KDP Publishing",
  //       href: "/services/book-publishing/amazon-kdp-publishing",
  //     },

  //     {
  //       title: "ISBN Registration",
  //       href: "/services/book-publishing/isbn-registration",
  //     },

  //     {
  //       title: "Book Cover & Interior Design",
  //       href: "/services/book-publishing/book-cover-interior-design",
  //     },

  //     {
  //       title: "Editing & Proofreading",
  //       href: "/services/book-publishing/editing-proofreading",
  //     },

  //     {
  //       title: "Author Website & Branding",
  //       href: "/services/book-publishing/author-website-branding",
  //     },

  //     {
  //       title: "Marketing & Distribution Services",
  //       href: "/services/book-publishing/marketing-distribution-services",
  //     },
  //   ],
  // },
];

export const companyLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Pricing", href: "/pricing" },
];

export const serviceLinks = [
  {
    name: "Logo Design",
    href: "/services/branding-design/logo-design/2d-design",
  },
  {
    name: "Brand Identity Design",
    href: "/services/branding-design/brand-identity-design",
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
  {
    icon: Linkedin,
    name: "LinkedIn",
    url: "https://uk.linkedin.com/company/zevitech",
  },
];

export const Footerconfig = {
  companyName: "ZeviTech",
  year: "2025",
  location: "Florida & Georgia",
  contactEmail: "support@zevitech.com",
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
    href: "tel:(302) 217-6211",
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

// Mobile Navbar Content
export const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
   { name: "Pricing", href: "/pricing" },
];

export const brandingServices = {
  logoDesign: [
    {
      name: "2D Logo Design",
      href: "/services/branding-design/logo-design/2d-design",
    },
    {
      name: "3D Logo Design",
      href: "/services/branding-design/logo-design/3d-design",
    },
    {
      name: "Animated Logo Design",
      href: "/services/branding-design/logo-design/animated-design",
    },
    {
      name: "Minimal Logo Design",
      href: "/services/branding-design/logo-design/minimal-design",
    },
    {
      name: "Mascot Logo Design",
      href: "/services/branding-design/logo-design/mascot-design",
    },
    {
      name: "Wordmark Logo Design",
      href: "/services/branding-design/logo-design/wordmark-design",
    },
    {
      name: "Customize Logo Design",
      href: "/services/branding-design/logo-design/customize-design",
    },
  ],

  separateServices: [
    {
      name: "Brand Identity Design",
      href: "/services/branding-design/brand-identity-design",
    },
    {
      name: "Product Packaging & Label Design",
      href: "/services/branding-design/product-packaging-label-design",
    },
    {
      name: "Social Media Kit Design",
      href: "/services/branding-design/social-media-kit-design",
    },
  ],
};

export const websiteServices = {
  ecommerce: [
    {
      name: "Shopify Development",
      href: "/landing/shopify-development",
    },
  ],
};
