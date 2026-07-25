"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BadgeCheck,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";

import { trackGoogleAdsEventOnce } from "@/lib/google-ads-analytics";

type GrowthMode = "services" | "ecommerce";

const motionEase = [0.22, 1, 0.36, 1] as const;
const scrollStoryMediaQuery =
  "(min-height: 640px) and (prefers-reduced-motion: no-preference)";
const desktopLayoutMediaQuery = "(min-width: 1200px) and (min-height: 700px)";
const storyStageLabels = ["Audit", "Target", "Convert", "Scale"] as const;

const storyData = {
  services: {
    label: "Service businesses",
    shortLabel: "Search to customer",
    pipeline: ["Search", "Landing page", "Qualified lead", "New customer"],
    stages: [
      {
        eyebrow: "Step 01 · Audit",
        title: "Stop paying for the wrong clicks.",
        description: "We find wasted spend, weak targeting, and conversion tracking gaps.",
        visualTitle: "Find where budget is leaking",
        insight: "First, we make the account easier to trust and improve.",
        icon: Search,
        bullets: ["Review search terms and targeting", "Check calls, forms, and conversion data"],
      },
      {
        eyebrow: "Step 02 · Target",
        title: "Reach people who are ready to buy.",
        description: "We focus keywords, locations, and ads on high-intent searches.",
        visualTitle: "Focus on real buying intent",
        insight: "Your budget is directed toward the searches most likely to become customers.",
        icon: Target,
        bullets: ["Prioritize valuable keywords and locations", "Match ads to the buyer’s immediate need"],
      },
      {
        eyebrow: "Step 03 · Convert",
        title: "Turn more visits into qualified leads.",
        description: "We align ads and landing pages, then track calls, forms, and booked meetings.",
        visualTitle: "Make the next step easy",
        insight: "A clear path from search to inquiry helps more interested prospects take action.",
        icon: BadgeCheck,
        bullets: ["Strengthen the ad-to-page message", "Track qualified calls, forms, and bookings"],
      },
      {
        eyebrow: "Step 04 · Scale",
        title: "Put more budget behind what wins.",
        description: "We test and scale campaigns producing qualified leads and sales.",
        visualTitle: "Scale proven campaigns",
        insight: "Budget follows real customer outcomes instead of clicks alone.",
        icon: TrendingUp,
        bullets: ["Increase investment in proven campaigns", "Keep testing ads, offers, and audiences"],
      },
    ],
  },
  ecommerce: {
    label: "Ecommerce",
    shortLabel: "Product search to sale",
    pipeline: ["Product search", "Product page", "Checkout", "Sale"],
    stages: [
      {
        eyebrow: "Step 01 · Audit",
        title: "Find where online sales are being lost.",
        description: "We review product visibility, wasted spend, tracking, and checkout drop-off.",
        visualTitle: "Find the sales gaps",
        insight: "We identify what prevents product clicks from becoming purchases.",
        icon: Search,
        bullets: ["Review product and search performance", "Check cart, checkout, and purchase tracking"],
      },
      {
        eyebrow: "Step 02 · Target",
        title: "Show the right products to ready buyers.",
        description: "We align product feeds, searches, audiences, and offers around purchase intent.",
        visualTitle: "Match products to demand",
        insight: "Relevant products and offers appear when shoppers are actively comparing options.",
        icon: Target,
        bullets: ["Improve product feed and query alignment", "Focus spend on high-intent audiences"],
      },
      {
        eyebrow: "Step 03 · Convert",
        title: "Turn more product clicks into purchases.",
        description: "We connect ads to a clear product, cart, and checkout journey.",
        visualTitle: "Improve the purchase path",
        insight: "Every important step is measured so campaigns can optimize toward completed sales.",
        icon: BadgeCheck,
        bullets: ["Measure cart, checkout, and purchase events", "Remarket to shoppers who did not finish"],
      },
      {
        eyebrow: "Step 04 · Scale",
        title: "Scale the products that sell.",
        description: "We put more budget behind winning products, offers, and audiences.",
        visualTitle: "Grow proven revenue",
        insight: "Sales data shows where to invest next and what to test.",
        icon: TrendingUp,
        bullets: ["Increase visibility for winning products", "Keep testing offers, creative, and audiences"],
      },
    ],
  },
} as const;

