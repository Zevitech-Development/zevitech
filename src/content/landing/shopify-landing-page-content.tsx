import { ProcessStepInterface } from "@/interfaces/components.partials-interfaces";
import TrustbarClient01 from "../../../public/images/clients/trustbar-client-img-01.webp";
import TrustbarClient02 from "../../../public/images/clients/trustbar-client-img-02.webp";
import TrustbarClient03 from "../../../public/images/clients/trustbar-client-img-03.webp";
import TrustbarClient04 from "../../../public/images/clients/trustbar-client-img-04.webp";
import TrustbarClient05 from "../../../public/images/clients/trustbar-client-img-05.webp";
import TrustbarClient06 from "../../../public/images/clients/trustbar-client-img-06.webp";


import PortfolioImg01 from "../../../public/images/portfolio-01.webp";
import PortfolioImg02 from "../../../public/images/portfolio-02.webp";
import PortfolioImg03 from "../../../public/images/portfolio-03.webp";
import PortfolioImg04 from "../../../public/images/portfolio-04.webp";
import PortfolioImg05 from "../../../public/images/portfolio-05.webp";
import PortfolioImg06 from "../../../public/images/portfolio-06.webp";
import { FiLayers, FiShare2 } from "react-icons/fi";
import { IoIosRocket } from "react-icons/io";


import ResultImg01 from "../../../public/images/result-img-01.png";
import ResultImg02 from "../../../public/images/result-img-02.png";
import ResultImg03 from "../../../public/images/result-img-03.png";
import ResultImg04 from "../../../public/images/result-img-04.png";
import ResultImg05 from "../../../public/images/result-img-05.png";
import ResultImg06 from "../../../public/images/result-img-06.png";



import InfoSectionImg01 from "../../../public/images/information-section-01.webp";
import InfoSectionImg02 from "../../../public/images/information-section-02.webp";
import InfoSectionImg03 from "../../../public/images/information-section-03.webp";
import InfoSectionImg04 from "../../../public/images/information-section-04.webp";
import InfoSectionImg05 from "../../../public/images/information-section-05.webp";
import InfoSectionImg06 from "../../../public/images/information-section-06.webp";
import InfoSectionImg07 from "../../../public/images/information-section-07.webp";
import InfoSectionImg08 from "../../../public/images/information-section-08.webp";
import InfoSectionImg09 from "../../../public/images/information-section-09.webp";
import InfoSectionImg10 from "../../../public/images/information-section-10.webp";
import InfoSectionImg11 from "../../../public/images/information-section-11.webp";
import InfoSectionImg12 from "../../../public/images/information-section-12.webp";
import InfoSectionImg13 from "../../../public/images/information-section-13.webp";
import InfoSectionImg14 from "../../../public/images/information-section-14.webp";
import InfoSectionImg15 from "../../../public/images/information-section-15.webp";


import ReviewClientImg01 from "../../../public/images/reviews/review-client-01.jpg";
import ReviewClientImg02 from "../../../public/images/reviews/review-client-02.jpg";
import ReviewClientImg03 from "../../../public/images/reviews/review-client-03.jpg";
import ReviewClientImg04 from "../../../public/images/reviews/review-client-04.jpg";
import ReviewClientImg05 from "../../../public/images/reviews/review-client-05.jpg";
import ReviewClientImg06 from "../../../public/images/reviews/review-client-06.jpg";
import ReviewClientImg07 from "../../../public/images/reviews/review-client-07.jpg";
import ReviewClientImg08 from "../../../public/images/reviews/review-client-08.jpg";
import ReviewClientImg09 from "../../../public/images/reviews/review-client-09.jpg";
import ReviewClientImg10 from "../../../public/images/reviews/review-client-10.jpg";
import ReviewClientImg11 from "../../../public/images/reviews/review-client-11.jpg";
import ReviewClientImg12 from "../../../public/images/reviews/review-client-12.jpg";
import ReviewClientImg13 from "../../../public/images/reviews/review-client-13.jpg";
import ReviewClientImg14 from "../../../public/images/reviews/review-client-14.jpg";
import ReviewClientImg15 from "../../../public/images/reviews/review-client-15.jpg";


