import { personalInfo, socialLinks, techStack, experience } from "@/lib/data";

const BASE_URL = "https://apialrahman.com";

// Helper to get social link by platform
const getLink = (platform: string) => socialLinks.find(l => l.platform === platform)?.href || "";

/**
 * Person Schema - For the portfolio owner
 * https://schema.org/Person
 */
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    givenName: personalInfo.firstName,
    familyName: personalInfo.lastName,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    jobTitle: personalInfo.title,
    description: personalInfo.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bekasi",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    url: BASE_URL,
    sameAs: [
      getLink("linkedin"),
      getLink("github"),
    ].filter(Boolean),
    knowsAbout: [
      ...techStack.Frontend,
      ...techStack.Backend,
      ...techStack.Database,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebSite Schema - For the portfolio website
 * https://schema.org/WebSite
 */
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personalInfo.name} Portfolio`,
    description: personalInfo.shortSummary,
    url: BASE_URL,
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * ProfilePage Schema - For About page
 * https://schema.org/ProfilePage
 */
export function ProfilePageSchema() {
  const workExperiences = experience.map((exp) => ({
    "@type": "OrganizationRole",
    roleName: exp.title,
    startDate: exp.period.split(" – ")[0],
    endDate: exp.current ? undefined : exp.period.split(" – ")[1],
    memberOf: {
      "@type": "Organization",
      name: exp.company,
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      description: personalInfo.summary,
      hasOccupation: workExperiences,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * CollectionPage Schema - For Works/Portfolio page
 * https://schema.org/CollectionPage
 */
interface Project {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
}

export function PortfolioPageSchema({ projects }: { projects: Project[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio",
    description: "A collection of projects and works by " + personalInfo.name,
    url: `${BASE_URL}/works`,
    author: {
      "@type": "Person",
      name: personalInfo.name,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `${BASE_URL}/works/${project.slug}`,
          image: project.thumbnail ? `${BASE_URL}${project.thumbnail}` : undefined,
          author: {
            "@type": "Person",
            name: personalInfo.name,
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Schema - For navigation
 * https://schema.org/BreadcrumbList
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
