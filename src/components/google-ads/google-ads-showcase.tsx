"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarCheck,
  Check,
  MousePointerClick,
  Search,
  ShoppingCart,
  Target,
  TrendingUp,
} from "lucide-react";

import { trackGoogleAdsEvent } from "@/lib/google-ads-analytics";

const motionEase = [0.22, 1, 0.36, 1] as const;

type ShowcaseVariant = "audit" | "system";

type GoogleAdsShowcaseProps = {
  variant: ShowcaseVariant;
  badge: string;
  title: string;
  desc01: string;
  desc02: string;
  reverse?: boolean;
};

const auditRows = [
  { term: "google ads agency near me", value: "High intent", state: "win" as const },
  { term: "free ads no budget", value: "Wasted spend", state: "loss" as const },
  { term: "book plumber today", value: "Converting", state: "win" as const },
];

function CountUpValue({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || !inView) return;
    if (prefersReducedMotion) {
      element.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [decimals, inView, prefix, prefersReducedMotion, suffix, target]);

  return <b ref={ref}>{prefix}0{suffix}</b>;
}

const systemSteps = [
  { label: "Search", icon: Search, detail: "High-intent query captured" },
  { label: "Landing", icon: MousePointerClick, detail: "Message matches the ad" },
  { label: "Convert", icon: BadgeCheck, detail: "Call, form, or checkout tracked" },
  { label: "Scale", icon: TrendingUp, detail: "Budget follows proven winners" },
] as const;

export default function GoogleAdsShowcase({
  variant,
  badge,
  title,
  desc01,
  desc02,
  reverse = false,
}: GoogleAdsShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 16, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 16, mass: 0.6 });

  // Auto-cycle the journey until the visitor interacts.
  useEffect(() => {
    if (variant !== "system" || prefersReducedMotion || interacted) return;
    const timer = window.setInterval(() => {
      setActiveStep((step) => (step + 1) % systemSteps.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [interacted, prefersReducedMotion, variant]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const bounds = sceneRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(py * -12);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const copy = (
    <motion.div
      className="ga-showcase-copy"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: motionEase }}
    >
      <span className="ga-section-kicker">{badge}</span>
      <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-heading md:text-5xl">{title}</h2>
      <p className="mt-6 text-base leading-relaxed text-paragraph md:text-lg">{desc01}</p>
      <p className="mt-4 text-base leading-relaxed text-paragraph md:text-lg">{desc02}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="#google-ads-growth-form"
          className="ga-primary-cta group"
          onClick={() => trackGoogleAdsEvent("ga_audit_cta_click", { location: `showcase-${variant}` })}
        >
          Request My Free Growth Audit
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );

  const scene = (
    <motion.div
      className="ga-showcase-stage"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 44, scale: 0.96 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.72, delay: 0.08, ease: motionEase }}
    >
      <div
        ref={sceneRef}
        className="ga-showcase-scene"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <motion.div
          className="ga-showcase-object"
          style={prefersReducedMotion ? undefined : { rotateX: springX, rotateY: springY }}
        >
          {variant === "audit" ? (
            <>
              <div className="ga-3d-panel ga-3d-base">
                <div className="ga-3d-topbar">
                  <span><span className="ga-live-dot" /> Account audit</span>
                  <small>Live view</small>
                </div>
                <div className="ga-3d-stats">
                  <div><small>Impressions</small><CountUpValue target={184} suffix="K" /><i className="is-up">▲ 12%</i></div>
                  <div><small>Wasted spend</small><CountUpValue target={38} prefix="-" suffix="%" /><i className="is-down">▼ cut</i></div>
                  <div><small>Conversions</small><CountUpValue target={3.4} suffix="K" decimals={1} /><i className="is-up">▲ 27%</i></div>
                </div>
                <div className="ga-3d-chart" aria-hidden="true">
                  {[34, 48, 42, 58, 66, 61, 78, 86, 92].map((height, index) => (
                    <motion.span
                      key={index}
                      initial={prefersReducedMotion ? false : { scaleY: 0 }}
                      whileInView={prefersReducedMotion ? undefined : { scaleY: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.5, delay: 0.25 + index * 0.05, ease: motionEase }}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="ga-3d-terms">
                  <small>Search terms</small>
                  {auditRows.map((row) => (
                    <div key={row.term} className={`ga-3d-term is-${row.state}`}>
                      <span>{row.term}</span>
                      <b>{row.value}</b>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ga-3d-float ga-3d-float-a">
                <span className="ga-3d-float-icon"><Target /></span>
                <span><small>Targeting</small><b>High-intent only</b></span>
              </div>
              <div className="ga-3d-float ga-3d-float-b">
                <span className="ga-3d-float-icon is-green"><Check /></span>
                <span><small>Tracking</small><b>Verified</b></span>
              </div>
              <div className="ga-3d-float ga-3d-float-c">
                <span className="ga-3d-float-icon"><BarChart3 /></span>
                <span><small>Optimizing toward</small><b>Leads &amp; sales</b></span>
              </div>
            </>
          ) : (
            <>
              <div className="ga-3d-panel ga-3d-base">
                <div className="ga-3d-topbar">
                  <span><span className="ga-live-dot" /> Growth system</span>
                  <small>Search → sale</small>
                </div>
                <div className="ga-3d-journey">
                  <span className="ga-3d-journey-route" aria-hidden="true">
                    <motion.i
                      initial={false}
                      animate={{ scaleX: activeStep / (systemSteps.length - 1) }}
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: motionEase }}
                    />
                  </span>
                  {systemSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    const active = index === activeStep;
                    return (
                      <button
                        key={step.label}
                        type="button"
                        className={`ga-3d-journey-node ${index <= activeStep ? "is-complete" : ""} ${active ? "is-active" : ""}`}
                        aria-pressed={active}
                        onClick={() => {
                          setInteracted(true);
                          setActiveStep(index);
                        }}
                      >
                        <span><StepIcon aria-hidden="true" /></span>
                        <small>{step.label}</small>
                      </button>
                    );
                  })}
                </div>
                <motion.div
                  key={activeStep}
                  className="ga-3d-journey-detail"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: motionEase }}
                  aria-live="polite"
                >
                  <b>Step 0{activeStep + 1}</b>
                  <span>{systemSteps[activeStep].detail}</span>
                </motion.div>
              </div>

              <div className="ga-3d-float ga-3d-float-a">
                <span className="ga-3d-float-icon is-green"><CalendarCheck /></span>
                <span><small>New booking</small><b>Strategy call · 2:30 PM</b></span>
              </div>
              <div className="ga-3d-float ga-3d-float-b">
                <span className="ga-3d-float-icon"><ShoppingCart /></span>
                <span><small>Checkout tracked</small><b>Purchase complete</b></span>
              </div>
              <div className="ga-3d-float ga-3d-float-c">
                <span className="ga-3d-float-icon"><TrendingUp /></span>
                <span><small>Budget shift</small><b>Winners scaled</b></span>
              </div>
            </>
          )}
        </motion.div>
        <div className="ga-showcase-shadow" aria-hidden="true" />
      </div>
    </motion.div>
  );

  return (
    <section className="layout-standard py-14 md:py-20">
      <div className={`ga-showcase ${reverse ? "is-reversed" : ""}`}>
        {copy}
        {scene}
      </div>
    </section>
  );
}
