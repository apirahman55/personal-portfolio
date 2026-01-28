"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="section relative overflow-hidden bg-background"
    >
      <motion.div 
        className="container relative z-10"
        style={{ scale, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Large "Let's Talk" heading - Aziz style */}
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9]"
          >
            Let&apos;s Talk
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Have a project in mind or want to collaborate? I&apos;m always open to discussing new opportunities.
          </motion.p>

          {/* CTA Buttons - Lime pill style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              href="mailto:api.alrahman@gmail.com"
              className="inline-flex items-center gap-2"
            >
              <span className="btn-lime">
                <Mail size={16} />
                Send Email
              </span>
              <span className="btn-lime-circle">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-6 pt-8"
          >
            <Link
              href="https://linkedin.com/in/api-al-rahman"
              target="_blank"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
              <span className="text-sm">LinkedIn</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </Link>
          </motion.div>

          {/* Email display */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            api.alrahman@gmail.com
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
