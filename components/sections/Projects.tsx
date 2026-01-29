"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { useCursor } from "@/components/ContextCursor";

function ProjectListItem({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { setProjectPreview, clearProjectPreview } = useCursor();
  const ref = useRef<HTMLDivElement>(null);

  // Parallax effect using scroll position
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax transforms - subtle movement
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/works/${project.slug}`}
        className="group block border-b border-border py-8 md:py-12"
        onMouseEnter={() => setProjectPreview(project.thumbnail, project.title)}
        onMouseLeave={clearProjectPreview}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Project Info */}
          <div className="flex items-center gap-6 md:gap-12">
            {/* Number */}
            <motion.span 
              className="text-muted-foreground text-sm font-mono w-8"
              style={{ 
                x: useTransform(scrollYProgress, [0, 1], [-20, 20]) 
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>

            {/* Title - parallax horizontal */}
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight group-hover:text-accent transition-colors duration-300"
              style={{ 
                x: useTransform(scrollYProgress, [0, 1], [-30, 30]) 
              }}
            >
              {project.title}
            </motion.h2>
          </div>

          {/* Right side - category + arrow */}
          <motion.div 
            className="flex items-center gap-8 md:gap-12 ml-14 md:ml-0"
            style={{ 
              x: useTransform(scrollYProgress, [0, 1], [30, -30]) 
            }}
          >
            {/* Tags */}
            <div className="hidden md:flex items-center gap-3">
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs text-muted-foreground border border-border rounded-full group-hover:border-accent/50 group-hover:text-accent transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Year */}
            <span className="text-muted-foreground text-sm font-mono">
              {project.year}
            </span>

            {/* Arrow */}
            <motion.div
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300"
              whileHover={{ rotate: 45 }}
            >
              <ArrowUpRight
                size={20}
                className="text-muted-foreground group-hover:text-background transition-colors"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Description - shows on mobile */}
        <p className="md:hidden text-muted-foreground text-sm mt-3 ml-14">
          {project.description}
        </p>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjects() {
  // Show max 7 projects on homepage
  const MAX_PROJECTS = 7;
  const displayedProjects = projects.slice(0, MAX_PROJECTS);
  const hasMore = projects.length > MAX_PROJECTS;

  return (
    <section className="py-16 md:py-24 bg-background relative z-10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-accent text-sm font-medium uppercase tracking-[0.2em] block mb-4"
          >
            Portfolio
          </motion.span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            Selected Works
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            A curated selection of projects showcasing my expertise in building
            high-performance digital products.
          </p>
        </motion.div>

        {/* Projects List - same as /works */}
        <div className="border-t border-border">
          {displayedProjects.map((project, index) => (
            <ProjectListItem key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* View More Link - only if more than 7 projects */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <Link href="/works" className="btn-lime inline-flex items-center gap-2">
              View All Projects
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

