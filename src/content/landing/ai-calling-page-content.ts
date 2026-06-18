import type {
  AiIndustryItem,
  AiTaskItem,
  AiFeatureItem,
  AiPricingPlan,
  AiFaqItem,
  AiResultItem,
  AiChipItem,
  AiTrustBadge,
  AiIndustryDemoEntry,
} from "@/interfaces/ai-calling-interface";

/* ── Nav ── */
export const aiNavLinks = [
  { href: "#livedemo", label: "Live demo" },
  { href: "#product", label: "Product" },
  { href: "#tasks", label: "What it does" },
  { href: "#industries", label: "Industries" },
  { href: "#pricing", label: "Pricing" },
];

/* ── Hero ── */
export const aiHeroContent = {
  pill: "Built by Zevitech",
  liveLabel: "AI agents calling now",
  headline: ["Put your sales on ", "autopilot."],
  lead: "We build you a custom AI sales agent that calls every lead in seconds, qualifies them, and books appointments straight to your calendar — across every industry that lives on the phone.",
  leadBold: "20–50× the output of a human rep, for 90% less.",
  ctaPrimary: "Watch it book a live call →",
  ctaGhost: "See pricing",
  ctaNote: "No setup headache · Live in 48 hours · Cancel anytime",
  chips: [
    { text: "Trusted by ", bold: "500+ brands" },
    { text: "", bold: "4.9★", suffix: " rated" },
    { text: "Since ", bold: "2009" },
    { text: "US · UK · AU · Gulf" },
  ] as AiChipItem[],
  floatBadge1: "Lead reached in 28s",
  floatBadge2: "✓ Booked Tue 2:00 PM",
};

/* ── Dashboard ── */
export const aiDashboardIndustries: [string, string][] = [
  ["Solar", "Tue 2:00 PM"],
  ["Real Estate", "Wed 10:30 AM"],
  ["Dental", "Thu 9:15 AM"],
  ["Roofing", "Fri 1:00 PM"],
  ["Insurance", "Mon 11:00 AM"],
  ["Law Firm", "Tue 4:30 PM"],
  ["HVAC", "Wed 3:00 PM"],
  ["Mortgage", "Thu 2:15 PM"],
];

export const aiDashboardNames = [
  "Sarah M.",
  "James R.",
  "Aisha K.",
  "David L.",
  "Maria G.",
  "Omar F.",
  "Emily T.",
  "Raj P.",
  "Nora B.",
  "Chen W.",
  "Leila H.",
  "Mark D.",
];

export const aiDashboardTrust: AiTrustBadge[] = [
  { icon: "check", label: "TCPA-safe" },
  { icon: "lock", label: "Encrypted" },
  { icon: "calendar", label: "Calendar-synced" },
];

/* ── Ticker stats ── */
export const aiTickerStats = [
  { count: 1284000, label: "Calls handled by AI agents" },
  { count: 38500, label: "Appointments booked" },
];

/* ── Marquee ── */
export const aiMarqueeText =
  "AI VOICE  •  24/7 OUTREACH  •  SPEED-TO-LEAD  •  AI WEB CHAT  •  BOOKS APPOINTMENTS  •  LEGAL INTAKE  •  CRM SYNC  •  NO MISSED LEADS  • ";

/* ── Voice demo industry map ── */
export const aiDemoIndustries: Record<string, AiIndustryDemoEntry> = {
  Solar: {
    thing: "cutting your energy bills with solar",
    appt: "free solar assessment",
  },
  Roofing: { thing: "getting your roof checked", appt: "free roof inspection" },
  "Real Estate": {
    thing: "buying or selling a home",
    appt: "quick consultation",
  },
  Dental: { thing: "getting your smile looked at", appt: "checkup" },
  "Law Firm": {
    thing: "a free legal consultation",
    appt: "consultation with an attorney",
  },
  Insurance: { thing: "reviewing your coverage", appt: "free policy review" },
  HVAC: { thing: "your heating and cooling", appt: "service visit" },
  Mortgage: { thing: "locking in a better rate", appt: "rate review" },
  Medicare: {
    thing: "reviewing your Medicare options",
    appt: "free benefits review",
  },
  "Duct Cleaning": {
    thing: "getting your air ducts cleaned",
    appt: "free inspection",
  },
  "E-commerce": {
    thing: "recovering abandoned carts and boosting sales",
    appt: "quick strategy call",
  },
  Medical: { thing: "booking your appointment", appt: "consultation" },
  Agencies: {
    thing: "white-labeling AI agents for your clients",
    appt: "partner call",
  },
  "Home Services": { thing: "your home service project", appt: "free quote" },
};

