import { Metadata } from "next";
import { personalInfo } from "@/lib/data";
import AboutPageClient from "./AboutPageClient";
import { ProfilePageSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${personalInfo.name}, a ${personalInfo.title} with 5+ years of experience in React.js, Next.js, Vue.js, and Go.`,
  openGraph: {
    title: `About | ${personalInfo.name}`,
    description: personalInfo.summary,
    type: "profile",
  },
  twitter: {
    title: `About | ${personalInfo.name}`,
    description: personalInfo.shortSummary,
  },
};

export default function AboutPage() {
  return (
    <>
      <ProfilePageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />
      <AboutPageClient />
    </>
  );
}