const outcomes = [
  { label: "Qualified leads", detail: "Calls, forms, and serious inquiries" },
  { label: "Booked conversations", detail: "A direct route into your sales team" },
  { label: "Online purchases", detail: "Tracked product and checkout sales" },
  { label: "Smarter decisions", detail: "Clear data for where to invest next" },
];

type StoryStage = (typeof storyData)[GrowthMode]["stages"][number];

function ScrollChapterLayer({
  stage,
  index,
  active,
  progress,
}: {
  stage: StoryStage;
  index: number;
  active: boolean;
  progress: MotionValue<number>;
}) {
  const StageIcon = stage.icon;
  const transitionOverlap = 0.065;
  const enterBoundary = (index - 0.5) / 3;
  const exitBoundary = (index + 0.5) / 3;
  const ranges = index === 0
    ? [0, exitBoundary - transitionOverlap, exitBoundary + transitionOverlap]
    : index === 3
      ? [enterBoundary - transitionOverlap, enterBoundary + transitionOverlap, 1]
      : [
        enterBoundary - transitionOverlap,
        enterBoundary + transitionOverlap,
        exitBoundary - transitionOverlap,
        exitBoundary + transitionOverlap,
      ];
  const yValues = index === 0
    ? [0, 0, -24]
    : index === 3
      ? [24, 0, 0]
      : [24, 0, 0, -24];
  const y = useTransform(progress, ranges, yValues);

  return (
    <motion.article
      className={`ga-story-active-copy ${active ? "is-active" : ""}`}
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.985 }}
      transition={{ duration: 0.28, ease: motionEase }}
      style={{ y, zIndex: active ? 2 : 1 }}
      aria-hidden={!active}
    >
      <div className="ga-story-copy-meta">
        <span className="ga-story-stage-eyebrow">
          <span className="ga-story-inline-icon"><StageIcon strokeWidth={1.75} /></span>
          {stage.eyebrow}
        </span>
        <span>0{index + 1} / 04</span>
      </div>
      <h3>{stage.title}</h3>
      <p>{stage.description}</p>
      <div className="ga-story-copy-signal">
        <i aria-hidden="true" />
        <span>{stage.visualTitle}</span>
      </div>
    </motion.article>
  );
}

function ChapterRailProgress({
  complete,
}: {
  complete: boolean;
}) {
  return (
    <i aria-hidden="true">
      <motion.span
        animate={{ scaleX: complete ? 1 : 0 }}
        transition={{ duration: 0.28, ease: motionEase }}
      />
    </i>
  );
}

function EngineJourneyNode({
  label,
  index,
  current,
  complete,
}: {
  label: string;
  index: number;
  current: boolean;
  complete: boolean;
}) {
  return (
    <div className={`ga-engine-node ${complete ? "is-complete" : ""} ${current ? "is-current" : ""}`}>
      <span>0{index + 1}</span>
      <small>{label}</small>
    </div>
  );
}

