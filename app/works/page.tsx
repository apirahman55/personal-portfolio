import { Metadata } from "next";
import { personalInfo } from "@/lib/data";
import { projects } from "@/lib/projects";
import WorksPageClient from "./WorksPageClient";
import { PortfolioPageSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Works",
  description: `Explore ${personalInfo.name}'s portfolio of projects in React, Next.js, Vue.js, and Go. Healthcare, government, and fintech platforms.`,
  openGraph: {
    title: `Portfolio | ${personalInfo.name}`,
    description: "A curated selection of projects showcasing expertise in building high-performance digital products.",
    type: "website",
  },
  twitter: {
    title: `Works | ${personalInfo.name}`,
    description: "Selected works and portfolio projects by " + personalInfo.name,
  },
};

export default function WorksPage() {
  return (
    <>
      <PortfolioPageSchema projects={projects} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Works", url: "/works" },
        ]}
      />
      <WorksPageClient />
    </>
  );
}
