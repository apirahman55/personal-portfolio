"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/projects";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="section bg-card overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4 mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent text-sm font-medium uppercase tracking-[0.2em]"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            What <span className="text-accent">clients</span> say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative p-8 bg-background border border-border rounded-2xl hover:border-accent/30 transition-all duration-300"
              style={{ perspective: "1000px" }}
            >
              {/* Quote icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                className="absolute -top-4 left-6"
              >
                <div className="p-3 bg-accent rounded-full">
                  <Quote size={16} className="text-background" />
                </div>
              </motion.div>

              {/* Content */}
              <p className="text-foreground text-lg leading-relaxed mb-8 pt-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg"
                >
                  {testimonial.name.charAt(0)}
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
