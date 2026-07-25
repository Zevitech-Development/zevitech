"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type RevealDirection = "up" | "left" | "right";

type GoogleAdsRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  /** Subtle scroll-linked drift in px. Set 0 to disable for a section. */
  parallax?: number;
};

const revealOffset: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 56 },
  left: { x: -64, y: 24 },
  right: { x: 64, y: 24 },
};

export default function GoogleAdsReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  parallax = 18,
}: GoogleAdsRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = revealOffset[direction];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointerBoundsRef = useRef<DOMRect | null>(null);
  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const pointerFrameRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const driftAmount = prefersReducedMotion ? 0 : parallax;
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [driftAmount, -driftAmount],
  );

  useEffect(() => () => {
    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
    }
  }, []);

  return (
    <motion.div
      ref={wrapperRef}
      className={["ga-section-reveal", className].filter(Boolean).join(" ")}
      style={{ y: parallaxY }}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, scale: 0.97, rotateX: 4, ...offset }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : { opacity: 1, scale: 1, rotateX: 0, x: 0, y: 0 }
      }
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6, delay, ease: "easeOut" },
      }}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        pointerBoundsRef.current = event.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;

        const bounds = pointerBoundsRef.current
          ?? event.currentTarget.getBoundingClientRect();
        const target = event.currentTarget;
        pointerPositionRef.current = {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        };

        if (pointerFrameRef.current !== null) return;
        pointerFrameRef.current = window.requestAnimationFrame(() => {
          const { x, y } = pointerPositionRef.current;
          target.style.setProperty("--ga-pointer-x", `${x}px`);
          target.style.setProperty("--ga-pointer-y", `${y}px`);
          pointerFrameRef.current = null;
        });
      }}
      onPointerLeave={() => {
        pointerBoundsRef.current = null;
      }}
    >
      {children}
    </motion.div>
  );
}
