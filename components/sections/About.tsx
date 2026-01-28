"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Work experience data - Aziz style
const experiences = [
  {
    title: "Full Stack Engineer (Part-time)",
    company: "AI Startup",
    description: "Developing an AI-powered SaaS platform with real-time collaboration, billing systems, and intelligent document management.",
    period: "Jun 2025 – Present",
  },
  {
    title: "Senior Software Engineer",
    company: "Healthcare Platform",
    description: "Building HIPAA-compliant healthcare management systems with React, Next.js, and Go backend services.",
    period: "2022 – 2025",
  },
  {
    title: "Software Engineer",
    company: "Government Agency",
    description: "Developed secure, high-performance platforms for government services using TypeScript and cloud infrastructure.",
    period: "2020 – 2022",
  },
];

export function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      className="section-dark relative section overflow-hidden"
    >
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm text-muted-foreground uppercase tracking-widest">
            Work Experience
          </span>
        </motion.div>

        {/* Experience list with vertical lime line */}
        <div className="relative">
          {/* Vertical lime line - animated */}
          <motion.div 
            className="hidden lg:block absolute left-1/2 top-0 w-0.5 bg-accent/30 -translate-x-1/2"
            style={{ height: lineHeight }}
          />

          {/* Experiences */}
          <div className="space-y-16 lg:space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start ${
                  index % 2 === 0 ? "" : "lg:text-right"
                }`}
              >
                {/* Left side */}
                <div className={index % 2 === 0 ? "lg:text-right lg:order-1" : "lg:order-2"}>
                  <p className="text-sm text-accent mb-2">{exp.period}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground-light mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                </div>

                {/* Right side */}
                <div className={index % 2 === 0 ? "lg:order-2" : "lg:order-1 lg:text-left"}>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lime dot at the end of line */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block absolute left-1/2 bottom-0 w-4 h-4 bg-accent rounded-full -translate-x-1/2"
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-20"
        >
          <Link href="/about" className="inline-flex items-center gap-2">
            <span className="btn-lime">about me</span>
            <span className="btn-lime-circle">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