export const TrustbarSectionContent = [
  {
    clientNo: 1,
    img: TrustbarClient01,
  },  
  {
    clientNo: 2,
    img: TrustbarClient02,
  },
  {
    clientNo: 3,
    img: TrustbarClient03,
  },
  {
    clientNo: 4,
    img: TrustbarClient04,
  },
  {
    clientNo: 5,
    img: TrustbarClient05,
  },
  {
    clientNo: 6,
    img: TrustbarClient06,
  },
];


export const PortfolioSectionContent = [
  {
    portfolioNo: 1,
    img: PortfolioImg01,
  },

  {
    portfolioNo: 2,
    img: PortfolioImg02,
  },

  {
    clientNo: 3,
    img: PortfolioImg03,
  },

  {
    portfolioNo: 4,
    img: PortfolioImg04,
  },

  {
    portfolioNo: 5,
    img: PortfolioImg05,
  },

  {
    portfolioNo: 6,
    img: PortfolioImg06,
  },
];

export const ProcessSectionContent: ProcessStepInterface[] = [
  {
    id: "step-1",
    number: "01",
    title: "Share your project details",
    description:
      "Tell us about your project goals, target audience, and any specific requirements to kickstart our Shopify store design process.",
    icon: <FiShare2 className="w-12 h-12 text-primary" />,
  },

  {
    id: "step-2",
    number: "02",
    title: "Design and development",
    description:
      "Our team will then craft a custom Shopify store tailored to your brand, ensuring seamless functionality and an engaging user experience.",
    icon: <FiLayers className="w-12 h-12 text-primary" />,
  },

  {
    id: "step-3",
    number: "03",
    title: "Finalize and launch",
    description:
      "After your suggested revisions and testing, we will launch your Shopify store, ensuring it's optimized for success and customer satisfaction.",
    icon: <IoIosRocket className="w-12 h-12 text-primary" />,
  },
];


