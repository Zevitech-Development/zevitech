import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiOpenai,
  SiTwilio,
  SiPrisma,
  SiRedis,
} from "react-icons/si";

import { CustomProjectItem } from "@/interfaces/components-partials-interface";

import AiCallingPortfolioImg from "./../../../public/images/portfolio/ai-calling-portfolio.png";
import CustomCrmPortfolioImg from "./../../../public/images/portfolio/crm-portfolio-img.jpg";
import ProjectManagementPortfolioImg from "./../../../public/images/portfolio/cms-portfolio-img.png";
import LeadManagementPortfolioImg from "./../../../public/images/portfolio/lead-managment-img.jpg";

export const customProjectsData: CustomProjectItem[] = [
  {
    slug: "ai-calling",
    title: "AI Calling",
    tag: "AI Voice Automation",
    description:
      "A custom AI sales agent that calls every lead in seconds, holds a real qualifying conversation, and books appointments straight to the calendar — live around the clock across industries that live on the phone, from solar and roofing to real estate, dental, and law firms.",
    client: "Zevitech",
    year: "2026",
    scope: "AI Voice Agents, Calendar & CRM Sync",
    result: "+215% more appointments booked",
    image: AiCallingPortfolioImg,
    technologies: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "OpenAI", icon: SiOpenai },
      { name: "Twilio", icon: SiTwilio },
    ],
    bgColor: "bg-[#0B1120]",
  },
  {
    slug: "custom-crm",
    title: "Custom CRM",
    tag: "Sales & Client Management",
    description:
      "A CRM built around one sales team's actual pipeline instead of a generic template — deal stages, follow-up rules, and reporting all shaped by how the team already sells, so reps adopted it in days instead of fighting it for months.",
    client: "Zevitech",
    year: "2026",
    scope: "Full-Stack CRM Platform",
    result: "+40% sales team efficiency",
    image: CustomCrmPortfolioImg,
    technologies: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Prisma", icon: SiPrisma },
    ],
    bgColor: "bg-[#111827]",
  },
  {
    slug: "project-management-system",
    title: "Project Management System",
    tag: "Internal Operations Tool",
    description:
      "An internal workspace that replaced a mix of spreadsheets, group chats, and sticky notes with one place to track tasks, timelines, resource load, and client deliverables — so nothing slips between tools anymore.",
    client: "Zevitech",
    year: "2026",
    scope: "Task, Timeline & Resource Management",
    result: "+50% on-time delivery rate",
    image: ProjectManagementPortfolioImg,
    technologies: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "MongoDB", icon: SiMongodb },
    ],
    bgColor: "bg-[#091D24]",
  },
  {
    slug: "lead-management-automation",
    title: "Lead Management & Automation",
    tag: "Marketing & Sales Automation",
    description:
      "A lead engine that pulls in every inbound source — forms, ads, referrals — scores each one automatically, and routes it to the right pipeline with follow-up sequences already running, so no lead sits untouched waiting on a human to notice it.",
    client: "Zevitech",
    year: "2026",
    scope: "Lead Scoring, Routing & Follow-Up Automation",
    result: "3× qualified lead volume",
    image: LeadManagementPortfolioImg,
    technologies: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Redis", icon: SiRedis },
    ],
    bgColor: "bg-[#1A1C2D]",
  },
];
