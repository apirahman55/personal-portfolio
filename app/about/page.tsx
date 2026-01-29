"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const experience = [
  {
    period: "Aug 2023 – Present",
    title: "Technical Lead",
    company: "SABAKO",
    description: "Leading technical strategy and product delivery for SaaS initiatives including Klabbe, Matra Bangunan, and Writespace.",
    tech: ["Next.js", "NestJS", "PostgreSQL"],
    current: true,
  },
  {
    period: "Jan 2023 – Present",
    title: "Software Engineer",
    company: "Freelance",
    description: "Government Digital Transformation (SPBE Suite) and AI-driven analytics solutions.",
    tech: ["React", "Go", "Python", "Next.js"],
    current: true,
  },
  {
    period: "Aug 2022 – Aug 2023",
    title: "Frontend Developer",
    company: "Rolling Glory",
    description: "Building web applications and digital products for various clients.",
    tech: ["React", "Next.js", "TypeScript"],
    current: false,
  },
  {
    period: "Jan 2021 – Jul 2022",
    title: "Frontend Developer",
    company: "Qoin Digital Indonesia",
    description: "Developed Qoin PG, a digital wallet and payment gateway solution.",
    tech: ["React", "Next.js", "Node.js"],
    current: false,
  },
  {
    period: "Jan 2020 – Jan 2021",
    title: "Frontend Developer",
    company: "Talent Indonesia / AGIT",
    description: "Built Telemediska for KAI, Treasury systems, and Moduit applications.",
    tech: ["Vue.js", "React Native", "Next.js"],
    current: false,
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="section pb-0">
        <div className="container px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent text-sm font-medium uppercase tracking-[0.2em] block mb-4"
            >
              About Me
            </motion.span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4 mb-8 tracking-tight">
              I craft digital experiences that matter.
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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

      {/* Experience - Timeline style like landing page */}
      <section 
        ref={containerRef}
        className="section-dark relative section overflow-hidden"
      >
        <div className="container px-6 lg:px-12 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <span className="text-sm text-muted-foreground uppercase tracking-widest block mb-4">
              Work Experience
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-light">
              Where I&apos;ve Worked
            </h2>
          </motion.div>

          {/* Timeline layout - alternating left/right */}
          <div className="relative max-w-5xl mx-auto">
            {/* Center timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            <motion.div 
              className="hidden lg:block absolute left-1/2 top-0 w-px bg-accent -translate-x-1/2"
              style={{ height: lineHeight }}
            />

            {/* Experience items */}
            <div className="space-y-16 lg:space-y-24">
              {experience.map((exp, index) => {
                const isLeft = index % 2 === 0;
                
                return (
                  <motion.div
                    key={exp.title + exp.company}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative"
                  >
                    {/* Content - all info on one side */}
                    <div className={`lg:w-[45%] ${isLeft ? "lg:mr-auto lg:pr-12 lg:text-right" : "lg:ml-auto lg:pl-12 lg:text-left"}`}>
                      {/* Period badge */}
                      <span className={`inline-block text-accent text-sm font-medium mb-3 ${
                        exp.current ? "bg-accent/10 px-3 py-1 rounded-full" : ""
                      }`}>
                        {exp.period}
                      </span>

                      {/* Job title */}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-light mb-2">
                        {exp.title}
                      </h3>

                      {/* Company */}
                      <p className="text-accent font-medium mb-4">
                        {exp.company}
                      </p>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Tech tags */}
                      <div className={`flex flex-wrap gap-2 ${isLeft ? "lg:justify-end" : "lg:justify-start"}`}>
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-xs bg-accent/10 rounded-full text-accent"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* End dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:block absolute left-1/2 -bottom-4 w-3 h-3 bg-accent rounded-full -translate-x-1/2"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <div className="container px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="text-sm text-muted-foreground uppercase tracking-widest block mb-4">
              Technologies
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">Tech Stack</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Technologies I work with on a daily basis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                      className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:border-accent transition-colors"
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
      <section className="section bg-background">
        <div className="container px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              Let&apos;s Talk
            </h2>
            <p className="text-muted-foreground">
              Have a project in mind or want to collaborate? I&apos;m always open to discussing new opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/#contact" className="inline-flex items-center gap-2">
                <span className="btn-lime">Get in Touch</span>
                <span className="btn-lime-circle">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
              <Link
                href="/works"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full hover:bg-foreground hover:text-background transition-all"
              >
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

