"use client";

import { motion } from "framer-motion";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
            <span className="text-muted-foreground text-sm font-mono w-8">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h2>
          </div>

          {/* Right side - category + arrow */}
          <div className="flex items-center gap-8 md:gap-12 ml-14 md:ml-0">
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
          </div>
        </div>

        {/* Description - shows on mobile */}
        <p className="md:hidden text-muted-foreground text-sm mt-3 ml-14">
          {project.description}
        </p>
      </Link>
    </motion.div>
  );
}

export default function WorksPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-accent text-sm font-medium uppercase tracking-[0.2em] block mb-4"
          >
            Selected Works
          </motion.span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            Projects
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            A curated selection of projects showcasing my expertise in building
            high-performance digital products.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="border-t border-border">
          {projects.map((project, index) => (
            <ProjectListItem key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <p className="text-muted-foreground text-lg mb-6">
            Interested in working together?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-accent text-lg font-medium hover:underline"
          >
            Let&apos;s talk
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
