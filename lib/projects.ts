export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  techStack: string[];
  industry: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "spbe-suite",
    title: "SPBE Suite",
    description: "Government digital transformation suite including risk management and AI-powered legal review.",
    longDescription: "A comprehensive digital governance toolkit built for government entities. The suite includes Tata Kelola SPBE for governance management, Manrisk SPBE for risk assessment, and an AI-powered legal document review system using RAG architecture. Built to handle complex bureaucratic workflows while maintaining security and compliance.",
    thumbnail: "/images/projects/spbe-thumb.jpg",
    images: [
      "/images/projects/spbe-1.jpg",
      "/images/projects/spbe-2.jpg",
      "/images/projects/spbe-3.jpg",
    ],
    tags: ["Government", "AI", "SaaS"],
    techStack: ["React", "Next.js", "Go", "Python", "PostgreSQL", "Docker"],
    industry: "Government",
    year: "2023",
    featured: true,
  },
  {
    slug: "klabbe",
    title: "Klabbe",
    description: "Modern SaaS platform for streamlined business operations and team collaboration.",
    longDescription: "Klabbe is a next-generation SaaS platform designed to simplify business operations. Features include real-time collaboration, project tracking, resource management, and automated reporting. Built with a focus on performance and user experience.",
    thumbnail: "/images/projects/klabbe-thumb.jpg",
    images: [
      "/images/projects/klabbe-1.jpg",
      "/images/projects/klabbe-2.jpg",
    ],
    tags: ["SaaS", "Productivity", "B2B"],
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "AWS"],
    industry: "Technology",
    year: "2024",
    liveUrl: "https://klabbe.id",
    featured: true,
  },
  {
    slug: "matra-bangunan",
    title: "Matra Bangunan",
    description: "E-commerce platform for construction materials with inventory management.",
    longDescription: "A specialized e-commerce solution for the construction industry. Matra Bangunan connects suppliers with contractors and builders, offering real-time inventory tracking, bulk ordering, and delivery logistics integration.",
    thumbnail: "/images/projects/matra-thumb.jpg",
    images: [
      "/images/projects/matra-1.jpg",
      "/images/projects/matra-2.jpg",
    ],
    tags: ["E-commerce", "Construction", "B2B"],
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Stripe"],
    industry: "Construction",
    year: "2024",
    featured: true,
  },
  {
    slug: "telemediska-kai",
    title: "Telemediska KAI",
    description: "Healthcare platform for PT Kereta Api Indonesia employees with telemedicine features.",
    longDescription: "A comprehensive healthcare platform developed for PT Kereta Api Indonesia. The system enables employees to access medical consultations remotely, manage appointments, view medical records, and connect with healthcare providers across Indonesia.",
    thumbnail: "/images/projects/telemediska-thumb.jpg",
    images: [
      "/images/projects/telemediska-1.jpg",
      "/images/projects/telemediska-2.jpg",
    ],
    tags: ["Healthcare", "Telemedicine", "Enterprise"],
    techStack: ["Vue.js", "React Native", "Next.js", "Node.js"],
    industry: "Healthcare",
    year: "2020",
    featured: false,
  },
  {
    slug: "qoin-payment-gateway",
    title: "Qoin Payment Gateway",
    description: "Digital wallet and payment gateway solution with multi-channel support.",
    longDescription: "A full-featured digital payment solution including mobile wallet, merchant dashboard, and payment gateway integration. Supports multiple payment methods including bank transfers, e-wallets, and credit cards.",
    thumbnail: "/images/projects/qoin-thumb.jpg",
    images: [
      "/images/projects/qoin-1.jpg",
      "/images/projects/qoin-2.jpg",
    ],
    tags: ["Fintech", "Payments", "Mobile"],
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL"],
    industry: "Fintech",
    year: "2022",
    featured: false,
  },
  {
    slug: "ankasa-ticketing",
    title: "Ankasa Ticketing",
    description: "Mobile ticketing application for flight bookings and travel management.",
    longDescription: "An Android-based ticket service provider application that allows users to search, book, and manage flight tickets. Features include seat selection, price comparison, and integrated payment processing.",
    thumbnail: "/images/projects/ankasa-thumb.jpg",
    images: [
      "/images/projects/ankasa-1.jpg",
      "/images/projects/ankasa-2.jpg",
    ],
    tags: ["Travel", "Mobile", "Android"],
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    industry: "Travel",
    year: "2020",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const testimonials = [
  {
    name: "Ahmad Fauzi",
    role: "Product Manager",
    company: "TechCorp Indonesia",
    content: "Api delivered exceptional work on our platform. His attention to detail and technical expertise made a huge difference in our product launch timeline.",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "StartupXYZ",
    content: "Working with Api was a game-changer for our startup. He quickly understood our requirements and built a scalable solution that exceeded our expectations.",
  },
  {
    name: "Budi Santoso",
    role: "Director",
    company: "GovernmentTech",
    content: "The SPBE Suite project was complex, but Api navigated the technical challenges brilliantly. His communication throughout the project was excellent.",
  },
  {
    name: "Lisa Wong",
    role: "CEO",
    company: "FinanceApp",
    content: "Outstanding technical skills combined with great project management. Api delivered our fintech platform ahead of schedule.",
  },
  {
    name: "Rudi Hartono",
    role: "Engineering Lead",
    company: "E-Commerce Plus",
    content: "Api's expertise in both frontend and backend development is rare. He built our entire marketplace from scratch with incredible quality.",
  },
  {
    name: "Jessica Lee",
    role: "Product Owner",
    company: "HealthTech Solutions",
    content: "Professional, responsive, and highly skilled. Api transformed our legacy system into a modern, scalable application.",
  },
  {
    name: "Michael Tan",
    role: "Founder",
    company: "EdTech Startup",
    content: "Api brought our vision to life. His understanding of user experience and technical implementation is exceptional.",
  },
  {
    name: "Dewi Kusuma",
    role: "IT Manager",
    company: "Banking Corp",
    content: "Security and performance were our top priorities. Api delivered a solution that exceeded all our compliance requirements.",
  },
  {
    name: "Kevin Park",
    role: "VP Engineering",
    company: "LogisticsPro",
    content: "Reliable, efficient, and always ahead of deadlines. Api is our go-to developer for all critical projects.",
  },
  {
    name: "Rina Wati",
    role: "Digital Director",
    company: "Media Group",
    content: "Api's creativity and technical prowess made our digital transformation seamless. Highly recommend his services.",
  },
];