export const aiDemoIndustryList = Object.keys(aiDemoIndustries);

/* ── Vapi config ── */
export const vapiConfig = {
  publicKey: "bec69e70-8e50-42f5-8978-663dd98a8687",
  assistantId: "74648e00-369a-4c3d-a3e7-1cbc6127f812",
  voiceId: "XrExE9yKIg1WjnnlVkGX",
};

/* ── Product showcase ── */
export const aiVoiceTranscript = [
  {
    role: "ai" as const,
    text: "Hi Sarah! This is Zevi from Apex Roofing — you asked about a quote?",
  },
  { role: "lead" as const, text: "Oh yes, I did." },
  {
    role: "ai" as const,
    text: "Great. Are mornings or afternoons better for a free inspection?",
  },
  { role: "lead" as const, text: "Afternoons work best." },
  { role: "ai" as const, text: "Done — I've booked you Tuesday at 2 PM. 📅" },
];

/* ── Tasks ── */
export const aiTasks: AiTaskItem[] = [
  {
    icon: "check-circle",
    title: "Qualifies every lead",
    description:
      "Asks your exact questions and scores each lead before it reaches you.",
    output: "0 leads slip through",
  },
  {
    icon: "calendar",
    title: "Books appointments",
    description:
      "Checks your calendar and schedules in real time, no human needed.",
    output: "straight to your calendar",
  },
  {
    icon: "bell",
    title: "Sends reminders",
    description:
      "Confirms and reminds by call + SMS so people actually show up.",
    output: "−30% no-shows",
  },
  {
    icon: "refresh",
    title: "Chases no-shows",
    description:
      "Automatically re-engages missed and dead leads until they rebook.",
    output: "never gives up",
  },
  {
    icon: "message",
    title: "Answers web chat",
    description:
      "Replies to website visitors instantly and turns them into booked calls.",
    output: "24/7 on your site",
  },
  {
    icon: "zap",
    title: "Reactivates old leads",
    description:
      "Works your dormant database and revives buyers you'd written off.",
    output: "found revenue",
  },
  {
    icon: "arrow-right",
    title: "Routes hot leads to you",
    description:
      "Warm-transfers ready-to-buy callers to your team with full context.",
    output: "you close, AI grinds",
  },
  {
    icon: "balance",
    title: "Handles client intake",
    description:
      "Runs first-line intake & scheduling — the basic work paralegals do.",
    output: "for law firms",
  },
];

/* ── Industries ── */
export const aiIndustries: AiIndustryItem[] = [
  { name: "Solar", deal: "Avg deal $15k–$40k", icon: "sun" },
  { name: "Roofing", deal: "Avg deal $8k–$25k", icon: "home" },
  { name: "Real Estate", deal: "$5k–$20k commission", icon: "building" },
  { name: "Dental", deal: "High patient LTV", icon: "tooth" },
  { name: "Law Firms", deal: "AI paralegal intake", icon: "balance" },
  { name: "Insurance", deal: "Renewals + new quotes", icon: "shield" },
  { name: "HVAC", deal: "Emergency + seasonal", icon: "wind" },
  { name: "Med Spa", deal: "Repeat, high-volume", icon: "heart" },
  { name: "Medicare", deal: "High-volume enrollment", icon: "medical" },
  { name: "Duct Cleaning", deal: "Seasonal, repeat jobs", icon: "filter" },
  { name: "E-commerce", deal: "Cart recovery + upsells", icon: "cart" },
  { name: "Medical", deal: "Patient intake & reminders", icon: "plus" },
  { name: "Agencies", deal: "White-label for clients", icon: "briefcase" },
  { name: "Home Services", deal: "Quotes & emergency jobs", icon: "wrench" },
];

