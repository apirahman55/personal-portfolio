"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        href={`/works/${project.slug}`}
        className="group block card-hover"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-card mb-4">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          {/* Arrow icon on hover */}
          <div className="absolute top-4 right-4 p-3 bg-foreground text-background rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight size={20} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-muted-foreground bg-muted rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export function TestimonialCard({
  name,
  role,
  company,
  content,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8 bg-card border border-border rounded-2xl"
    >
      <p className="text-foreground text-lg leading-relaxed mb-6">
        &ldquo;{content}&rdquo;
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">
            {role} at {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
