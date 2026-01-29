"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/projects";
import { Star } from "lucide-react";

// Card color variants
const cardColors = [
  { bg: "#0a0a0a", text: "#ffffff", star: "#ffffff" }, // Black
  { bg: "#a78bfa", text: "#ffffff", star: "#ffffff" }, // Purple
  { bg: "#d4f534", text: "#0a0a0a", star: "#0a0a0a" }, // Lime
  { bg: "#ffffff", text: "#0a0a0a", star: "#0a0a0a" }, // White
  { bg: "#3b82f6", text: "#ffffff", star: "#ffffff" }, // Blue (accent)
];

// Scattered positions for desktop
const cardPositions = [
  { left: "10%", top: "15%", rotate: -15 },
  { left: "65%", top: "10%", rotate: 12 },
  { left: "15%", top: "60%", rotate: 10 },
  { left: "70%", top: "65%", rotate: -8 },
  { left: "38%", top: "20%", rotate: -5 },
  { left: "50%", top: "70%", rotate: 8 },
  { left: "8%", top: "38%", rotate: 6 },
  { left: "75%", top: "35%", rotate: -12 },
  { left: "28%", top: "45%", rotate: -3 },
  { left: "58%", top: "42%", rotate: 5 },
];

// Card component for reuse
function TestimonialCard({ 
  testimonial, 
  color, 
  isMobile = false 
}: { 
  testimonial: typeof testimonials[0]; 
  color: typeof cardColors[0];
  isMobile?: boolean;
}) {
  return (
    <div 
      className={`${isMobile ? 'w-[280px] flex-shrink-0' : 'w-[220px] md:w-[260px]'} p-5 md:p-6 rounded-2xl shadow-xl`}
      style={{ 
        backgroundColor: color.bg,
        color: color.text,
      }}
    >
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            fill={color.star}
            stroke={color.star}
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-4 opacity-90">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <p className="font-semibold text-sm">
        {testimonial.name}
      </p>
    </div>
  );
}

export function Testimonials() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const displayTestimonials = testimonials.slice(0, 10);
  
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-sm text-muted-foreground uppercase tracking-widest block mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Client Reviews
          </h2>
        </motion.div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4">
            {displayTestimonials.map((testimonial, index) => {
              const color = cardColors[index % cardColors.length];
              return (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ rotate: (index % 2 === 0 ? -2 : 2) }}
                >
                  <TestimonialCard testimonial={testimonial} color={color} isMobile />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop: Scattered Layout */}
        <div className="hidden md:block relative w-full h-[400px]">
          {displayTestimonials.map((testimonial, index) => {
            const color = cardColors[index % cardColors.length];
            const pos = cardPositions[index];
            const isFocused = focusedIndex === index;
            
            return (
              <motion.div
                key={testimonial.name}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8,
                  rotate: pos.rotate - 10,
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: pos.rotate,
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 0,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 1.05 }}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                tabIndex={0}
                className="absolute cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-2xl"
                style={{ 
                  left: pos.left, 
                  top: pos.top,
                  zIndex: isFocused ? 50 : index + 1,
                  transform: isFocused ? 'scale(1.1) rotate(0deg)' : undefined,
                }}
              >
                <TestimonialCard testimonial={testimonial} color={color} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
