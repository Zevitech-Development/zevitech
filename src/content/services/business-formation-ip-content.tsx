import React from "react";
import {
  ClipboardList,
  FileText,
  CheckCircle2,
  BarChart3,
  Building2,
  BadgeCheck,
  Settings2,
} from "lucide-react";

// ─── Services Section ───────────────────────────────────────────────────────

export const BFIPServicesData = [
  {
    icon: <Building2 className="w-8 h-8 text-primary" />,
    title: "LLC & Company Formation Support",
    bullets: [
      "Preparation and organization of formation documentation",
      "Coordination with registered agents and authorized filing services",
      "Guidance on publicly available filing requirements",
      "Administrative follow-up and status tracking",
    ],
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-primary" />,
    title: "Trademark Application Support",
    bullets: [
      "Assistance with trademark application documentation",
      "Classification and information organization",
      "Submission coordination through authorized channels",
      "Monitoring publicly available application status",
    ],
  },
  {
    icon: <Settings2 className="w-8 h-8 text-primary" />,
    title: "Administrative & Backend Support",
    bullets: [
      "Client communication coordination",
      "Documentation handling and processing",
      "Operational support for partner brands under structured agreements",
    ],
  },
];

// ─── Process Steps Section ───────────────────────────────────────────────────

export const BFIPProcessSteps = [
  {
    id: "1",
    number: "01",
    icon: <ClipboardList className="w-10 h-10 text-primary" />,
    title: "Initial Consultation",
    description:
      "Client selects the requested service and provides the required information for documentation purposes.",
  },
  {
    id: "2",
    number: "02",
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "Documentation Preparation",
    description:
      "We organize and prepare documentation based on client-provided details and applicable requirements.",
  },
  {
    id: "3",
    number: "03",
    icon: <CheckCircle2 className="w-10 h-10 text-primary" />,
    title: "Authorized Submission",
    description:
      "Applications are submitted through official and authorized channels upon client approval.",
  },
  {
    id: "4",
    number: "04",
    icon: <BarChart3 className="w-10 h-10 text-primary" />,
    title: "Status Monitoring",
    description:
      "We assist in tracking publicly available application updates and communicate progress to clients.",
  },
];

// ─── Clarification Points ────────────────────────────────────────────────────

export const BFIPClarificationPoints = [
  "Zevitech is an independent consultancy company and is not affiliated with the USPTO or any government authority.",
  "We do not guarantee approval outcomes of any filings or applications.",
  "We do not provide legal representation unless formally engaged through licensed professionals.",
  "All services are initiated only after voluntary client engagement and written confirmation of scope.",
];
