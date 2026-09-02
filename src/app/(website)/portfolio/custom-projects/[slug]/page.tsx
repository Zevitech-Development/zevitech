import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import CustomProjectDetailPage from "@/containers/website/portfolio/custom-project-detail-page";

import { GetPageMetadata } from "@/utils/meta-data";
import { customProjectsData } from "@/content/portfolio/custom-projects-content";

interface CustomProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return customProjectsData.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: CustomProjectPageProps): Metadata {
  const project = customProjectsData.find((p) => p.slug === params.slug);

  if (!project) {
    return GetPageMetadata({
      title: "Custom Project | Zevitech",
      description: "Explore Zevitech's custom software project portfolio.",
    });
  }

  return GetPageMetadata({
    title: `${project.title} | Zevitech Custom Projects`,
    description: project.description,
  });
}

function CustomProjectPage({ params }: CustomProjectPageProps) {
  const project = customProjectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <CustomProjectDetailPage slug={params.slug} />
    </main>
  );
}

export default CustomProjectPage;
