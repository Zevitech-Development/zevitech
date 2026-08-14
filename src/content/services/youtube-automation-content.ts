import React from "react";

import {
  FaqItem,
  ServiceItem,
  ApproachItem,
} from "@/interfaces/common-interfaces";
import { YoutubeResultItem } from "@/interfaces/youtube-automation-interfaces";

import { Search, Palette, PenLine, Clapperboard, Rocket } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Section 3 — Our Process                                                    */
/* -------------------------------------------------------------------------- */

export const youtubeAutomationApproachesData: ApproachItem[] = [
  {
    icon: React.createElement(Search),
    title: "Niche & Keyword Research",
    description:
      "We start with the numbers, not a guess. Our team analyses RPM ranges, search demand, competitor upload cadence, and audience retention patterns to select a niche that can realistically monetise — then maps the first 90 days of content against keywords you can actually rank for.",
  },
  {
    icon: React.createElement(Palette),
    title: "Channel Branding & Setup",
    description:
      "Name, logo, banner, colour system, channel trailer, about copy, and section layout are all built to look like an established publisher from the first upload. We configure monetisation settings, verification, and analytics so nothing blocks revenue later.",
  },
  {
    icon: React.createElement(PenLine),
    title: "Scripting & Voiceover",
    description:
      "Every video is written from scratch by a human writer working to a retention-first structure: a hook in the first fifteen seconds, clear pacing, and open loops that carry viewers to the end. Scripts are then recorded by trained voice artists matched to your niche and mastered for consistent audio.",
  },
  {
    icon: React.createElement(Clapperboard),
    title: "Editing & Thumbnail Design",
    description:
      "Our editors cut to the voiceover with licensed footage, motion graphics, B-roll, and sound design, tuned to hold attention through the middle of the video. Alongside it we produce multiple thumbnail and title concepts per upload, designed as a click decision rather than decoration.",
  },
  {
    icon: React.createElement(Rocket),
    title: "SEO, Upload & Growth",
    description:
      "Titles, descriptions, tags, chapters, and end screens are optimised before publishing, with uploads running on a fixed schedule tuned to your audience. After each batch we read the retention graphs, click-through rates, and traffic sources, then feed those findings into the next round of scripts.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 4 — Our Services                                                   */
/* -------------------------------------------------------------------------- */

export const youtubeAutomationServicesData: ServiceItem[] = [
  {
    title: "Full Channel Setup",
    description:
      "Niche selection, competitor analysis, branding, channel art, trailer, and complete monetisation configuration — everything required to launch a channel that looks credible from its first upload.",
  },
  {
    title: "Video Production",
    description:
      "End-to-end production covering scripting, professional voiceover, licensed footage, motion graphics, sound design, and final editing, delivered on a consistent publishing schedule.",
  },
  {
    title: "Thumbnail & Title Design",
    description:
      "Click-tested thumbnail concepts and title variants built around search intent and curiosity, with a consistent visual identity that makes your channel recognisable in the feed.",
  },
  {
    title: "YouTube SEO & Optimisation",
    description:
      "Keyword research, optimised titles and descriptions, tags, chapters, end screens, and playlist architecture that help both search and suggested traffic find your videos.",
  },
  {
    title: "Ongoing Channel Management",
    description:
      "Scheduled uploads, comment and community moderation, playlist upkeep, and continuous performance monitoring so the channel keeps compounding without your daily involvement.",
  },
  {
    title: "Monetisation & Reporting",
    description:
      "A path to revenue beyond AdSense — sponsorships, affiliates, and digital products — backed by monthly reporting on retention, click-through rate, watch time, and estimated earnings.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 5 — Results                                                        */
/*                                                                            */
/*  NOTE FOR REVIEW BEFORE LAUNCH:                                            */
/*  The figures below are illustrative placeholders written to match the       */
/*  reference layout. Replace every `revenue` and `views` value                */
/*  with verified client data, and drop the matching YouTube Studio            */
/*  screenshots into /public/images/youtube-automation/ using the filenames    */
/*  referenced in `img`. Do not publish unverified earnings claims.            */
/* -------------------------------------------------------------------------- */

export const youtubeAutomationResults: YoutubeResultItem[] = [
  {
    tag: "All-Time",
    revenue: "$27,593.76",
    views: "459.3M Views",
    rotateY: 8,
    rotateX: 4,
    rotateZ: -1.5,
    glowColor: "rgba(0,122,252,0.28)",
    img: "/images/services/digital-marketing/yt-analytics-1.png",
  },
  {
    tag: "256% Spike",
    revenue: "$7,906.07",
    views: "56M Views",
    rotateY: -8,
    rotateX: 4,
    rotateZ: 1.5,
    glowColor: "rgba(0,122,252,0.28)",
    img: "/images/services/digital-marketing/yt-analytics-2.png",
  },
  {
    tag: "28-Day Period",
    revenue: "$3,221.57",
    views: "29.1M Views",
    rotateY: 8,
    rotateX: -4,
    rotateZ: 1.5,
    glowColor: "rgba(0,122,252,0.28)",
    img: "/images/services/digital-marketing/yt-analytics-3.png",
  },
  {
    tag: "Steady Growth",
    revenue: "$1,086.12",
    views: "682K Views",
    rotateY: -8,
    rotateX: -4,
    rotateZ: -1.5,
    glowColor: "rgba(0,122,252,0.28)",
    img: "/images/services/digital-marketing/yt-analytics-4.png",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 8 — FAQs                                                           */
/* -------------------------------------------------------------------------- */

export const FaqDataYoutubeAutomation: FaqItem[] = [
  {
    question: "What exactly is YouTube automation?",
    answer:
      "YouTube automation means the day-to-day production work is handled by a managed team instead of you: research, scripting, editing, thumbnails, SEO, and uploading. It works whether you present on camera yourself, record voiceover for a faceless format, or use a mix of both across different videos. The channel is entirely yours — you own it, you approve the direction, and we operate everything underneath it.",
  },
  {
    question: "How long before the channel is monetised?",
    answer:
      "YouTube requires 1,000 subscribers plus 4,000 valid public watch hours in twelve months, or 10 million valid Shorts views in ninety days. Most well-run channels reach that window somewhere between four and ten months, depending on the niche and how competitive it is. Anyone promising a fixed date is guessing.",
    list: [
      "Months 1-2: research, branding, and first uploads",
      "Months 3-6: format testing and retention improvements",
      "Months 6-10: typical monetisation window for a consistent channel",
    ],
  },
  {
    question: "Who owns the channel, and is this against YouTube's policies?",
    answer:
      "You own it outright. The channel is created under your Google account, the AdSense account is in your name, and revenue is paid directly to you. YouTube permits channels operated by teams and does not require creators to appear on camera — what it penalises is mass-produced, unoriginal content. We write every script from scratch, license every asset, and review each upload before it goes live, precisely so monetisation is never put at risk.",
  },
  {
    question: "How many videos will you publish, and what if it underperforms?",
    answer:
      "Typically eight to twelve long-form videos per month, plus optional Shorts cut from that footage, on a cadence we agree upfront and hold to. We report on retention, click-through rate, and traffic sources every month and adjust the format based on what the data shows. Growth on YouTube is rarely linear, and we would rather set that expectation honestly at the start than promise a result no agency can guarantee.",
  },
];
