"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Work experience data
const experiences = [
  {
    title: "Full Stack Engineer (Part-time)",
    company: "AI Startup",
    description: "Developing an AI-powered SaaS platform with real-time collaboration, billing systems, and intelligent document management.",
    period: "Jun 2025 – Present",
    current: true,
  },
  {
    title: "Senior Software Engineer",
    company: "Healthcare Platform",
    description: "Building HIPAA-compliant healthcare management systems with React, Next.js, and Go backend services.",
    period: "2022 – 2025",
    current: false,
  },
  {
    title: "Software Engineer",
    company: "Government Agency",
    description: "Developed secure, high-performance platforms for government services using TypeScript and cloud infrastructure.",
    period: "2020 – 2022",
    current: false,
  },
];

export function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

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
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
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
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
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


