"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  MousePointerClick,
  Search,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import HeroMarquee from "@/components/common/hero-marquee";
import GoogleAdsSchedulerModal from "@/components/google-ads/google-ads-scheduler-modal";
import { SendGoogleAdsLeadEmail } from "@/services/google-ads-lead-service";
import { captureGoogleAdsAttribution } from "@/lib/google-ads-attribution";
import { trackGoogleAdsEvent } from "@/lib/google-ads-analytics";

import TrustpilotIcon from "../../../public/icons/trustpilot-icon-01.svg";
import ClutchIOIcon from "../../../public/icons/clutch-io-icon.png";
import GoogleReviewsIcon from "../../../public/icons/google-reviews-icon.png";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  growthGoal: "",
  message: "",
};

const growthGoalOptions = [
  "More qualified leads",
  "More ecommerce sales",
  "Both leads and sales",
  "Fix tracking and reduce wasted spend",
];

const stageOptions = [
  { id: "new", label: "Just getting started" },
  { id: "running", label: "Already running ads" },
] as const;

type BusinessStage = (typeof stageOptions)[number]["id"];

const painPointSets: Record<BusinessStage, ReadonlyArray<{ id: string; label: string; solution: string }>> = {
  new: [
    {
      id: "No campaigns yet - starting fresh",
      label: "Starting fresh — no campaigns yet",
      solution: "A launch roadmap: account, tracking, and first campaigns set up right",
    },
    {
      id: "No steady customers or leads yet",
      label: "No steady customers or leads yet",
      solution: "High-intent search campaigns that bring your first qualified leads",
    },
    {
      id: "Website gets barely any traffic",
      label: "Website up, but no traffic",
      solution: "Get found on the exact searches your buyers are already making",
    },
    {
      id: "Unsure what to promote first",
      label: "Not sure where to start",
      solution: "A clear offer and keyword strategy built on real search demand",
    },
    {
      id: "Need first customers fast",
      label: "Need my first customers fast",
      solution: "Quick-win campaigns with clean tracking from day one",
    },
  ],
  running: [
  {
    id: "Wasting budget on wrong clicks",
    label: "Wasting budget on wrong clicks",
    solution: "Search-term and targeting cleanup that cuts wasted spend",
  },
  {
    id: "Not enough qualified leads",
    label: "Not enough qualified leads",
    solution: "High-intent campaigns tracked to calls, forms, and bookings",
  },
  {
    id: "Low online sales or abandoned carts",
    label: "Low online sales / abandoned carts",
    solution: "Shopping and remarketing tuned to checkout revenue",
  },
  {
    id: "Cannot trust tracking numbers",
    label: "Can't trust my tracking numbers",
    solution: "Conversion tracking verified end-to-end before scaling",
  },
  {
    id: "Campaigns stopped improving",
    label: "Campaigns stopped improving",
    solution: "A testing roadmap that scales what actually wins",
  },
  {
    id: "Scaling without losing efficiency",
    label: "Want to scale without losing efficiency",
    solution: "Budget scaling guided by proven, tracked winners",
  },
  ],
};

const trustLinks = [
  {
    href: "https://clutch.co/profile/zevitech",
    src: ClutchIOIcon,
    alt: "Read Zevitech reviews on Clutch",
    className: "w-[92px] sm:w-[110px]",
  },
  {
    href: "https://www.trustpilot.com/review/zevitech.com",
    src: TrustpilotIcon,
    alt: "Read Zevitech reviews on Trustpilot",
    className: "w-[118px] sm:w-[140px] invert",
  },
  {
    href: "https://www.google.com/search?q=zevitech",
    src: GoogleReviewsIcon,
    alt: "Read Zevitech reviews on Google",
    className: "w-[100px] sm:w-[120px]",
  },
];

