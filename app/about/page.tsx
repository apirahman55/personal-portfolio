"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedText } from "@/components/ui/AnimatedText";

const experience = [
  {
    period: "Aug 2023 – Present",
    role: "Technical Lead",
    company: "SABAKO",
    description: "Leading technical strategy and product delivery for SaaS initiatives including Klabbe, Matra Bangunan, and Writespace.",
    tech: ["Next.js", "NestJS", "PostgreSQL"],
  },
  {
    period: "Jan 2023 – Present",
    role: "Software Engineer",
    company: "Freelance",
    description: "Government Digital Transformation (SPBE Suite) and AI-driven analytics solutions.",
    tech: ["React", "Go", "Python", "Next.js"],
  },
  {
    period: "Aug 2022 – Aug 2023",
    role: "Frontend Developer",
    company: "Rolling Glory",
    description: "Building web applications and digital products for various clients.",
    tech: ["React", "Next.js", "TypeScript"],
  },
  {
    period: "Jan 2021 – Jul 2022",
    role: "Frontend Developer",
    company: "Qoin Digital Indonesia",
    description: "Developed Qoin PG, a digital wallet and payment gateway solution.",
    tech: ["React", "Next.js", "Node.js"],
  },
  {
    period: "Jan 2020 – Jan 2021",
    role: "Frontend Developer",
    company: "Talent Indonesia / AGIT",
    description: "Built Telemediska for KAI, Treasury systems, and Moduit applications.",
    tech: ["Vue.js", "React Native", "Next.js"],
  },
];

const techStack = {
  Languages: ["Go", "TypeScript", "JavaScript", "Python"],
  Frontend: ["Next.js", "React", "Vue.js", "Tailwind CSS"],
  Backend: ["NestJS", "Go", "Node.js"],
  DevOps: ["Docker", "Kubernetes", "AWS"],
  Database: ["PostgreSQL", "Redis", "MongoDB"],
};

export default function AboutPage() {
  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent text-sm font-medium uppercase tracking-wider"
            >
              About Me
            </motion.span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4 mb-8">
              <AnimatedText text="I craft digital experiences that matter." delay={0.1} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              With over 5 years of experience as a Software Engineer, I specialize in
              bridging complex backend logic with seamless frontend performance. I&apos;ve
              built platforms for healthcare (KAI), government risk management, and
              fintech—always focusing on type-safe, maintainable code using Go and TypeScript.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
          </motion.div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 p-6 border border-border rounded-2xl hover:border-accent/50 transition-colors"
              >
                <div>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-accent">{exp.company}</p>
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Tech Stack</h2>
            <p className="text-muted-foreground mt-2">
              Technologies I work with on a daily basis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(techStack).map(([category, techs], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-accent">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:border-accent transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Want to work together?
            </h2>
            <p className="text-muted-foreground">
              I&apos;m always interested in hearing about new projects and opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="#contact" variant="primary" icon>
                Get in Touch
              </Button>
              <Button href="/works" variant="outline" icon>
                View My Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
