import {
  Blocks,
  Briefcase,
  Cloud,
  Code,
  Code2,
  FlaskConical,
  Gamepad2,
  LayoutDashboard,
  Megaphone,
  Rocket,
  ServerCog,
  Smartphone,
  Users,
  Wrench,
} from "lucide-react";
import CarouselImg01 from "../../../public/images/carousel-img-01.jpg";
import CarouselImg02 from "../../../public/images/carousel-img-02.jpg";
import CarouselImg03 from "../../../public/images/carousel-img-03.jpg";

import ServicesImage01 from "../../../public/images/services-image-01.webp";
import ServicesImage02 from "../../../public/images/services-image-02.webp";
import ServicesImage03 from "../../../public/images/services-image-03.webp";
import ServicesImage04 from "../../../public/images/services-image-04.webp";
import ServicesImage05 from "../../../public/images/services-image-05.webp";
import ServicesImage06 from "../../../public/images/services-image-06.webp";

import brandImg01 from "../../../public/images/brand-logos/web-brand-img01.webp";
import brandImg02 from "../../../public/images/brand-logos/web-brand-img02.webp";
import brandImg03 from "../../../public/images/brand-logos/web-brand-img03.webp";
import brandImg04 from "../../../public/images/brand-logos/web-brand-img04.webp";
import brandImg05 from "../../../public/images/brand-logos/web-brand-img05.webp";
import brandImg06 from "../../../public/images/brand-logos/web-brand-img06.webp";
import brandImg07 from "../../../public/images/brand-logos/web-brand-img07.webp";
import brandImg08 from "../../../public/images/brand-logos/web-brand-img08.webp";
import brandImg09 from "../../../public/images/brand-logos/web-brand-img09.webp";
import brandImg10 from "../../../public/images/brand-logos/web-brand-img10.webp";
import brandImg11 from "../../../public/images/brand-logos/web-brand-img11.webp";
import brandImg12 from "../../../public/images/brand-logos/web-brand-img12.webp";
import brandImg13 from "../../../public/images/brand-logos/web-brand-img13.webp";
import brandImg14 from "../../../public/images/brand-logos/web-brand-img14.webp";
import brandImg15 from "../../../public/images/brand-logos/web-brand-img15.webp";
import brandImg16 from "../../../public/images/brand-logos/web-brand-img16.webp";
import brandImg17 from "../../../public/images/brand-logos/web-brand-img17.webp";
import brandImg18 from "../../../public/images/brand-logos/web-brand-img18.webp";

import AwardImg01 from "../../../public/images/awards/award-image-01.webp";
import AwardImg02 from "../../../public/images/awards/award-image-02.webp";
// import AwardImg03 from "../../../public/images/awards/award-image-03.webp"
import AwardImg04 from "../../../public/images/awards/award-image-04.webp";
import AwardImg05 from "../../../public/images/awards/award-image-05.webp";
import AwardImg06 from "../../../public/images/awards/award-image-06.webp";
import AwardImg07 from "../../../public/images/awards/award-image-07.webp";
import AwardImg08 from "../../../public/images/awards/award-image-08.webp";
import AwardImg09 from "../../../public/images/awards/award-image-09.webp";
import AwardImg10 from "../../../public/images/awards/award-image-10.webp";

import { ServiceCardType } from "@/components/partials/services";

export const WebStatsData = [
  { number: 10, suffix: "+", label: "Years Of Experience" },
  { number: 500, suffix: "+", label: "Satisfied Clients around the globe" },
  { number: 600, suffix: "+", label: "Project Done successfully" },
];

export const carouselSlidesData = [
  {
    id: 1,
    title: "Transform Data  Strategy for",
    highlight: "Gen AI",
    description:
      "Experience seamless AI deployment and management with our AI Center of Excellence. From rapid product iterations to NLP-driven insights, we enhance your AI capabilities and optimize ROI.",
    backgroundImageQuery: CarouselImg01,
  },
  {
    id: 2,
    title: "AI Excellence at Your",
    highlight: "Fingertips",
    description:
      "Achieve efficient AI integration with our tailored solutions. We support AI practice management and scalability, helping you maintain a competitive advantage and streamline operations.",
    backgroundImageQuery: CarouselImg02,
  },
  {
    id: 3,
    title: "Maximize AI Integration ",
    highlight: "Efficiency",
    description:
      "Augment the power of Gen AI with our comprehensive data strategy solutions. We specialize in automated data segmentation and integration, ensuring top-tier data quality with ML and MLOps.",
    backgroundImageQuery: CarouselImg03,
  },
];

