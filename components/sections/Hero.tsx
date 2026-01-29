"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { Magnetic } from "@/hooks/useMagnetic";
import Link from "next/link";

// Dynamic import for 3D to avoid SSR issues
const Hero3D = dynamic(
  () => import("@/components/Hero3D").then((mod) => mod.Hero3D),
  { ssr: false }
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  // GSAP animation for title
  useEffect(() => {
    if (!titleRef.current) return;

    const lines = titleRef.current.querySelectorAll(".title-line");

    gsap.fromTo(
      lines,
      {
        y: 120,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* 3D Iridescent Blob */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Hero3D />
      </div>

      {/* Main content */}
      <motion.div
        className="container relative z-10 px-6 lg:px-12"
        style={{ y: springY, opacity: springOpacity }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-base mb-6"
          >
            Hi! I&apos;m Api
          </motion.p>

          {/* Large Title - Aziz style */}
          <div className="overflow-hidden mb-8">
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9]"
            >
              <span className="title-line block">Full-stack Developer</span>
              <span className="title-line block">UI & UX Designer.</span>
            </h1>
          </div>

          {/* CTA Buttons - Lime pill style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Magnetic strength={0.3}>
              <Link
                href="/works"
                className="btn-lime inline-flex items-center gap-2"
              >
                View Projects
                <ArrowUpRight size={16} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all"
              >
                Get in Touch
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="scroll-indicator"
      >
        <span>scroll down</span>
      </motion.div>

      {/* Right sidebar - W. / Hucksters style text */}
      <div className="right-sidebar hidden lg:flex">
        <span className="font-bold">W.</span>
        <span className="text-[10px] tracking-widest opacity-60">Hucksters</span>
      </div>

      {/* Bottom right circle button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="corner-circle-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </motion.div>
    </section>
  );
}
