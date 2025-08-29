import React, { useRef, useState } from "react";
import { motion, useTransform, useScroll, Variants } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa6";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  img: string;
  company: string;
  role: string;
  rating: number;
  desc: string;
}

interface TestimonialCardProps {
  item: Testimonial;
  index: number;
  isActive: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    company: "TechStart Inc.",
    role: "CEO & Founder",
    rating: 5,
    desc: "Zevitech transformed our brand identity completely. Their attention to detail and creative approach helped us stand out in a competitive market. The team delivered beyond our expectations.",
  },
  {
    id: "2",
    name: "Michael Chen",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "Digital Solutions",
    role: "Marketing Director",
    rating: 5,
    desc: "Working with Zevitech was a game-changer for our business. They created a stunning website that not only looks amazing but also converts visitors into customers. Highly recommended!",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    company: "Creative Agency",
    role: "Creative Director",
    rating: 5,
    desc: "The level of professionalism and creativity from Zevitech is unmatched. They understood our vision perfectly and delivered a brand identity that truly represents who we are.",
  },
  {
    id: "4",
    name: "David Thompson",
    img: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    company: "E-commerce Plus",
    role: "Business Owner",
    rating: 5,
    desc: "Our Shopify store redesign by Zevitech resulted in a 150% increase in conversions. Their technical expertise and design skills are exceptional. Worth every investment.",
  },
  {
    id: "5",
    name: "Lisa Park",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    company: "Wellness Brand",
    role: "Brand Manager",
    rating: 5,
    desc: "Zevitech created a cohesive brand experience across all our touchpoints. From logo design to website development, everything flows seamlessly. Truly professional work.",
  },
  {
    id: "6",
    name: "James Wilson",
    img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    company: "Tech Innovations",
    role: "Product Manager",
    rating: 5,
    desc: "The team at Zevitech is incredibly talented and responsive. They delivered our project on time and exceeded all our requirements. Looking forward to working with them again.",
  },
];

const TestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="relative group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Professional Card */}
      <div className="min-w-[22rem] min-h-[28rem] p-8 rounded-2xl bg-card border border-border shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl">
        
        {/* Quote Icon */}
        <motion.div 
          className="absolute -top-4 -left-4 text-6xl text-primary/20"
          animate={{ 
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <FaQuoteLeft />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between pt-12">
          {/* Rating */}
          <motion.div 
            className="flex gap-1 mb-6"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
          >
            {[...Array(item.rating)].map((_, i) => (
              <motion.span
                key={i}
                className="text-accent text-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                ★
              </motion.span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div 
            className="text-paragraph leading-relaxed mb-8 flex-1"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
          >
            <p>&quot;{item.desc}&quot;</p>
          </motion.div>

          {/* Profile Section */}
          <motion.div 
            className="flex items-center gap-4"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-border shadow-md">
                <Image
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="text-lg font-bold text-heading mb-1">
                {item.name}
              </h4>
              <p className="text-paragraph text-sm font-medium">{item.role}</p>
              <p className="text-primary text-sm font-medium">{item.company}</p>
            </div>
          </motion.div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-2xl opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);


  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-heading mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-paragraph leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about working with Zevitech.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Section */}
      <div className="h-[300vh] relative" ref={targetRef}>
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          {/* Testimonials Container */}
          <motion.div 
            className="flex gap-8 lg:gap-12 xl:gap-16 px-8 items-center"
            style={{ x }}
          >
            {testimonials.map((item, index) => (
              <TestimonialCard 
                key={item.id}
                item={item}
                index={index}
                isActive={false}
              />
            ))}
          </motion.div>
{/* 
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl lg:text-8xl xl:text-9xl font-black text-muted/10 select-none pointer-events-none uppercase tracking-wider font-heading">
            Reviews
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;