/* ── Sales leak cards ── */
export const aiLeakCards = [
  {
    value: "$126k",
    isGreen: false,
    text: "Average revenue a small business loses every year to missed and slow-answered calls.",
  },
  {
    value: "78%",
    isGreen: false,
    text: "Of buyers purchase from whoever responds first. The average business takes 42 hours to reply.",
  },
  {
    value: "$90k",
    isGreen: true,
    text: "The yearly cost of one human SDR — who still sleeps 8 hours a night and quits after a year.",
  },
];

/* ── How it works ── */
export const aiSteps = [
  {
    num: "STEP 01",
    title: "Load your leads",
    description:
      "Connect your list, CRM, or web form. The AI learns your business, offer, and qualifying questions.",
  },
  {
    num: "STEP 02",
    title: "AI calls, qualifies & books",
    description:
      "It dials every lead in seconds, holds a real conversation, and books straight to your calendar — 24/7.",
  },
  {
    num: "STEP 03",
    title: "You close the deal",
    description:
      "You show up to qualified, booked appointments. The AI follows up by SMS and re-engages no-shows.",
  },
];

/* ── Skyrocket stats ── */
export const aiSkyStats = [
  { value: "20–50×", label: "more dials than a human rep", isGreen: false },
  { value: "~90%", label: "lower cost per call", isGreen: true },
  { value: "24/7", label: "never sleeps, never quits", isGreen: false },
];

/* ── Features ── */
export const aiFeatures: AiFeatureItem[] = [
  {
    icon: "phone",
    title: "24/7 outreach",
    description: "Dials your whole list in seconds, around the clock.",
  },
  {
    icon: "zap",
    title: "Speed-to-lead",
    description: "Calls new leads in 30 seconds — while they're hot.",
  },
  {
    icon: "message",
    title: "AI web chat",
    description: "Answers and books your website visitors too.",
  },
  {
    icon: "calendar",
    title: "Books appointments",
    description: "Qualifies and schedules into your calendar.",
  },
  {
    icon: "link",
    title: "CRM & SMS",
    description: "Logs every call, syncs your CRM, follows up by text.",
  },
  {
    icon: "globe",
    title: "Multilingual",
    description: "English, Arabic, Spanish and more.",
  },
  {
    icon: "chart",
    title: "ROI dashboard",
    description: "Calls, bookings, and revenue in real time.",
  },
  {
    icon: "mic",
    title: "Sounds human",
    description: "72% of callers can't tell it's AI.",
  },
];

/* ── Results ── */
export const aiResults: AiResultItem[] = [
  { value: "$32→$7", label: "Cost per appointment after switching to AI" },
  { value: "+215%", label: "Increase in appointments booked" },
  { value: "2×", label: "Qualified leads in just 13 days" },
  { value: "72%", label: "Of callers can't tell it's AI" },
];

/* ── Pricing ── */
export const aiPricingPlansTop: AiPricingPlan[] = [
  {
    name: "Starter",
    price: "$1,500",
    period: "one-time setup",
    description: "Small teams replacing missed calls & slow follow-up.",
    features: [
      "1 custom AI voice agent (your script & voice)",
      "AI web chat agent included",
      "Up to **~3,000** calls/month",
      "Up to **10 calls at once** (10× a human rep)",
      "Calendar booking + lead capture + CRM",
      "24/7 — never misses a lead",
    ],
    dimFeatures: ["Email support"],
    ctaLabel: "Start with Starter",
  },
  {
    name: "Growth",
    price: "$2,500",
    period: "one-time setup",
    description: "Businesses that want to dominate their leads.",
    features: [
      "Everything in Starter, plus:",
      "Up to **~10,000** calls/month",
      "Up to **30 simultaneous calls** (a whole team)",
      "Multi-step follow-up (call + chat + SMS)",
      "CRM + Zapier / Make integrations",
      "No-show & reminder automation",
      "Monthly optimization + reporting",
      "Priority support",
    ],
    popular: true,
    ctaLabel: "Get Growth",
  },
  {
    name: "Scale",
    price: "$5,000",
    period: "one-time setup",
    description: "High-volume operations & lead-gen at full throttle.",
    features: [
      "Everything in Growth, plus:",
      "**30,000+** calls/month",
      "**100+ simultaneous calls** — your list in minutes",
      "Multiple AI agents (sales + support + booking)",
      "Advanced routing + warm transfer",
      "Dedicated number pool + integrations",
      "Bi-weekly optimization + dedicated manager",
      "Priority + Slack support",
    ],
    ctaLabel: "Scale up",
  },
];

