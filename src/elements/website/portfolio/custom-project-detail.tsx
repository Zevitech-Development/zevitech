"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { customProjectsData } from "@/content/portfolio/custom-projects-content";

import { cn } from "@/lib/utils";

import LaptopImg from "../../../../public/images/listing-macbook-img.png";

import {
  ArrowLeft,
  ArrowRight,
  User,
  Calendar,
  Tag,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { FaArrowRightLong, FaArrowUpRightFromSquare } from "react-icons/fa6";

import DailogLeadForm from "@/components/forms/dailog-lead-form";
import { CustomProjectDetailProps } from "@/interfaces/components-partials-interface";

export default function CustomProjectDetail({
  slug,
}: CustomProjectDetailProps) {
  const currentIndex = customProjectsData.findIndex((p) => p.slug === slug);
  const project = customProjectsData[currentIndex];

  if (!project) {
    notFound();
  }

  const previousProject =
    customProjectsData[
      (currentIndex - 1 + customProjectsData.length) % customProjectsData.length
    ];
  const nextProject =
    customProjectsData[(currentIndex + 1) % customProjectsData.length];

  const metaItems = [
    { label: "Client", value: project.client, icon: User },
    { label: "Year", value: project.year, icon: Calendar },
    { label: "Scope", value: project.scope, icon: Tag },
    { label: "Result", value: project.result, icon: TrendingUp },
  ];

  return (
    <section className="relative pt-3  bg-secondary-background overflow-hidden">
      {/* Ambient backdrop accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 -right-32 w-[380px] h-[380px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative layout-standard section-padding-standard !pb-16">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium text-paragraph animation-standard hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          All work
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 max-w-2xl space-y-5"
        >
          <Badge className="uppercase tracking-wider text-[11px] font-semibold bg-[#0063C7]/10 text-heading border-transparent p-1">
            <Sparkles className="w-3 h-3 mr-1.5 text-primary" />
            {project.tag}
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-heading">
            {project.title}
          </h1>

          <p className="text-lg leading-relaxed text-paragraph">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.liveUrl && (
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white font-medium animation-standard shadow-lg shadow-primary/20"
              >
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Visit live site
                  <FaArrowUpRightFromSquare className="ml-2 text-sm" />
                </a>
              </Button>
            )}
            <DailogLeadForm
              trigger={
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-border bg-white hover:bg-primary-hover text-heading hover:text-white font-medium animation-standard"
                >
                  Let&apos;s Get Started
                  <FaArrowRightLong className="ml-2 text-sm" />
                </Button>
              }
            />
          </div>
        </motion.div>

        {/* Meta info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl p-6 md:p-8 bg-white border border-border shadow-md"
        >
          {metaItems.map((meta, index) => (
            <div
              key={meta.label}
              className={cn(
                "space-y-2",
                index > 0 && "md:pl-6 md:border-l md:border-border",
              )}
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-paragraph/70">
                <span className="flex-center w-6 h-6 rounded-full bg-primary/10">
                  <meta.icon className="w-3.5 h-3.5 text-primary" />
                </span>
                {meta.label}
              </div>
              <p className="text-sm md:text-base font-semibold text-heading">
                {meta.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Laptop mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative mt-14 md:mt-20"
        >
          <div className="relative max-w-4xl mx-auto rounded-3xl bg-white border border-border p-6 md:p-10 shadow-lg">
            <div className="relative">
              <Image
                src={LaptopImg}
                alt={`${project.title} preview`}
                className="w-full drop-shadow-2xl"
                priority
              />
              <div className="absolute inset-0 flex-center">
                <div className="w-[78%] h-[85%] overflow-hidden rounded-lg shadow-xl mb-[4%]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex-center bg-gradient-to-br from-primary/20 via-primary/5 to-secondary-background">
                      <span className="text-paragraph text-sm font-medium tracking-wide">
                        Preview coming soon
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech stack */}
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {project.technologies.map((tech, index) => (
            <span
              key={`${project.slug}-tech-${index}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-white border border-border text-paragraph shadow-sm animation-standard hover:border-primary/40 hover:text-primary"
            >
              {typeof tech.icon === "string" ? tech.icon : <tech.icon />}
              {tech.name}
            </span>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-16 grid sm:grid-cols-2 gap-4">
          <Link
            href={`/portfolio/custom-projects/${previousProject.slug}`}
            className="group rounded-xl p-5 animation-standard bg-white hover:border-primary/30 hover:shadow-md border border-border"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1 text-paragraph/70">
              <ArrowLeft className="w-3.5 h-3.5 animation-standard group-hover:-translate-x-1" />
              Previous Project
            </div>
            <p className="font-heading font-bold text-heading group-hover:text-primary animation-standard">
              {previousProject.title}
            </p>
          </Link>

          <Link
            href={`/portfolio/custom-projects/${nextProject.slug}`}
            className="group rounded-xl p-5 text-right animation-standard bg-white hover:border-primary/30 hover:shadow-md border border-border"
          >
            <div className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider mb-1 text-paragraph/70">
              Next Project
              <ArrowRight className="w-3.5 h-3.5 animation-standard group-hover:translate-x-1" />
            </div>
            <p className="font-heading font-bold text-heading group-hover:text-primary animation-standard">
              {nextProject.title}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