export default function GoogleAdsHero() {
  const [formData, setFormData] = useState(initialFormData);
  const [funnelStep, setFunnelStep] = useState<0 | 1>(0);
  const [businessStage, setBusinessStage] = useState<BusinessStage>("new");
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const painPoints = painPointSets[businessStage];
  const stageLabel = stageOptions.find((option) => option.id === businessStage)?.label ?? "";
  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const closeScheduler = useCallback(() => setSubmittedLead(null), []);

  useEffect(() => {
    captureGoogleAdsAttribution();
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#google-ads-growth-roadmap") return;

    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const resetFrame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(resetFrame);
  }, []);

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const switchStage = (stage: BusinessStage) => {
    if (stage === businessStage) return;
    setBusinessStage(stage);
    setSelectedPains([]);
    trackGoogleAdsEvent("ga_funnel_stage", { stage });
  };

  const togglePain = (id: string) => {
    setSelectedPains((current) =>
      current.includes(id)
        ? current.filter((pain) => pain !== id)
        : [...current, id],
    );
  };

  const goToDetailsStep = () => {
    if (!selectedPains.length) return;
    setFunnelStep(1);
    trackGoogleAdsEvent("ga_funnel_step", { step: 2, pains: selectedPains.length });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const success = await SendGoogleAdsLeadEmail({
        ...formData,
        services: [`Stage: ${stageLabel}`, ...selectedPains],
        sourceSection: "hero",
      });

      if (!success) {
        throw new Error("Submission failed");
      }

      try {
        if (window.gtag_report_conversion) {
          const nameParts = formData.name.trim().split(/\s+/);
          await window.gtag_report_conversion(undefined, {
            email: formData.email,
            phone: formData.phone,
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" "),
          });
        }
      } catch (trackingError) {
        console.warn(
          "Lead sent, but conversion tracking failed:",
          trackingError,
        );
      }

      toast.success("Request sent. Choose a time for your growth call.");
      trackGoogleAdsEvent("ga_lead_submitted", { source: "hero" });
      trackGoogleAdsEvent("ga_scheduler_open", { source: "hero" });
      setSubmittedLead({ name: formData.name, email: formData.email });
      setFormData(initialFormData);
      setSelectedPains([]);
      setFunnelStep(0);
    } catch {
      toast.error("We couldn’t send your request. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <section className="ga-hero relative overflow-hidden pb-10 pt-32 md:pb-16 md:pt-36 lg:pt-40">
      <div className="ga-hero-grid" aria-hidden="true" />
      <div className="ga-orb ga-orb-one" aria-hidden="true" />
      <div className="ga-orb ga-orb-two" aria-hidden="true" />

      <div className="layout-standard relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="ga-eyebrow mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] sm:text-sm">
              <Sparkles className="h-4 w-4" />
              Google Ads • leads • sales • business growth
            </div>

            <h1 className="max-w-3xl font-heading text-[2.7rem] font-bold leading-[0.98] tracking-tight text-heading sm:text-6xl lg:text-[4.25rem]">
              {"Turn high-intent searches into".split(" ").map((word, index) => (
                <motion.span
                  key={word + index}
                  className="ga-word"
                  initial={{ opacity: 0, y: 26, rotateX: 30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.55, delay: 0.12 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
              <motion.span
                className="ga-gradient-text ga-gradient-animated block"
                initial={{ opacity: 0, y: 30, rotateX: 30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                customers and sales.
              </motion.span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-heading md:text-xl">
              We don&apos;t just drive clicks. We build campaigns that connect ad spend to meaningful business results.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-paragraph md:text-lg">
              For service businesses seeking qualified inquiries and product brands ready to grow online purchases and checkout revenue.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#google-ads-growth-form"
                className="ga-primary-cta group"
                onClick={() => trackGoogleAdsEvent("ga_audit_cta_click", { location: "hero" })}
              >
                Request My Free Growth Audit
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                [BadgeCheck, "Qualified leads & booked calls"],
                [ShoppingCart, "Online purchases & checkouts"],
                [BarChart3, "Optimization tied to results"],
              ].map(([Icon, copy]) => {
                const FeatureIcon = Icon as typeof BadgeCheck;
                return (
                  <div key={copy as string} className="ga-proof-chip">
                    <FeatureIcon className="h-4 w-4 text-primary" />
                    <span>{copy as string}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-slate-200/80 pt-6">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-paragraph">Independent reviews</span>
              {trustLinks.map((item) => (
                <Link key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.alt}>
                  <Image src={item.src} alt={item.alt} className={`${item.className} h-auto opacity-90 transition hover:scale-105 hover:opacity-100`} />
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="ga-form-scene relative mx-auto w-full max-w-xl"
          >
            <div className="ga-float-card ga-float-search" aria-hidden="true">
              <Search className="h-4 w-4" /> High-intent search
            </div>
            <div className="ga-float-card ga-float-click" aria-hidden="true">
              <MousePointerClick className="h-4 w-4" /> Qualified click
            </div>
            <div className="ga-float-card ga-float-lead" aria-hidden="true">
              <BadgeCheck className="h-4 w-4" /> Lead or purchase
            </div>

            <div id="google-ads-growth-form" className="ga-form-card scroll-mt-32">
              <div className="ga-form-topline">
                <span className="inline-flex items-center gap-2"><span className="ga-live-dot" /> Accepting new campaigns</span>
                <span>Schedule after submitting</span>
              </div>

              <div className="px-5 pb-5 pt-7 sm:px-8 sm:pb-8">
                <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Free strategy request</p>
                <span className="ga-funnel-progress" aria-live="polite">
                  Step {funnelStep + 1} of 2
                  <i aria-hidden="true"><b style={{ width: funnelStep === 0 ? "50%" : "100%" }} /></i>
                </span>
              </div>

              <AnimatePresence initial={false} mode="wait">
                {funnelStep === 0 ? (
                  <motion.div
                    key="qualifier"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2 className="font-heading text-3xl font-bold leading-tight text-heading sm:text-[2.1rem]">
                      {businessStage === "new" ? "Ready to win your first customers?" : "What's blocking your growth?"}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-paragraph">
                      {businessStage === "new"
                        ? "Tell us where you're starting from. We'll map your path to a working growth system."
                        : "Select everything that sounds familiar. We'll build your audit around it."}
                    </p>

                    <div className="ga-stage-switch mt-4" role="group" aria-label="Where is your business today?">
                      {stageOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={businessStage === option.id}
                          className={businessStage === option.id ? "is-active" : ""}
                          onClick={() => switchStage(option.id)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    <div className="ga-pain-grid mt-5" role="group" aria-label="Select your growth challenges">
                      {painPoints.map((pain) => {
                        const checked = selectedPains.includes(pain.id);
                        return (
                          <label key={pain.id} className={`ga-pain-chip ${checked ? "is-checked" : ""}`}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => togglePain(pain.id)}
                            />
                            <span className="ga-pain-check" aria-hidden="true"><Check /></span>
                            <span>{pain.label}</span>
                          </label>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="ga-form-submit group mt-5"
                      disabled={!selectedPains.length}
                      onClick={goToDetailsStep}
                    >
                      See my solution
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
                      {selectedPains.length
                        ? `${selectedPains.length} selected — your plan updates in the next step.`
                        : "Pick at least one to continue."}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button type="button" className="ga-funnel-back" onClick={() => setFunnelStep(0)}>
                      <ArrowLeft className="h-4 w-4" /> Edit challenges
                    </button>
                    <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-heading sm:text-[2.1rem]">
                      {businessStage === "new" ? "Here's your path to customers." : "Here's how we'll fix it."}
                    </h2>

                    <ul className="ga-solution-list mt-4" aria-label="Your tailored solutions">
                      {painPoints
                        .filter((pain) => selectedPains.includes(pain.id))
                        .map((pain) => (
                          <li key={pain.id}>
                            <span aria-hidden="true"><Check /></span>
                            {pain.solution}
                          </li>
                        ))}
                    </ul>

                    <p className="mt-4 text-sm leading-relaxed text-paragraph">Book your free strategy call and we&apos;ll walk through this plan together.</p>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="ga-field">
                          <span>Name</span>
                          <input name="name" value={formData.name} onChange={handleInputChange} autoComplete="name" placeholder="Your name" required />
                        </label>
                        <label className="ga-field">
                          <span>Business email</span>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} autoComplete="email" placeholder="you@company.com" required />
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="ga-field">
                          <span>Phone</span>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} autoComplete="tel" placeholder="Your phone number" required />
                        </label>
                        <label className="ga-field">
                          <span>Primary growth goal</span>
                          <select name="growthGoal" value={formData.growthGoal} onChange={handleInputChange} required>
                            <option value="" disabled>Select your goal</option>
                            {growthGoalOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                          </select>
                        </label>
                      </div>

                      <label className="ga-field">
                        <span>Website and context</span>
                        <textarea name="message" value={formData.message} onChange={handleInputChange} rows={2} placeholder="Your website, market, and anything else we should know." required />
                      </label>

                      <button type="submit" className="ga-form-submit group" disabled={loading}>
                        {loading ? <span className="ga-spinner" /> : <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
                        {loading ? "Sending your request..." : "Book My Free Strategy Call"}
                      </button>

                      <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-slate-500">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        No obligation. Your details stay private. Pick a call time right after submitting.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              </div>
            </div>
          </motion.div>
        </div>

        <div className="ga-logo-rail mt-12 md:mt-16">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Trusted by ambitious teams and founders</p>
          <HeroMarquee />
        </div>
      </div>
    </section>
    <GoogleAdsSchedulerModal
      open={Boolean(submittedLead)}
      onClose={closeScheduler}
      name={submittedLead?.name}
      email={submittedLead?.email}
    />
    </>
  );
}