export const ServicesCardData: ServiceCardType[] = [
  {
    image: Smartphone,
    title: "Mobile App Development",
    description:
      "We design and develop high-performance mobile applications with seamless user experiences, robust security, and scalable architectures, tailored to meet user and business expansion needs.",
    href: "/",
    backgroundImage: ServicesImage01,
  },
  {
    image: Code,
    title: "Web Development",
    description:
      "Our web development services deliver responsive, high-speed websites with secure, scalable back-end solutions, optimized for both user engagement and operational efficiency.",
    href: "/",
    backgroundImage: ServicesImage02,
  },
  {
    image: Blocks,
    title: "Software Development",
    description:
      "We create custom software solutions that enhance business processes, featuring advanced integrations, strong security measures, and scalable designs to support your growth.",
    href: "/",
    backgroundImage: ServicesImage03,
  },
  {
    image: Gamepad2,
    title: "Game Development",
    description:
      "Our game development expertise spans from concept to deployment. We excel at developing immersive graphics, fluid gameplay, and optimized performance across platforms.",
    href: "/",
    backgroundImage: ServicesImage04,
  },
  {
    image: Users,
    title: "IT Staff Augmentation",
    description:
      "Our IT staff augmentation services provide skilled professionals to augment your team, ensuring you have the right expertise for every project phase.",
    href: "/",
    backgroundImage: ServicesImage05,
  },
  {
    image: Cloud,
    title: "Cloud Consulting",
    description:
      "We offer cloud consulting services that optimize your cloud strategy, enhance security, and ensure scalable, cost-effective infrastructure designed to complement organizational growth.",
    href: "/",
    backgroundImage: ServicesImage06,
  },
];

export const BrandData = [
  {
    brandImg: brandImg01,
    alt: "Brand 1",
  },
  {
    brandImg: brandImg02,
    alt: "brandImg02",
  },
  {
    brandImg: brandImg03,
    alt: "brandImg03",
  },
  {
    brandImg: brandImg04,
    alt: "brandImg04",
  },
  {
    brandImg: brandImg05,
    alt: "brandImg05",
  },
  {
    brandImg: brandImg06,
    alt: "brandImg06",
  },
  {
    brandImg: brandImg07,
    alt: "brandImg07",
  },
  {
    brandImg: brandImg08,
    alt: "brandImg08",
  },
  {
    brandImg: brandImg09,
    alt: "brandImg09",
  },
  {
    brandImg: brandImg10,
    alt: "brandImg10",
  },
  {
    brandImg: brandImg11,
    alt: "brandImg11",
  },
  {
    brandImg: brandImg12,
    alt: "brandImg12",
  },
  {
    brandImg: brandImg13,
    alt: "brandImg13",
  },
  {
    brandImg: brandImg14,
    alt: "brandImg14",
  },
  {
    brandImg: brandImg15,
    alt: "brandImg15",
  },
  {
    brandImg: brandImg16,
    alt: "brandImg16",
  },
  {
    brandImg: brandImg17,
    alt: "brandImg17",
  },
  {
    brandImg: brandImg18,
    alt: "brandImg18",
  },
];

export const AwardsData = [
  {
    brandImg: AwardImg01,
    alt: "Award 1",
  },
  {
    brandImg: AwardImg02,
    alt: "Award 2",
  },

  {
    brandImg: AwardImg04,
    alt: "Award 4",
  },
  {
    brandImg: AwardImg05,
    alt: "Award 5",
  },
  {
    brandImg: AwardImg06,
    alt: "Award 6",
  },
  {
    brandImg: AwardImg07,
    alt: "Award 7",
  },
  {
    brandImg: AwardImg08,
    alt: "Award 8",
  },
  {
    brandImg: AwardImg09,
    alt: "Award 9",
  },
  {
    brandImg: AwardImg10,
    alt: "Award 10",
  },
];

