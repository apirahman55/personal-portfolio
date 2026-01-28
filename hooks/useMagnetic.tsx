"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

interface UseMagneticOptions {
  strength?: number;
  ease?: number;
}

export function useMagnetic<T extends HTMLElement>(
  options: UseMagneticOptions = {}
) {
  const { strength = 0.5, ease = 0.3 } = options;
  const ref = useRef<T>(null);
  const posRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Only apply magnetic effect if mouse is near the element
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = Math.max(rect.width, rect.height) * 1.5;

      if (distance < maxDistance) {
        const pullX = distanceX * strength;
        const pullY = distanceY * strength;

        gsap.to(ref.current, {
          x: pullX,
          y: pullY,
          duration: ease,
          ease: "power3.out",
        });
      }
    },
    [strength, ease]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const parent = element.parentElement || document;
    
    parent.addEventListener("mousemove", handleMouseMove as EventListener);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove as EventListener);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

// HOC for magnetic effect
interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.3, className = "" }: MagneticProps) {
  const magneticRef = useMagnetic<HTMLDivElement>({ strength });

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
