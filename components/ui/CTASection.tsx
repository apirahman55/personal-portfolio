"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { personalInfo } from "@/lib/data";
import { LimeButton } from "@/components/ui/LimeButton";

interface CTASectionProps {
  /** Custom heading text. Defaults to "Let's Talk" */
  heading?: string;
  /** Custom description text */
  description?: string;
  /** Whether to show email button. Defaults to true */
  showEmailButton?: boolean;
  /** Whether to show social links. Defaults to false */
  showSocialLinks?: boolean;
  /** Background variant */
  variant?: "light" | "dark";
  /** Custom className for the section */
  className?: string;
}

/**
 * Reusable CTA Section component
 * Used on Contact, About page, Works page, Works detail page
 */
export function CTASection({
  heading = "Let's Talk",
  description = "Have a project in mind or want to collaborate? I'm always open to discussing new opportunities.",
  showEmailButton = true,
  showSocialLinks = false,
  variant = "light",
  className = "",
}: CTASectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const bgClass = variant === "dark" ? "section-dark" : "bg-background";

  return (
    <section
      ref={containerRef}
      className={`section relative overflow-hidden ${bgClass} ${className}`}
    >
      <motion.div
        className="container relative z-10"
        style={{ scale, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9]"
          >
            {heading}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          {showEmailButton && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <LimeButton href={`mailto:${personalInfo.email}`} icon={<Mail size={16} />}>
                Send Email
              </LimeButton>
            </motion.div>
          )}

          {/* Email display */}
          {showEmailButton && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-muted-foreground"
            >
              {personalInfo.email}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