export const aiPricingPlansBottom: AiPricingPlan[] = [
  {
    name: "Custom",
    price: "Tailored to you",
    description:
      "Don't fit a box? We build a plan around your exact workflow, volume & industry.",
    features: [
      "Choose your call volume & concurrency",
      "Any CRM, calendar, dialer or custom API",
      "Industry-specific agents (Solar, Real Estate, Law, Medical…)",
      "HIPAA-compliant option (healthcare / Medicare)",
      "Multi-language agents",
      "Add SMS, email or WhatsApp follow-up",
    ],
    amber: true,
    ctaLabel: "Build my custom plan",
  },
  {
    name: "Enterprise / Agency",
    price: "From $7,500",
    period: "one-time setup",
    description:
      "Unlimited scale, or resell under your own brand (white-label).",
    features: [
      "**Unlimited** calls & concurrency",
      "White-label dashboard & full branding",
      "HIPAA-compliant setup",
      "Volume credit rates + revenue-share",
      "Dedicated team + SLA",
    ],
    ctaLabel: "Book a partnership call",
  },
];

export const aiPricingStats = [
  { value: "∞", label: "Unlimited reach" },
  { value: "100+", label: "Calls at once" },
  { value: "24/7", label: "Always on" },
  { value: "30s", label: "Response time" },
  { value: "0", label: "Missed leads" },
];

/* ── FAQ ── */
export const aiFaqs: AiFaqItem[] = [
  {
    question: "Will it actually sound human?",
    answer:
      "Yes. In blind tests, 72% of callers can't tell our agents from a person. We match the voice and tone to your brand, and it handles objections naturally — not a phone tree.",
  },
  {
    question: "Can it really replace basic paralegal work?",
    answer:
      "For first-line tasks — client intake, qualifying matters, scheduling consultations, and follow-ups — yes. It captures everything and routes real legal work to your attorneys, freeing your team from the repetitive front desk.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "48 hours. We build your custom agent, wire your calendar and CRM, and test it with real calls before it touches your leads.",
  },
  {
    question: "Do I need any technical skill?",
    answer:
      "None. This is fully managed — we build it and run it for you. You just watch the appointments land.",
  },
  {
    question: "What does it cost vs. hiring?",
    answer:
      "A human SDR runs $55k–$90k a year and makes 15–25 dials an hour. Your AI agent runs hundreds at once from $499/month. The math isn't close.",
  },
];

/* ── Footer ── */
export const aiFooterLinks = [
  { href: "#product", label: "Product" },
  { href: "#industries", label: "Industries" },
  { href: "#pricing", label: "Pricing" },
  { href: "#cta", label: "Book demo" },
];

/* ── FAB chat flow ── */
export const aiFabGreeting =
  "👋 Hey! I'm Zevi — the AI sales agent behind this page. I can call your leads in seconds, qualify them, and book appointments 24/7, for about 90% less than a human rep. Want me to set that up for your business?";

export const aiFabIndustries = [
  "Solar",
  "Roofing",
  "Real Estate",
  "Dental",
  "Law Firm",
  "Insurance",
  "HVAC",
  "Mortgage",
  "Medicare",
  "Duct Cleaning",
  "E-commerce",
  "Medical",
  "Agencies",
  "Home Services",
  "Other",
];
