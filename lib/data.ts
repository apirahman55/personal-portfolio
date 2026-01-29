// ====================================
// SINGLE SOURCE OF TRUTH - Portfolio Data
// ====================================

// ============ TYPES ============
export interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  current: boolean;
}

export interface SocialLink {
  href: string;
  label: string;
  platform: "linkedin" | "github" | "whatsapp" | "email";
}

export interface TechStack {
  [category: string]: string[];
}

// ============ PERSONAL INFO ============
export const personalInfo = {
  name: "Api Al Rahman",
  firstName: "Api",
  lastName: "Al Rahman",
  title: "Sr. Full-Stack Developer | Frontend Specialist",
  titleLines: ["Sr. Full-Stack Developer", "Frontend Specialist"],
  email: "apirahman55@gmail.com",
  phone: "+62 895 3799 11134",
  location: "Kota Bekasi, Jawa Barat, Indonesia",
  summary: `Software Engineer with over 5 years of experience, specializing in Frontend development with strong Full-Stack capabilities. Expertise in React.js, React Native, Next.js, and Go. Proven track record in building critical systems for healthcare (KAI), government (risk management), and fintech (transaction processing). Focused on system architecture, performance optimization, and writing clean, maintainable code.`,
  shortSummary: `Software Engineer with 5+ years of experience specializing in Frontend development with strong Full-Stack capabilities. Expertise in React.js, Next.js, Vue.js, and Go.`,
} as const;

// ============ SOCIAL LINKS ============
export const socialLinks: SocialLink[] = [
  {
    href: "https://linkedin.com/in/api-al-rahman",
    label: "LinkedIn",
    platform: "linkedin",
  },
  {
    href: "https://github.com/apialrahman",
    label: "GitHub",
    platform: "github",
  },
  {
    href: `https://wa.me/6289537991134`,
    label: "WhatsApp",
    platform: "whatsapp",
  },
  {
    href: `mailto:${personalInfo.email}`,
    label: "Email",
    platform: "email",
  },
];

// ============ EXPERIENCE ============
export const experience: Experience[] = [
  {
    period: "Jan 2023 – Present",
    title: "Freelance Software Engineer",
    company: "Self-employed",
    description: "Building full-stack and AI-integrated applications for government (SPBE) and private clients. Projects include Tata Kelola SPBE, Manperub SPBE, Manrisk SPBE, Pemilu Anomaly Analytics, Styx Content Moderation, and AI Legal Review.",
    tech: ["React.js", "Next.js", "Go", "Python", "NestJS"],
    current: true,
  },
  {
    period: "Aug 2023 – Present",
    title: "Technical Lead",
    company: "SABAKO",
    description: "Collaborating on end-to-end product development for Klabbe, Matra Bangunan, and Writespace. Creating PRDs, defining business flows, handling architecture decisions, and managing sprint planning using Agile/Scrum.",
    tech: ["Next.js", "NestJS", "PostgreSQL"],
    current: true,
  },
  {
    period: "May 2025 – Present",
    title: "Frontend Developer",
    company: "Rolling Glory (Part-time)",
    description: "Continuing collaboration on frontend projects after transitioning from a full-time role.",
    tech: ["Vue.js", "React.js", "Next.js"],
    current: true,
  },
  {
    period: "Jul 2022 – Jun 2025",
    title: "Frontend Developer",
    company: "Rolling Glory (Full-time)",
    description: "Developed KAI Telemediska healthcare platform using Vue.js/Vuex. Built Treasury website and H5 mobile integration. Optimized the Moduit investment platform. Implemented testing with Jest and Cypress.",
    tech: ["Vue.js", "Next.js", "React.js", "Jest", "Cypress"],
    current: false,
  },
  {
    period: "Jan 2021 – Jul 2022",
    title: "Frontend Developer",
    company: "PT. Qoin Digital Indonesia",
    description: "Built internal fintech tools including Back Office, Merchant Portal, and WebView apps. Created a reusable component library from design mock-ups.",
    tech: ["React.js", "TypeScript"],
    current: false,
  },
  {
    period: "Mar 2020 – Nov 2020",
    title: "Frontend Developer",
    company: "Talent Indonesia (Freelance)",
    description: "Developed Tokutei labor distribution platform using Laravel. Built Klikcoaching and Competent e-learning platforms using Quasar Vue.js.",
    tech: ["Vue.js", "Laravel", "Quasar"],
    current: false,
  },
  {
    period: "Sep 2019 – Feb 2020",
    title: "Frontend Developer",
    company: "Ruang Inovasi Indonesia",
    description: "Built four mobile apps using React Native and Android Studio: Apps Daily, Invest Cycle, Kaki Lima, and Kumpulmodal.",
    tech: ["React Native", "Android Studio"],
    current: false,
  },
];

// Short version for landing page (top 3)
export const experiencePreview = experience.slice(0, 3);

// ============ TECH STACK ============
export const techStack: TechStack = {
  Frontend: ["Next.js", "React.js", "Vue.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  Mobile: ["React Native", "Flutter", "Android Studio"],
  Backend: ["Go", "Node.js", "NestJS", "Python", "Laravel"],
  Database: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  DevOps: ["Docker", "Kubernetes", "CI/CD", "DigitalOcean"],
  Tools: ["Jest", "Cypress", "GraphQL", "Git"],
};

// ============ CERTIFICATIONS ============
export const certifications = [
  { name: "Meta Front-End Developer Professional", issuer: "Coursera", year: 2024 },
  { name: "S.O.L.I.D Principle", issuer: "Dicoding", year: 2023 },
  { name: "Full Stack Developer", issuer: "Pijar Camp/Arkademy", year: 2020 },
  { name: "Android Developer", issuer: "BBPLK", year: 2019 },
];

// ============ EDUCATION ============
export const education = [
  { institution: "Pijar Camp", degree: "Fullstack Developer", year: 2020 },
  { institution: "BBPLK Bekasi", degree: "Android Developer", year: 2019 },
  { institution: "SMK Cipta Karya Bekasi", degree: "Computer Engineering", period: "2016 – 2019" },
];

// ============ ACHIEVEMENTS ============
export const achievements = [
  {
    title: "1st Place — Front End Challenge",
    issuer: "Skyshi Digital Indonesia",
    description: "Built a responsive Todo List app with a modern tech stack, judged on efficiency and code quality.",
  },
];

// ============ SEO / METADATA ============
export const siteMetadata = {
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: personalInfo.shortSummary,
  keywords: ["Software Engineer", "Frontend Specialist", "React", "Next.js", "Vue.js", "Go", "TypeScript", "Full Stack Developer"],
  author: personalInfo.name,
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: `Software Engineer specializing in React.js, Next.js, Vue.js, and Go. Building healthcare, government, and fintech platforms.`,
    type: "website",
  },
};
