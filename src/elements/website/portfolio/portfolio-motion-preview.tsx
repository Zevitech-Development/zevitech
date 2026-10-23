"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { PortfolioItem } from "@/interfaces/components-partials-interface";

/** Keep long portfolio animations out of the initial page download. */
export default function PortfolioMotionPreview({ item }: { item: PortfolioItem }) {
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (visible && !reducedMotion) void element.play().catch(() => {});
    else element.pause();
  }, [visible, reducedMotion]);

  return (
    <video
      ref={video}
      src={visible && !reducedMotion ? item.video : undefined}
      poster={item.video?.replace(/\.mp4$/, ".webp")}
      aria-label={item.title}
      muted
      playsInline
      loop
      controls
      preload="none"
      className="absolute inset-0 h-full w-full object-cover animation-standard group-hover:scale-110"
    />
  );
}