export const PricingSectionContent = [
  {
    id: "beginner",
    name: "Beginner Shopify",
    price: "$249",
    description:
      "Enhance your online brand with our expert Shopify store design services. We create user-friendly and visually appealing stores tailored to your business needs.",
    features: [
      "Theme-based design",
      "Up-to 10 products",
      "Dedicated designer & developer",
      "Payment module integration (Additional $200)",
      "Unlimited revisions",
      "100% satisfaction guarantee",
      "100% unique design guarantee",
    ],
    badge: null,
  },

  {
    id: "growth",
    name: "Growth Shopify",
    price: "$549",
    originalPrice: "$2995",
    discount: "80% off!",
    description:
      "Build your dream Shopify store with our expert design and development services. We'll turn your vision into a reality.",
    features: [
      "Customized design",
      "Up-to 25 products",
      "Mini shopping cart integration",
      "Payment module integration",
      "Easy Product Search",
      "Dedicated designer & developer",
      "Unlimited revisions",
      "100% satisfaction guarantee",
      "100% unique design guarantee",
    ],
    badge: null,
    buttonText: "GET STARTED",
  },

  {
    id: "levelup",
    name: "Level Up Shopify",
    price: "$849",
    description:
      "Boost your online business with a personalized Shopify store. We'll tailor it to your needs for a professional and effective online presence.",
    features: [
      "Customized design",
      "Up-to 50 products",
      "Full shopping cart integration",
      "Payment module integration",
      "Easy product search",
      "Dedicated designer & developer",
      "Unlimited revisions",
      "1 Months free shopify subscription",
      "100% satisfaction guarantee",
      "100% unique design guarantee",
    ],
    badge: "BEST SELLER",
  },

  {
    id: "pro",
    name: "Pro Shopify",
    price: "$1349",
    description:
      "Enhance your online store with our Shopify expertise. We'll optimize your platform for better performance and increased customer engagement.",
    features: [
      "Customized design",
      "Up-to 100 products",
      "Full shopping cart integration",
      "Payment module integration",
      "Easy product search",
      "Product reviews",
      "Blog Page",
      "5 promotional banners",
      "Team of expert designers and developers",
      "Unlimited revisions",
      "2 Months free shopify subscription",
      "100% satisfaction guarantee",
      "100% unique design guarantee",
    ],
    badge: null,
  },

  {
    id: "executive",
    name: "Executive Shopify",
    price: "$2449",
    description:
      "Collaborate with us to create your perfect Shopify store. We'll work together to design and develop a professional and effective online shop.",
    features: [
      "Unlimited pages website with unique designs",
      "5 custom logo designs",
      "Up-to 250 products",
      "Free unlimited revisions",
      "Custom shopping cart integration",
      "Multiple payment module integration",
      "Multiple shipping module integration",
      "Product ratings & reviews",
      "Blog Page",
      "Multiple currency support",
      "Mobile responsive",
      "Social media designs (Facebook, Twitter, YouTube)",
      "Dedicated team of expert designers & developers",
      "Dedicated project manager",
      "3 Months free shopify subscription",
      "Newsletter subscription",
      "100% satisfaction guarantee",
    ],
    badge: null,
  },

  {
    id: "toptier",
    name: "Top Tier Shopify",
    price: "$4999",
    description:
      "Maximize your brand's potential with our custom Shopify store. Let us create a unique online shop that boosts your business.",
    features: [
      "Complete custom design & development",
      "Unique, user-friendly, interactive, dynamic, high-end UI design",
      "Unlimited Products with Unlimited Categories",
      "Unlimited banner designs",
      "Interactive sliding banners",
      "Blog Page",
      "Multiple filtration options (Search by age, experience, talent, industry, etc.)",
      "Search bar for easy search",
      "Online appointment/scheduling integration",
      "Online payment integration",
      "Custom dynamic forms",
      "Complete database creation",
      "Live feeds of social network integration (Optional)",
      "SEO friendly",
      "Mobile responsive",
      "Master admin panel",
      "Award-winning team of expert designers and developers",
      "Complete deployment",
      "Complete W3C validation",
      "4 Months free shopify subscription",
      "Dedicated team of designers and developers",
      "100% satisfaction guarantee",
    ],
    badge: "FREE $500 ADS CREDIT",
  },
];

export const ResultSectionContent = [
  {
    resultNo: 1,
    img: ResultImg01,
  },

  {
    resultNo: 2,
    img: ResultImg02,
  },

  {
    resultNo: 3,
    img: ResultImg03,
  },

  {
    resultNo: 4,
    img: ResultImg04,
  },

  {
    resultNo: 5,
    img: ResultImg05,
  },

  {
    resultNo: 6,
    img: ResultImg06,
  },
];