export default function GoogleAdsGrowthStory() {
  const [mode, setMode] = useState<GrowthMode>("services");
  const [activeStage, setActiveStage] = useState(0);
  const [scrollStoryEnabled, setScrollStoryEnabled] = useState(false);
  const [desktopLayoutEnabled, setDesktopLayoutEnabled] = useState(false);
  const storyTrackRef = useRef<HTMLDivElement>(null);
  const scrollStoryEnabledRef = useRef(false);
  const activeStageRef = useRef(0);
  const wheelLockRef = useRef(false);
  const wheelTargetStageRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: storyTrackRef,
    offset: ["start start", "end end"],
  });
  const headerY = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [8, 0, 0, -8]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0.9, 1, 1, 0.88]);
  const sceneY = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);
  const engineY = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12, 0.86, 1], [0.55, 1, 1, 0]);

  const currentStory = storyData[mode];
  const currentStage = currentStory.stages[activeStage];
  const ActiveStageIcon = currentStage.icon;

  useEffect(() => {
    const scrollStoryQuery = window.matchMedia(scrollStoryMediaQuery);
    const desktopLayoutQuery = window.matchMedia(desktopLayoutMediaQuery);

    const syncScrollExperience = () => {
      scrollStoryEnabledRef.current = scrollStoryQuery.matches;
      setScrollStoryEnabled(scrollStoryQuery.matches);
      setDesktopLayoutEnabled(desktopLayoutQuery.matches);
    };

    syncScrollExperience();
    scrollStoryQuery.addEventListener("change", syncScrollExperience);
    desktopLayoutQuery.addEventListener("change", syncScrollExperience);

    return () => {
      scrollStoryQuery.removeEventListener("change", syncScrollExperience);
      desktopLayoutQuery.removeEventListener("change", syncScrollExperience);
    };
  }, []);

  useEffect(() => {
    activeStageRef.current = activeStage;
  }, [activeStage]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!scrollStoryEnabledRef.current) return;

    const nextStage = Math.min(
      currentStory.stages.length - 1,
      Math.round(Math.max(0, Math.min(1, progress)) * (currentStory.stages.length - 1)),
    );

    if (activeStageRef.current !== nextStage) {
      activeStageRef.current = nextStage;
      setActiveStage(nextStage);
      trackGoogleAdsEventOnce(
        `roadmap-stage-${nextStage}`,
        "ga_roadmap_stage_view",
        { stage: nextStage + 1 },
      );
    }
  });

  const goToStage = useCallback((index: number) => {
    const boundedIndex = Math.max(0, Math.min(currentStory.stages.length - 1, index));
    const scrollExperienceEnabled = scrollStoryEnabledRef.current
      || window.matchMedia(scrollStoryMediaQuery).matches;
    scrollStoryEnabledRef.current = scrollExperienceEnabled;
    if (!scrollExperienceEnabled || !storyTrackRef.current) {
      activeStageRef.current = boundedIndex;
      setActiveStage(boundedIndex);
      return;
    }

    const track = storyTrackRef.current;
    const scrollableDistance = Math.max(0, track.offsetHeight - window.innerHeight);
    const chapterProgress = boundedIndex / (currentStory.stages.length - 1);
    const trackTop = window.scrollY + track.getBoundingClientRect().top;

    window.scrollTo({
      top: trackTop + scrollableDistance * chapterProgress,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [currentStory.stages.length, prefersReducedMotion]);

  useEffect(() => {
    const track = storyTrackRef.current;
    if (!scrollStoryEnabled || !track) return;

    let wheelDelta = 0;
    let idleTimer: number | undefined;
    let unlockTimer: number | undefined;
    let touchStartY: number | null = null;
    let touchStartStage = 0;

    const releaseWheelLock = () => {
      window.clearTimeout(unlockTimer);
      wheelLockRef.current = false;
      wheelTargetStageRef.current = null;
      wheelDelta = 0;
    };

    const scheduleUnlock = () => {
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        releaseWheelLock();
      }, 750);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      const verticalDelta = event.deltaY * (
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1
      );

      if (!verticalDelta || Math.abs(event.deltaX) > Math.abs(verticalDelta)) return;

      if (wheelLockRef.current) {
        event.preventDefault();
        scheduleUnlock();
        return;
      }

      const rect = track.getBoundingClientRect();
      const pinned = rect.top <= 2 && rect.bottom >= window.innerHeight - 2;
      if (!pinned) return;

      const direction = Math.sign(verticalDelta);
      const current = activeStageRef.current;
      const lastStage = currentStory.stages.length - 1;

      if ((direction < 0 && current === 0) || (direction > 0 && current === lastStage)) {
        wheelDelta = 0;
        return;
      }

      event.preventDefault();
      if (wheelDelta && Math.sign(wheelDelta) !== direction) wheelDelta = 0;
      wheelDelta += verticalDelta;

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        wheelDelta = 0;
      }, 140);

      if (Math.abs(wheelDelta) < 18) return;

      wheelDelta = 0;
      wheelLockRef.current = true;
      wheelTargetStageRef.current = current + direction;
      goToStage(wheelTargetStageRef.current);
      scheduleUnlock();
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;

      const rect = track.getBoundingClientRect();
      const pinned = rect.top <= 2 && rect.bottom >= window.innerHeight - 2;
      if (!pinned) {
        touchStartY = null;
        return;
      }

      touchStartY = event.touches[0].clientY;
      touchStartStage = activeStageRef.current;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartY === null || !event.changedTouches[0]) return;

      const gestureDistance = touchStartY - event.changedTouches[0].clientY;
      touchStartY = null;
      if (Math.abs(gestureDistance) < 32) return;

      const direction = Math.sign(gestureDistance);
      const targetStage = touchStartStage + direction;
      const lastStage = currentStory.stages.length - 1;
      if (targetStage < 0 || targetStage > lastStage) return;

      goToStage(targetStage);
    };

    const handleTouchCancel = () => {
      touchStartY = null;
    };

    track.addEventListener("wheel", handleWheel, { passive: false });
    track.addEventListener("touchstart", handleTouchStart, { passive: true });
    track.addEventListener("touchend", handleTouchEnd, { passive: true });
    track.addEventListener("touchcancel", handleTouchCancel, { passive: true });
    window.addEventListener("scrollend", releaseWheelLock);

    return () => {
      track.removeEventListener("wheel", handleWheel);
      track.removeEventListener("touchstart", handleTouchStart);
      track.removeEventListener("touchend", handleTouchEnd);
      track.removeEventListener("touchcancel", handleTouchCancel);
      window.removeEventListener("scrollend", releaseWheelLock);
      window.clearTimeout(idleTimer);
      releaseWheelLock();
    };
  }, [currentStory.stages.length, goToStage, scrollStoryEnabled]);

  const renderModeSwitch = (label: string) => (
    <div className="ga-story-mode-switch" role="group" aria-label={label}>
      {(["services", "ecommerce"] as GrowthMode[]).map((storyMode) => {
        const selected = mode === storyMode;
        return (
          <button
            key={storyMode}
            type="button"
            aria-pressed={selected}
            onClick={() => setMode(storyMode)}
            className={selected ? "is-active" : ""}
          >
            {storyData[storyMode].label}
          </button>
        );
      })}
    </div>
  );

  const renderGrowthEngine = () => (
    <motion.div className="ga-growth-engine" style={{ y: engineY }}>
      <div className="ga-engine-topbar">
        <span><span className="ga-live-dot" /> Google Ads roadmap</span>
        <span>{currentStory.shortLabel}</span>
      </div>

      <div className="ga-engine-content">
        <motion.div
          key={`${mode}-${activeStage}-heading`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: motionEase }}
          className="ga-engine-heading"
        >
          <span className="ga-engine-icon"><ActiveStageIcon strokeWidth={1.75} /></span>
          <span>
            <small>Step 0{activeStage + 1} of 04</small>
            <strong>{currentStage.visualTitle}</strong>
          </span>
        </motion.div>

        <div className="ga-engine-pipeline">
          <span className="ga-engine-route" aria-hidden="true">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </span>
          {currentStory.pipeline.map((label, index) => (
            <EngineJourneyNode
              key={label}
              label={label}
              index={index}
              current={index === activeStage}
              complete={index <= activeStage}
            />
          ))}
        </div>

        <motion.div
          key={`${mode}-${activeStage}-actions`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: motionEase }}
          className="ga-engine-stage-panel"
        >
          <span>At this stage</span>
          <h4>{currentStage.insight}</h4>
          <ul>
            {currentStage.bullets.map((bullet, index) => (
              <li key={bullet}><span>0{index + 1}</span>{bullet}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="google-ads-growth-roadmap"
      className="ga-story-section"
      data-story-stage={activeStage}
      data-scroll-enabled={scrollStoryEnabled ? "true" : "false"}
    >
      <div ref={storyTrackRef} className="ga-story-scroll-track">
        <div className="ga-story-sticky-shell">
          <div className="layout-standard relative z-10 ga-story-sticky-inner">
            {scrollStoryEnabled && desktopLayoutEnabled ? <div className="ga-story-desktop-experience">
              <motion.header className="ga-story-scroll-header" style={{ y: headerY, opacity: headerOpacity }}>
                <div>
                  <span className="ga-section-kicker">How growth happens</span>
                  <h2>
                    From “we need more customers” to a Google Ads system that
                    <span className="ga-gradient-text"> drives sales.</span>
                  </h2>
                </div>
                <div className="ga-story-scroll-intro-copy">
                  <p>
                    Choose your business type to see how we find high-intent searches, improve conversion, and scale what works.
                  </p>
                  {renderModeSwitch("Choose a business type")}
                </div>
              </motion.header>

              <div
                className="ga-story-progress"
                role="progressbar"
                aria-label="Google Ads roadmap progress"
                aria-valuemin={1}
                aria-valuemax={currentStory.stages.length}
                aria-valuenow={activeStage + 1}
              >
                <span>0{activeStage + 1}</span>
                <span className="ga-story-progress-track" aria-hidden="true">
                  <motion.span style={{ scaleX: scrollYProgress }} />
                </span>
                <span>0{currentStory.stages.length}</span>
                <small>Scroll to continue</small>
              </div>

              <motion.div className="ga-story-scroll-scene" style={{ y: sceneY }}>
                <div className="ga-story-active-column">
                  <div className="ga-story-copy-stage">
                    {currentStory.stages.map((stage, index) => (
                      <ScrollChapterLayer
                        key={`${mode}-${stage.eyebrow}-layer`}
                        stage={stage}
                        index={index}
                        active={activeStage === index}
                        progress={scrollYProgress}
                      />
                    ))}
                  </div>

                  <nav className="ga-story-chapter-rail" aria-label="Google Ads roadmap steps">
                    {currentStory.stages.map((stage, index) => {
                      const active = activeStage === index;
                      return (
                        <button
                          type="button"
                          key={`${mode}-${stage.eyebrow}-rail`}
                          className={active ? "is-active" : ""}
                          onClick={() => goToStage(index)}
                          aria-current={active ? "step" : undefined}
                          aria-label={`Go to ${stage.eyebrow}`}
                        >
                          <span>0{index + 1}</span>
                          <ChapterRailProgress complete={index <= activeStage} />
                          <small>{storyStageLabels[index]}</small>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="ga-story-visual-column">
                  {renderGrowthEngine()}
                </div>
              </motion.div>

              <motion.span className="ga-story-scroll-cue" style={{ opacity: cueOpacity }}>Scroll to continue <span aria-hidden="true">↓</span></motion.span>
            </div> : null}

            {scrollStoryEnabled && !desktopLayoutEnabled ? (
              <div
                className="ga-story-compact-experience"
                role="region"
                aria-label="Interactive Google Ads growth roadmap"
              >
                <header className="ga-story-compact-header">
                  <div>
                    <span className="ga-section-kicker">How growth happens</span>
                    <h2>
                      From wasted clicks to a system built to
                      <span className="ga-gradient-text"> scale.</span>
                    </h2>
                  </div>
                  <p>See how we move service and ecommerce campaigns from friction to measurable growth.</p>
                  {renderModeSwitch("Choose a business type")}
                </header>

                <div
                  className="ga-story-progress ga-story-compact-progress"
                  role="progressbar"
                  aria-label="Google Ads roadmap progress"
                  aria-valuemin={1}
                  aria-valuemax={currentStory.stages.length}
                  aria-valuenow={activeStage + 1}
                >
                  <span>0{activeStage + 1}</span>
                  <span className="ga-story-progress-track" aria-hidden="true">
                    <motion.span style={{ scaleX: scrollYProgress }} />
                  </span>
                  <span>0{currentStory.stages.length}</span>
                  <small>One scroll · one step</small>
                </div>

                <div className="ga-story-compact-card-slot">
                  <AnimatePresence initial={false} mode="sync">
                    <motion.article
                      key={`${mode}-${activeStage}-compact`}
                      className="ga-story-compact-card"
                      initial={{ opacity: 0, y: 30, scale: 0.975, rotateX: 4 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, y: -22, scale: 0.985, rotateX: -2 }}
                      transition={{ duration: 0.36, ease: motionEase }}
                      role="group"
                      aria-label={`${currentStage.eyebrow}: ${currentStage.title}`}
                    >
                      <div className="ga-story-compact-card-head">
                        <span className="ga-story-inline-icon"><ActiveStageIcon strokeWidth={1.75} /></span>
                        <span>
                          <small>{currentStage.eyebrow}</small>
                          <b>0{activeStage + 1} / 04</b>
                        </span>
                      </div>
                      <h3>{currentStage.title}</h3>
                      <p>{currentStage.description}</p>
                      <div className="ga-story-compact-insight">
                        <span>What changes here</span>
                        <h4>{currentStage.insight}</h4>
                        <ul>
                          {currentStage.bullets.map((bullet, index) => (
                            <li key={bullet}><b>0{index + 1}</b>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </div>

                <nav className="ga-story-compact-nav" aria-label="Google Ads roadmap steps">
                  {currentStory.stages.map((stage, index) => {
                    const active = activeStage === index;
                    return (
                      <button
                        type="button"
                        key={`${mode}-${stage.eyebrow}-compact-nav`}
                        className={active ? "is-active" : ""}
                        onClick={() => goToStage(index)}
                        aria-current={active ? "step" : undefined}
                        aria-label={`Go to ${stage.eyebrow}`}
                      >
                        <span>0{index + 1}</span>
                        <small>{storyStageLabels[index]}</small>
                      </button>
                    );
                  })}
                </nav>
                <span className="sr-only" aria-live="polite">
                  Step {activeStage + 1} of 4: {storyStageLabels[activeStage]}
                </span>
              </div>
            ) : null}

            {!scrollStoryEnabled ? <div className="ga-story-mobile-experience">
              <div className="ga-story-intro">
                <span className="ga-section-kicker">How growth happens</span>
                <h2>
                  From “we need more customers” to a Google Ads system that
                  <span className="ga-gradient-text"> drives sales.</span>
                </h2>
                <p>
                  Choose your business type to see how we find high-intent searches, improve conversion, and scale what works.
                </p>
                {renderModeSwitch("Choose a business type")}
                <span className="ga-story-scroll-cue">Tap a step to explore</span>
              </div>

              <div className="ga-story-layout">
                <div className="ga-story-chapters">
                  {currentStory.stages.map((stage, index) => {
                    const StageIcon = stage.icon;
                    const active = activeStage === index;
                    return (
                      <motion.button
                        type="button"
                        key={`${mode}-${stage.eyebrow}`}
                        className={`ga-story-stage ${active ? "is-active" : ""}`}
                        onClick={() => setActiveStage(index)}
                        onFocus={() => setActiveStage(index)}
                        aria-pressed={active}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.38, delay: index * 0.04, ease: motionEase }}
                      >
                        <span className="ga-story-stage-number">0{index + 1}</span>
                        <span className="ga-story-stage-copy">
                          <span className="ga-story-stage-eyebrow"><StageIcon strokeWidth={1.75} /> {stage.eyebrow}</span>
                          <strong>{stage.title}</strong>
                          <span>{stage.description}</span>
                          <span className="ga-story-stage-link">View this step <span aria-hidden="true">→</span></span>
                        </span>

                        {active && <span className="ga-story-mobile-pipeline">
                          {currentStory.pipeline.map((label, nodeIndex) => (
                            <span key={label} className={nodeIndex <= index ? "is-complete" : ""}>
                              <b>0{nodeIndex + 1}</b> {label}
                            </span>
                          ))}
                        </span>}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div> : null}
          </div>
        </div>
      </div>

      <div className="layout-standard relative z-10">
        <motion.div
          className="ga-outcome-band"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.5, ease: motionEase }}
        >
          <div className="ga-outcome-band-heading">
            <span>Traffic is not the goal</span>
            <h3>Build a clearer path from search to <strong>customer.</strong></h3>
          </div>
          <div className="ga-outcome-grid">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.label}
                className="ga-outcome-card"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.36, delay: index * 0.05, ease: motionEase }}
              >
                <span>0{index + 1}</span>
                <strong>{outcome.label}</strong>
                <p>{outcome.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="ga-outcome-cta">
            <a href="#google-ads-growth-form" className="ga-primary-cta group">
              Build My Campaign Now <span aria-hidden="true">→</span>
            </a>
            <span>Share your goal, get a free audit, then choose a strategy-call time. No obligation.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
