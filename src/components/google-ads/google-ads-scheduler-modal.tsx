"use client";

import { useEffect, useMemo, useRef } from "react";
import { CalendarCheck, ExternalLink, Mail, Phone, X } from "lucide-react";

import {
  trackGoogleAdsEvent,
  trackGoogleAdsPpcBookingConversion,
} from "@/lib/google-ads-analytics";

type GoogleAdsSchedulerModalProps = {
  open: boolean;
  onClose: () => void;
  name?: string;
  email?: string;
};

const schedulerBaseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();

export default function GoogleAdsSchedulerModal({
  open,
  onClose,
  name,
  email,
}: GoogleAdsSchedulerModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const schedulerUrl = useMemo(() => {
    if (!schedulerBaseUrl || !/^https:\/\/calendly\.com\//i.test(schedulerBaseUrl)) {
      return null;
    }

    try {
      const url = new URL(schedulerBaseUrl);
      if (name) url.searchParams.set("name", name);
      if (email) url.searchParams.set("email", email);
      url.searchParams.set("background_color", "ffffff");
      url.searchParams.set("text_color", "17243a");
      url.searchParams.set("primary_color", "007afc");

      // Required for Calendly to post calendly.event_scheduled back to this
      // page — without embed_domain the widget does not treat itself as an
      // embed and the booking conversion below never fires.
      if (typeof window !== "undefined") {
        url.searchParams.set("embed_domain", window.location.hostname);
        url.searchParams.set("embed_type", "Inline");
      }

      return url.toString();
    } catch {
      return null;
    }
  }, [email, name]);

  useEffect(() => {
    if (!open || !schedulerUrl) return;

    const handleCalendlyMessage = (event: MessageEvent) => {
      // Accept messages only from Calendly.
      if (!/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/i.test(event.origin)) return;

      // Opening the scheduler or picking a time is not a booking — only the
      // confirmed scheduled event counts.
      if (event.data?.event !== "calendly.event_scheduled") return;

      const eventUri = event.data?.payload?.event?.uri;
      const bookingId =
        typeof eventUri === "string"
          ? eventUri.split("/").pop() || `calendly-${Date.now()}`
          : `calendly-${Date.now()}`;

      // Calendly can deliver the same message more than once.
      const guardKey = `calendly-conversion-${bookingId}`;
      try {
        if (window.sessionStorage.getItem(guardKey)) return;
        window.sessionStorage.setItem(guardKey, "1");
      } catch {
        // Private-browsing storage failures must not block the conversion.
      }

      trackGoogleAdsPpcBookingConversion(bookingId);
      trackGoogleAdsEvent("ga_scheduler_booked", { provider: "calendly" });
    };

    window.addEventListener("message", handleCalendlyMessage);

    return () => {
      window.removeEventListener("message", handleCalendlyMessage);
    };
  }, [open, schedulerUrl]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="ga-scheduler-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ga-scheduler-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={panelRef} className="ga-scheduler-panel">
        <div className="ga-scheduler-header">
          <div>
            <span><CalendarCheck className="h-4 w-4" /> Request received</span>
            <h2 id="ga-scheduler-title">Choose a time for your growth call</h2>
            <p>Your details are saved. Book the next convenient slot—no second form required.</p>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close scheduler">
            <X className="h-5 w-5" />
          </button>
        </div>

        {schedulerUrl ? (
          <>
            <iframe
              title="Schedule a Google Ads growth call with Zevitech"
              src={schedulerUrl}
              className="ga-scheduler-frame"
              loading="lazy"
            />
            <a className="ga-scheduler-external" href={schedulerUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackGoogleAdsEvent("ga_scheduler_external", {})}>
              Open scheduler in a new tab <ExternalLink className="h-4 w-4" />
            </a>
          </>
        ) : (
          <div className="ga-scheduler-fallback">
            <span className="ga-scheduler-success"><CalendarCheck className="h-8 w-8" /></span>
            <h3>Your request was sent successfully.</h3>
            <p>
              We&apos;ll contact you within one business day with the next available call options. Need to speak sooner? Call or email us now.
            </p>
            <div>
              <a href="tel:+13022176872"><Phone className="h-4 w-4" /> Call (302) 217-6872</a>
              <a href="mailto:zevitech25@gmail.com"><Mail className="h-4 w-4" /> Email Zevitech</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