export const InformationSectionContent = [
  {
    infoNo: 1,
    img: InfoSectionImg01,
    heading: "Grow your customer base quickly",
    description:
      "Offer your customers enticing discounts while capturing leads using our customizable popup. This conversion-boosting feature helps convert leaving customers into sales for future promotions.",
    features: [
      "Fully tailored to your needs",
      "Gather email addresses and grow your clientele",
      "Capture emails before visitors exit",
    ],
  },

  {
    infoNo: 2,
    img: InfoSectionImg02,
    heading: "Built-in scarcity timer",
    description:
      "Eliminate timer apps! Our built-in psychological trigger maximizes your profits. Limited-time offers always boost sales, leveraging the fear of missing out to drive impulse purchases.",
    features: [
      "Fully tailored to your needs",
      "Choose from 4 unique styles",
      "Offer exclusive sales to your customers",
    ],
  },

  {
    infoNo: 3,
    img: InfoSectionImg03,
    heading: "The cash boosting upsell",
    description:
      "Boost your conversions significantly with a product upsell popup. Research indicates visitors are more inclined to purchase an upsell post-cart and pre-checkout. We saw up to 25% profit increase in our Shopify stores after implementing this.",
    features: [
      "Fully tailored to your needs",
      "Enhance cart value with related products",
      "Provide customers with precisely what they're looking for",
    ],
  },

  {
    infoNo: 4,
    img: InfoSectionImg04,
    heading: "Custom clean footer",
    description:
      "A clutter-free theme boosts sales! We discovered that messy footers distract customers and lead to lost sales. After adding a clean footer template, our sales and conversions improved significantly. This feature is fully customizable, and you can still use the standard Shopify footer.",
    features: [
      "Fully customizable design options",
      "Eliminates distractions for better focus",
      "Compatible with existing Shopify structure",
    ],
  },

  {
    infoNo: 5,
    img: InfoSectionImg05,
    heading: "Create any Call To Action",
    description:
      "Get stunning, fully customizable call-to-action buttons for your homepage, product page, and cart. These buttons significantly boost conversions and give you complete control over your store's CTA buttons.",
    features: [
      "Unlimited customization possibilities",
      "Strategic placement across all pages",
      "Proven conversion optimization elements",
    ],
  },

  {
    infoNo: 6,
    img: InfoSectionImg06,
    heading: "Urgency sales ticker",
    description:
      "A sale ticker creates urgency and boosts conversions. Show real-time sales activity to increase the fear of missing out, leading to more sales. This fully customizable feature allows you to change borders, colors, and more to suit your needs.",
    features: [
      "Real-time sales activity display",
      "Fully customizable appearance",
      "Psychological trigger for increased urgency",
    ],
  },

  {
    infoNo: 7,
    img: InfoSectionImg07,
    heading: "Boost Instagram profits",
    description:
      "More than 60% of Shopify users using Instagram promotions faced issues with mobile compatibility! Our theme is designed to enhance Instagram profits with a customizable sticky button.",
    features: [
      "Mobile-optimized Instagram integration",
      "Customizable sticky button placement",
      "Seamless social media to sales funnel",
    ],
  },

  {
    infoNo: 8,
    img: InfoSectionImg08,
    heading: "Simple, easy trust badges",
    description:
      "Add trust badges that change site-wide, saving you from adding them to each product individually. Gain access to our exclusive range of custom badges. Trust is a major conversion booster that encourages visitors to convert.",
    features: [
      "Site-wide implementation efficiency",
      "Exclusive custom badge collection",
      "Proven trust-building elements",
    ],
  },

  {
    infoNo: 9,
    img: InfoSectionImg09,
    heading: "Profit boosting cart buttons",
    description:
      "You can customize the checkout buttons and access a new button above the cart that can be toggled on/off. Take control of your store's sales to prevent profit loss effectively.",
    features: [
      "Advanced checkout customization",
      "Toggle-able cart enhancement buttons",
      "Revenue protection mechanisms",
    ],
  },

  {
    infoNo: 10,
    img: InfoSectionImg10,
    heading: "Build custom homepage",
    description:
      "Design a stunning homepage with customizable text colors and layout options. You can also customize colors on product pages. The homepage must align with your store's overall look to boost conversions. Our unique theme offers this level of customization, setting it apart from others.",
    features: [
      "Comprehensive design customization",
      "Advanced color and layout controls",
      "Conversion-focused homepage elements",
    ],
  },

  {
    infoNo: 11,
    img: InfoSectionImg11,
    heading: "Custom related products",
    description:
      "We discovered that one of the most effective conversion boosters is related products. However, we went beyond creating standard-related products by offering complete customization options.",
    features: [
      "Advanced product recommendation engine",
      "Complete customization control",
      "Strategic cross-selling optimization",
    ],
  },

  {
    infoNo: 12,
    img: InfoSectionImg12,
    heading: "GEO-IP currency recognition",
    description:
      "Our GEO-IP currency recognition boosts sales by displaying prices in the visitor's country currency. Regardless of their location, prices will be changed to their currency. Plus, our theme includes a standard currency switcher for added flexibility.",
    features: [
      "Automatic currency detection",
      "Global customer experience optimization",
      "Manual currency switcher backup",
    ],
  },

  {
    infoNo: 13,
    img: InfoSectionImg13,
    heading: "Go directly to checkout",
    description:
      "Streamline your checkout process with our direct-to-checkout feature. It eliminates unnecessary steps and guides customers straight to purchase effortlessly, resulting in a smoother and more efficient buying experience.",
    features: [
      "Reduced cart abandonment rates",
      "Streamlined purchasing process",
      "Enhanced user experience flow",
    ],
  },

  {
    infoNo: 14,
    img: InfoSectionImg14,
    heading: "Build trust with customer reviews",
    description:
      "Our product review and rating system allows customers to share their feedback and experiences, helping others make informed purchase decisions. You can easily manage reviews, respond to feedback, and showcase positive testimonials to build trust with your audience.",
    features: [
      "Comprehensive review management system",
      "Interactive feedback capabilities",
      "Trust-building testimonial showcase",
    ],
  },

  {
    infoNo: 15,
    img: InfoSectionImg15,
    heading: "Advanced analytics dashboard",
    description:
      "Monitor your store's performance with our comprehensive analytics dashboard. Track conversion rates, customer behavior, and sales metrics in real-time to make data-driven decisions that optimize your revenue streams.",
    features: [
      "Real-time performance monitoring",
      "Advanced conversion tracking",
      "Data-driven optimization insights",
    ],
  },
];