export const ProjectsCardContent = [
  {
    title: "Startups",
    description:
      "We help startups bring bold ideas to life through rapid prototyping, MVPs, and proof of concept development to validate and scale fast.",
    services: [
      { text: "Rapid Prototyping", icon: Rocket },
      { text: "MVP Development", icon: LayoutDashboard },
      { text: "POC Development", icon: FlaskConical },
    ],
  },
  {
    title: "SMBs",
    description:
      "Empowering small and mid-sized businesses with tailored software, marketing strategies, and ongoing support to fuel digital growth.",
    services: [
      { text: "Custom Software Development", icon: Code2 },
      { text: "Digital Marketing Solutions", icon: Megaphone },
      { text: "App Maintenance and Fixes", icon: Wrench },
    ],
  },
  {
    title: "Enterprises",
    description:
      "Scalable enterprise-grade solutions including cloud adoption, DevOps, and digital transformation to future-proof your operations.",
    services: [
      { text: "Enterprise Software Solutions", icon: Briefcase },
      { text: "Cloud Implementation Services", icon: Cloud },
      { text: "DevOps Services", icon: ServerCog },
    ],
  },
];

export const FaqDataHomePage = [
  {
    question: "What mobile app development services do you offer?",
    answer:
      "We offer comprehensive mobile app development services, including:",
    list: [
      "Custom mobile app design and development",
      "Native app development for iOS and Android platforms",
      "Cross-platform app development using frameworks like React Native and Flutter",
      "UI/UX design and optimization",
      "App testing, debugging, and quality assurance",
      "App deployment and maintenance support",
    ],
  },
  {
    question: "What is the average cost and timeline for developing software?",
    answer:
      "The cost and timeline for developing a software can vary significantly based on factors such as:",
    list: [
      "Project complexity and functionality",
      "Platform compatibility (iOS, Android, or both)",
      "Design requirements (basic UI/UX vs. custom design)",
      "Integration with third-party APIs or system",
      "Post-launch maintenance and support needs",
    ],
  },
  {
    question: "Do you offer ongoing maintenance and support services?",
    answer:
      "Yes, we provide comprehensive project maintenance and support services post-launch. Our services include:",
    list: [
      "Regular app updates and feature enhancements",
      "Bug fixing and performance optimization",
      "Security patches and data backup",
      "User feedback analysis and implementation of improvements",
      "Technical support and troubleshooting",
    ],
  },
  {
    question: "Do you develop software for both mobile and web platforms?",
    answer:
      "Yes, we specialize in developing software solutions for both mobile and web platforms. Our services include:",
    list: [
      "Custom web application development",
      "Mobile app development for iOS and Android platforms",
      "Progressive web app (PWA) development",
      "Responsive web design and optimization",
      "Web-based software solutions for enterprise needs",
    ],
  },
  {
    question: "What software development services do you offer?",
    answer:
      "Our software development services encompass a wide range of solutions, including:",
    list: [
      "Custom software design and development",
      "Enterprise software solutions for business management and operations",
      "E-commerce platforms and online marketplace development",
      "CRM (Customer Relationship Management) systems",
      "IoT (Internet of Things) software solutions",
      "Data analytics and business intelligence software",
      "Cloud-based custom solutions",
    ],
  },
  {
    question:
      "How do you ensure the security and quality of the software you develop?",
    answer:
      "We follow industry best practices and stringent quality assurance measures to ensure the security and quality of the software we develop. Our approach includes:",
    list: [
      "Conducting thorough code reviews and testing procedures",
      "Implementing secure coding practices and encryption standards",
      "Regular security audits and vulnerability assessments",
      "Adhering to compliance standards and regulations (such as GDPR, HIPAA, etc.)",
      "Continuous monitoring and updates to address emerging threats",
    ],
  },
  {
    question: "Do you assist with software integration and data migration?",
    answer:
      "Yes, we provide software integration and data migration services to ensure seamless compatibility and data transfer between different systems. Our services include:",
    list: [
      "Integration with third-party APIs, plugins, and platforms",
      "Legacy system integration and modernization",
      "Data migration from legacy systems to new software solutions",
      "Middleware development for efficient data exchange",
      "Testing and validation of integrated systems to ensure smooth operation",
    ],
  },
];
