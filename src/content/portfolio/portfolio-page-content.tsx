import Img01 from "../../../public/images/crypto-payment-plugin-dark-interface.jpg";
import Img02 from "../../../public/images/fitness-app-interface.png";
import Img03 from "../../../public/images/modern-dashboard-interface-dark-theme.jpg";
import Img04 from "../../../public/images/project-management-web-application.jpg";

import EcommerceImg01 from "./../../../public/images/portfolio/ecommerce-img01.jpg";
import EcommerceImg02 from "./../../../public/images/portfolio/ecommerce-img02.jpg";
import EcommerceImg03 from "./../../../public/images/portfolio/ecommerce-img03.jpg";
import EcommerceImg04 from "./../../../public/images/portfolio/ecommerce-img04.jpg";
import EcommerceImg05 from "./../../../public/images/portfolio/ecommerce-img05.jpg";
import EcommerceImg06 from "./../../../public/images/portfolio/ecommerce-img06.jpg";

import UxUiImg01 from "./../../../public/images/portfolio/ui-ux-img01.jpg";
import UxUiImg02 from "./../../../public/images/portfolio/ui-ux-img02.jpg";
import UxUiImg03 from "./../../../public/images/portfolio/ui-ux-img03.jpg";
import UxUiImg04 from "./../../../public/images/portfolio/ui-ux-img04.jpg";
import UxUiImg05 from "./../../../public/images/portfolio/ui-ux-img05.jpg";

import WebsiteImg01 from "./../../../public/images/portfolio/website-img01.png";
import WebsiteImg02 from "./../../../public/images/portfolio/website-img02.png";
import WebsiteImg03 from "./../../../public/images/portfolio/website-img03.png";



import {
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaWordpress,
  FaBootstrap,
} from "react-icons/fa";
import { MdDesignServices, MdDevices } from "react-icons/md";
import {
  SiAndroid,
  SiApple,
  SiJson,
  SiMagento,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiSketch,
  SiSquarespace,
  SiStrapi,
} from "react-icons/si";
import { SiPhp, SiJavascript, SiWordpress, SiWebflow } from "react-icons/si";
import { FolderKanban, Palette, ShoppingCart, Globe, Smartphone } from "lucide-react";

import { PortfolioItem } from "@/interfaces/components-partials-interface";

