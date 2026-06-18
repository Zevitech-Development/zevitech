/* ── AI Calling Landing Page interfaces ── */

export interface AiIndustryItem {
  name: string;
  deal: string;
  icon: string; // SVG path string
}

export interface AiTaskItem {
  icon: string;
  title: string;
  description: string;
  output: string;
}

export interface AiFeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface AiPricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  dimFeatures?: string[];
  popular?: boolean;
  amber?: boolean;
  ctaLabel: string;
}

export interface AiFaqItem {
  question: string;
  answer: string;
}

export interface AiResultItem {
  value: string;
  label: string;
}

export interface AiStatItem {
  value: string;
  label: string;
  isGreen?: boolean;
}

export interface AiLeadRow {
  initials: string;
  name: string;
  industry: string;
  slot: string;
}

export interface AiIndustryDemoEntry {
  thing: string;
  appt: string;
}

export interface AiMarqueeItem {
  text: string;
  bold?: boolean;
}

export interface AiChipItem {
  text: string;
  bold?: string;
}

export interface AiTrustBadge {
  icon: string;
  label: string;
}

export interface AiLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AiFabProps {
  onOpenModal: () => void;
}

export interface AiHeroProps {
  onOpenModal: () => void;
}

export interface AiFinalCtaProps {
  onOpenModal: () => void;
}