export const ReviewsSectionContent01 = [
  {
    ProfilePicture: ReviewClientImg01,
    ClientName: "Sarah T.",
    ReviewDate: "2025-04-15",
    ReviewsQuote:
      "Just wanted to say thanks to the team for getting my Shopify store live on time. I had a deadline in mind, and they totally nailed it. Loved how they handled product pages and custom features.",
  },

  {
    ProfilePicture: ReviewClientImg02,
    ClientName: "Ahmed K.",
    ReviewDate: "2025-03-28",
    ReviewsQuote:
      "This was my first time launching a Shopify store, and they made it so smooth. From design to checkout integration, everything looks and feels premium. Super happy!",
  },

  {
    ProfilePicture: ReviewClientImg03,
    ClientName: "Lina R.",
    ReviewDate: "2025-02-19",
    ReviewsQuote:
      "I had an old Shopify store that wasn’t converting well. These guys revamped the entire layout and now my sales have literally doubled. Worth every penny.",
  },

  {
    ProfilePicture: ReviewClientImg04,
    ClientName: "Jason M.",
    ReviewDate: "2025-01-09",
    ReviewsQuote:
      "Can’t recommend them enough for Shopify development. They took my messy ideas and turned them into a fully functioning, mobile-friendly store. Very responsive throughout the process.",
  },

  {
    ProfilePicture: ReviewClientImg05,
    ClientName: "Mehak F.",
    ReviewDate: "2025-05-01",
    ReviewsQuote:
      "My last developer ghosted me halfway through my Shopify build. Found this agency online and they not only picked up the project but improved everything I had done so far. Legends.",
  },
];