// Updated portfolio data with unique IDs
export const portfolioData: PortfolioItem[] = [
  // ECOMMERCE CATEGORY
  {
    id: "manga-store",
    title: "The Manga Store",
    description:
      "Our vision is to reject inauthentic, mass produced Anime merchandise fits, and promoting a brand with unparalleled unique, top quality designs.",
    image: EcommerceImg01,
    technologies: [
      { name: "CSS3", icon: FaCss3Alt },
      { name: "HTML5", icon: FaHtml5 },
      { name: "JavaScript", icon: FaJs },
      { name: "Responsive", icon: MdDevices },
      { name: "WordPress", icon: FaWordpress },
      { name: "Bootstrap", icon: FaBootstrap },
    ],
    category: "ecommerce",
    bgColor: "bg-white",
  },
  {
    id: "cetrix",
    title: "Cetrix",
    description:
      "At CETRIX we deliver the actionable intelligence and expert guidance to our clients to ensure their success.",
    image: EcommerceImg02,
    technologies: [{ name: "WordPress", icon: FaWordpress }],
    category: "ecommerce",
    bgColor: "bg-green-700/80",
  },
  {
    id: "prokyt",
    title: "Prokyt",
    description:
      "The PROKYT website is designed specifically for dealers and retailers who specialise in the supply of Police,",
    image: EcommerceImg03,
    technologies: [{ name: "Magento", icon: SiMagento }],
    category: "ecommerce",
    bgColor: "bg-white",
  },
  {
    id: "chiltern-global",
    title: "Chiltern Global",
    description:
      "Defence manufacturing website design for Chiltern Global. This case study shows how we built an eCommerce site for a defense product solutions provider in the UK.",
    image: EcommerceImg04,
    technologies: [
      { name: "PHP", icon: SiPhp },
      { name: "JavaScript", icon: SiJavascript },
      { name: "WordPress", icon: SiWordpress },
      { name: "Webflow", icon: SiWebflow },
    ],
    category: "ecommerce",
    bgColor: "bg-[#091D24]",
  },
  {
    id: "gas-files",
    title: "GAS Files",
    description:
      "Gas Files has set out to tackle the problems associated with digital file storage head on. With it's new blockchain technology, Gas Files enables anyone around the world to store any number of files o",
    image: EcommerceImg05,
    technologies: [{ name: "Responsive", icon: MdDevices }],
    category: "ecommerce",
    bgColor: "bg-[#212121]",
  },
  {
    id: "my-friends",
    title: "My Friends",
    description: "comming soon",
    image: EcommerceImg06,
    technologies: [
      { name: "PHP", icon: SiPhp },
      { name: "JavaScript", icon: SiJavascript },
    ],
    category: "ecommerce",
    bgColor: "bg-blue-500",
  },

  // UI/UX CATEGORY
  {
    id: "college-apply-uiux",
    title: "College Apply",
    description:
      "Colleges18 aims to be the go-to platform for college students. With over 1000 colleges as clients, Colleges18 provides recent news regarding admissions tests, infrastructure building skillsets needed",
    image: UxUiImg01,
    technologies: [
      { name: "Responsive", icon: MdDevices },
      { name: "NextJS", icon: SiNextdotjs },
    ],
    category: "ui-ux",
    bgColor: "bg-red-600",
  },
  {
    id: "luxury-med-spa-uiux",
    title: "ID Luxury Med Spa",
    description:
      "ID Luxury Med Spa was founded with a vision to meet the growing demand for both invasive and non-invasive cosmetic treatments, all within a serene and sophisticated setting.",
    image: UxUiImg02,
    technologies: [
      { name: "Responsive", icon: MdDevices },
      { name: "WordPress", icon: SiWordpress },
    ],
    category: "ui-ux",
    bgColor: "bg-white",
  },
  {
    id: "livigno-ski-school-uiux",
    title: "Livigno Ski School",
    description:
      "You will find rolling carpet and wide and gentle slopes …Is a perfect solution for those who are learning firts steps on the ski .",
    image: UxUiImg03,
    technologies: [
      { name: "CSS3", icon: FaCss3Alt },
      { name: "HTML5", icon: FaHtml5 },
      { name: "JavaScript", icon: FaJs },
      { name: "Responsive", icon: MdDevices },
      { name: "WordPress", icon: FaWordpress },
      { name: "Bootstrap", icon: FaBootstrap },
      { name: "UX/UI", icon: MdDesignServices },
    ],
    category: "ui-ux",
    bgColor: "bg-blue-700",
  },
  {
    id: "btek-robots-uiux",
    title: "Btek Robots",
    description:
      "We serve clients in EMEA and North America from offices in London, Sweden, Miami, Washington DC and Las Vegas.",
    image: UxUiImg04,
    technologies: [
      { name: "WordPress", icon: SiWordpress },
      { name: "Responsive", icon: MdDevices },
    ],
    category: "ui-ux",
    bgColor: "bg-white",
  },
  {
    id: "knowledge-park-uiux", // Changed from "knowledge-park"
    title: "jb knowledge park",
    description:
      "JB Knowledge Park, located in Delhi NCR, Faridabad, is an AICTE-approved college affiliated with MDU, a NAAC A+ State Government University. The college specializes in BBA, BCA, and BTech programs, wi",
    image: UxUiImg05,
    technologies: [
      { name: "UX/UI", icon: MdDesignServices },
      { name: "Responsive", icon: MdDevices },
      { name: "NextJS", icon: SiNextdotjs },
      { name: "NodeJS", icon: SiNodedotjs },
      { name: "Json", icon: SiJson },
      { name: "Openai", icon: SiOpenai },
      { name: "Strapi", icon: SiStrapi },
    ],
    category: "ui-ux",
    bgColor: "bg-[#02427C]",
  },

  // WEBSITES CATEGORY
  {
    id: "vertelo",
    title: "Vertelo",
    description:
      "We provide bespoke electric mobility solutions tailored to our customers' requirements and designed to make fleet electrification an easy transition.",
    image: WebsiteImg01,
    technologies: [
      { name: "Responsive", icon: MdDevices },
      { name: "Squarspace", icon: SiSquarespace },
    ],
    category: "websites",
    bgColor: "bg-[#01212D]",
  },
  {
    id: "college-apply-website",
    title: "College Apply",
    description:
      "Colleges18 aims to be the go-to platform for college students. With over 1000 colleges as clients, Colleges18 provides recent news regarding admissions tests, infrastructure building skillsets needed",
    image: UxUiImg01,
    technologies: [
      { name: "Responsive", icon: MdDevices },
      { name: "NextJS", icon: SiNextdotjs },
    ],
    category: "websites",
    bgColor: "bg-red-600",
  },
  {
    id: "be-bigseller",
    title: "bebigseller",
    description:
      "Our mission is to empower businesses of all sizes to unlock the full potential of Amazon's vast marketplace and achieve remarkable success.",
    image: WebsiteImg02,
    technologies: [
      { name: "CSS3", icon: FaCss3Alt },
      { name: "HTML5", icon: FaHtml5 },
      { name: "JavaScript", icon: FaJs },
      { name: "Responsive", icon: MdDevices },
      { name: "WordPress", icon: SiWordpress },
    ],
    category: "websites",
    bgColor: "bg-[#061321]",
  },
  {
    id: "luxury-med-spa-website",
    title: "ID Luxury Med Spa",
    description:
      "ID Luxury Med Spa was founded with a vision to meet the growing demand for both invasive and non-invasive cosmetic treatments, all within a serene and sophisticated setting.",
    image: UxUiImg02,
    technologies: [
      { name: "Responsive", icon: MdDevices },
      { name: "WordPress", icon: SiWordpress },
    ],
    category: "websites",
    bgColor: "bg-white",
  },
  {
    id: "livigno-ski-school-website",
    title: "Livigno Ski School",
    description:
      "You will find rolling carpet and wide and gentle slopes …Is a perfect solution for those who are learning firts steps on the ski .",
    image: UxUiImg03,
    technologies: [
      { name: "CSS3", icon: FaCss3Alt },
      { name: "HTML5", icon: FaHtml5 },
      { name: "JavaScript", icon: FaJs },
      { name: "Responsive", icon: MdDevices },
      { name: "WordPress", icon: FaWordpress },
      { name: "Bootstrap", icon: FaBootstrap },
      { name: "UX/UI", icon: MdDesignServices },
    ],
    category: "websites",
    bgColor: "bg-blue-700",
  },
  {
    id: "thirdspace",
    title: "Thirdspace Chennai",
    description:
      "Founded in 1957 as an international trading company, we have since expanded our business interests to Shipping, Real Estate, Infrastructure Development, Flexible Packaging, FMCG, and Healthcare.",
    image: WebsiteImg03,
    technologies: [
      { name: "CSS3", icon: FaCss3Alt },
      { name: "HTML5", icon: FaHtml5 },
      { name: "JavaScript", icon: FaJs },
      { name: "Responsive", icon: MdDevices },
      { name: "WordPress", icon: FaWordpress },
      { name: "Bootstrap", icon: FaBootstrap },
      { name: "UX/UI", icon: MdDesignServices },
    ],
    category: "websites",
    bgColor: "bg-[#364360]",
  },
  {
    id: "btek-robots-website",
    title: "Btek Robots",
    description:
      "We serve clients in EMEA and North America from offices in London, Sweden, Miami, Washington DC and Las Vegas.",
    image: UxUiImg04,
    technologies: [
      { name: "WordPress", icon: SiWordpress },
      { name: "Responsive", icon: MdDevices },
    ],
    category: "websites",
    bgColor: "bg-white",
  },
  {
    id: "knowledge-park-website",
    title: "jb knowledge park",
    description:
      "JB Knowledge Park, located in Delhi NCR, Faridabad, is an AICTE-approved college affiliated with MDU, a NAAC A+ State Government University. The college specializes in BBA, BCA, and BTech programs, wi",
    image: UxUiImg05,
    technologies: [
      { name: "UX/UI", icon: MdDesignServices },
      { name: "Responsive", icon: MdDevices },
      { name: "NextJS", icon: SiNextdotjs },
      { name: "NodeJS", icon: SiNodedotjs },
      { name: "Json", icon: SiJson },
      { name: "Openai", icon: SiOpenai },
      { name: "Strapi", icon: SiStrapi },
    ],
    category: "websites",
    bgColor: "bg-[#02427C]",
  },

  // MOBILE APPS CATEGORY
  {
    id: "photobecho-app",
    title: "Photobecho",
    description:
      "At Photo Becho, we provide our clients with thousands of stock photos. Our pool of beginner and expert photographers add to our repertoire of images every day.",
    video: "/videos/mobile-video01.gif",
    technologies: [
      { name: "Android", icon: SiAndroid },
      { name: "Sketch", icon: SiSketch },
    ],
    category: "mobile",
    bgColor: "bg-[#556B2F]",
  },
  {
    id: "grosvenor-house-app",
    title: "Grosvenor House",
    description:
      "JW Marriott luxury hotels and resorts provide business and leisure travelers with simple elegance, an inviting atmosphere, and a deluxe level of comfort and personal service on their terms.",
    video: "/videos/mobile-video02.gif",
    technologies: [
      { name: "Android", icon: SiAndroid },
      { name: "IOS", icon: SiApple },
    ],
    category: "mobile",
    bgColor: "bg-black/90",
  },
  {
    id: "avantha-app-app",
    title: "Avantha App",
    description:
      "Avantha Global Communication app enables more than 25,000 employees of Avantha Group to have a secure access to company news, press releases and newsletters on the go.",
    video: "/videos/mobile-video03.gif",
    technologies: [
      { name: "Android", icon: SiAndroid },
      { name: "IOS", icon: SiApple },
      { name: "Json", icon: SiJson },
    ],
    category: "mobile",
    bgColor: "bg-[#AE311F]",
  },
  {
    id: "trip-friend-app",
    title: "Field Trip Friend App",
    description:
      "Field Trip Friend empowers its users to know where everyone is at any given moment.",
    video: "/videos/mobile-video04.gif",
    technologies: [
      { name: "Android", icon: SiAndroid },
      { name: "IOS", icon: SiApple },
      { name: "PHP", icon: SiPhp },
      { name: "JavaScript", icon: FaJs },
    ],
    category: "mobile",
    bgColor: "bg-white",
  },
  {
    id: "ztaat-app-app",
    title: "ztaat App",
    description:
      "One individual with the name of Zero, whom could not see his own race die anymore and do nothing, decided to act.",
    video: "/videos/mobile-video05.gif",
    technologies: [
      { name: "Android", icon: SiAndroid },
      { name: "IOS", icon: SiApple },
      { name: "PHP", icon: SiPhp },
      { name: "Json", icon: SiJson },
      { name: "MySQL", icon: SiMysql },
    ],
    category: "mobile",
    bgColor: "bg-pink-900/80",
  },
];

export const categories = [
  { id: "all", label: "All Portfolio", icon: FolderKanban },
  { id: "ui-ux", label: "UI/UX Design", icon: Palette },
  { id: "ecommerce", label: "Ecommerce Websites", icon: ShoppingCart },
  { id: "websites", label: "Websites", icon: Globe },
  { id: "mobile", label: "Mobile Apps", icon: Smartphone },
];

// Faq Data
export const PortfolioFaqData = [
  {
    id: "services",
    question: "What type of services are included in your portfolio?",
    answer:
      "Our portfolio highlights a range of services including UI/UX design, mobile app development, website development, and eCommerce solutions.",
  },
  {
    id: "mobile",
    question: "What kind of mobile projects have you worked on?",
    answer:
      "We have developed cross-platform and native mobile applications designed for performance, usability, and scalability.",
  },
  {
    id: "websites",
    question: "What types of websites are in your portfolio?",
    answer:
      "Our portfolio includes business websites, personal portfolios, landing pages, and fully customized solutions built for different industries.",
  },
  {
    id: "ecommerce",
    question: "Do you provide eCommerce development?",
    answer:
      "Yes, we specialize in building secure, scalable, and user-friendly eCommerce platforms designed to drive sales and provide seamless shopping experiences.",
  },
];
