"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

import { trackGoogleAdsEvent } from "@/lib/google-ads-analytics";

const motionEase = [0.22, 1, 0.36, 1] as const;

const ordinaryAgency = [
  "Runs ads and reports clicks",
  "Optimizes for impressions and traffic",
  "Sends a monthly PDF and disappears",
  "Set-and-forget campaign structure",
  "Ads live in a silo, disconnected from sales",
];

const growthSystem = [
  "Connects ads, landing pages, tracking, and follow-up",
  "Optimizes for leads, bookings, checkouts, and revenue",
  "Live, verifiable results you can open anytime",
  "Continuous testing that scales proven winners",
  "One system built around how your business actually sells",
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: motionEase } },
};

export default function GoogleAdsDifference() {
  const prefersReducedMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 130, damping: 17, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 130, damping: 17, mass: 0.6 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const bounds = sceneRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -8);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section className="ga-difference">
      <span className="ga-difference-orb ga-difference-orb-a" aria-hidden="true" />
      <span className="ga-difference-orb ga-difference-orb-b" aria-hidden="true" />

      <div className="layout-standard relative py-16 md:py-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: motionEase }}
        >
          <span className="ga-section-kicker ga-section-kicker-dark">The Zevitech Difference</span>
          <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
            Not just another ads company.
            <span className="ga-gradient-text ga-gradient-animated block">A complete sales growth system.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Ordinary agencies rent you traffic. We build the machine behind it&mdash;so every click has a path to becoming a customer.
          </p>
        </motion.div>

        <div className="ga-difference-grid mt-12">
          <motion.div
            className="ga-difference-col is-ordinary"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -36 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: motionEase }}
          >
            <h3>An ordinary ads company</h3>
            <motion.ul
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView={prefersReducedMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.3 }}
              variants={listVariants}
            >
              {ordinaryAgency.map((item) => (
                <motion.li key={item} variants={itemVariants}>
                  <span aria-hidden="true"><X /></span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <span className="ga-difference-vs" aria-hidden="true">VS</span>

          <motion.div
            className="ga-difference-stage"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 36, scale: 0.97 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.08, ease: motionEase }}
          >
            <div
              ref={sceneRef}
              className="ga-difference-scene"
              onPointerMove={handlePointerMove}
              onPointerLeave={resetTilt}
            >
              <motion.div
                className="ga-difference-object"
                style={prefersReducedMotion ? undefined : { rotateX: springX, rotateY: springY }}
              >
                <div className="ga-difference-col is-zevitech">
                  <h3><Zap aria-hidden="true" /> The Zevitech growth system</h3>
                  <motion.ul
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "visible"}
                    viewport={{ once: true, amount: 0.3 }}
                    variants={listVariants}
                  >
                    {growthSystem.map((item) => (
                      <motion.li key={item} variants={itemVariants}>
                        <span aria-hidden="true"><Check /></span>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div className="ga-3d-float ga-difference-float-a">
                  <span className="ga-3d-float-icon is-green"><BadgeCheck /></span>
                  <span><small>Lead quality</small><b>Verified &amp; tracked</b></span>
                </div>
                <div className="ga-3d-float ga-difference-float-b">
                  <span className="ga-3d-float-icon"><TrendingUp /></span>
                  <span><small>System output</small><b>Revenue, not clicks</b></span>
                </div>
              </motion.div>
              <div className="ga-showcase-shadow" aria-hidden="true" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: motionEase }}
        >
          <a
            href="#google-ads-growth-form"
            className="ga-primary-cta group"
            onClick={() => trackGoogleAdsEvent("ga_audit_cta_click", { location: "difference" })}
          >
            Build My Growth System
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