export const ReviewsSectionContent02 = [
  {
    ProfilePicture: ReviewClientImg06,
    ClientName: "Daniel S.",
    ReviewDate: "2025-04-02",
    ReviewsQuote:
      "The level of customization they added to my Shopify store is insane. I asked for a very specific layout, and they built it exactly how I envisioned. Excellent work!",
  },

  {
    ProfilePicture: ReviewClientImg07,
    ClientName: "Hira N.",
    ReviewDate: "2025-03-13",
    ReviewsQuote:
      "Absolutely love how my Shopify store turned out! The branding, the speed, the layout — everything is on point. I’ve already recommended them to 3 other friends.",
  },

  {
    ProfilePicture: ReviewClientImg08,
    ClientName: "Eric B.",
    ReviewDate: "2025-02-07",
    ReviewsQuote:
      "They set up my entire Shopify dropshipping store from scratch, including product sourcing plugins. Saved me so much time and headache.",
  },

  {
    ProfilePicture: ReviewClientImg09,
    ClientName: "Zainab A.",
    ReviewDate: "2025-01-21",
    ReviewsQuote:
      "We run a small clothing brand and wanted something simple but bold. They built a Shopify site that matches our aesthetic perfectly. Super fast loading and easy to manage.",
  },

  {
    ProfilePicture: ReviewClientImg10,
    ClientName: "Richard C.",
    ReviewDate: "2025-05-10",
    ReviewsQuote:
      "Hired them for a Shopify redesign and they delivered beyond expectations. Cleaner UX, better mobile view, and they even gave some marketing tips. Great experience.",
  },
];

export const ReviewsSectionContent03 = [
  {
    ProfilePicture: ReviewClientImg11,
    ClientName: "Tanya D.",
    ReviewDate: "2025-04-20",
    ReviewsQuote:
      "Professional, quick, and super helpful. They handled the whole Shopify setup including payment gateways, shipping zones, and email automation. Will be working with them again soon.",
  },

  {
    ProfilePicture: ReviewClientImg12,
    ClientName: "Usman G.",
    ReviewDate: "2025-03-01",
    ReviewsQuote:
      "I had no idea where to start with my Shopify store. These guys walked me through everything and delivered a ready-to-sell site. Honestly felt like a partner, not just a service provider.",
  },

  {
    ProfilePicture: ReviewClientImg13,
    ClientName: "Emily R.",
    ReviewDate: "2025-02-10",
    ReviewsQuote:
      "Was skeptical at first, but damn, the Shopify site they built for me looks better than I imagined. They even helped me write the product descriptions. Total pros.",
  },

  {
    ProfilePicture: ReviewClientImg14,
    ClientName: "Moiz J.",
    ReviewDate: "2025-01-30",
    ReviewsQuote:
      "One of the best experiences I’ve had working with any agency. They made my Shopify pet store go live within 10 days and handled every technical thing with ease.",
  },

  {
    ProfilePicture: ReviewClientImg15,
    ClientName: "Sofia L.",
    ReviewDate: "2025-05-05",
    ReviewsQuote:
      "They didn’t just build a Shopify store — they built a brand presence. The logo, the layout, the storytelling across the site — all felt aligned. Super grateful.",
  },
];


export const FaqSectionContent = [
  {
    faqHeader: "How quickly can my Shopify website be built?",
    faqContent:
      "The time to build a Shopify site depends on factors like design complexity, product count, customization needs, and content availability. A basic site with few products can take days to weeks. A complex site with custom designs and many products may take weeks or months.",
  },

  {
    faqHeader:
      "Can you integrate my website with other systems, such as a CRM or email marketing platform?",
    faqContent:
      "Absolutely, we can integrate your website with other systems like CRM or email marketing platforms. Our team has expertise in various integrations and can recommend the best solutions tailored to your business requirements.",
  },

  {
    faqHeader: "Can I customize the design and layout of my Shopify store?",
    faqContent:
      "Yes, our services are highly customizable. We work closely with clients to create a unique design that aligns with their brand identity and goals.",
  },

  {
    faqHeader: "Will my Shopify store be mobile-friendly?",
    faqContent:
      "Yes, all our designs are responsive, ensuring optimal viewing and functionality across devices, including smartphones and tablets.",
  },

  {
    faqHeader: "Can you create a custom checkout process for my Shopify store?",
    faqContent:
      "Yes, we can customize the checkout process to align with your business requirements and enhance the customer experience.",
  },
];
