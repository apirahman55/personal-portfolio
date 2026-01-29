"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Check if element is clickable
  const isClickable = useCallback((element: HTMLElement | null): boolean => {
    if (!element) return false;
    
    const clickableSelectors = [
      'a', 'button', 'input', 'textarea', 'select',
      '[role="button"]', '[data-clickable]'
    ];
    
    const clickableClasses = [
      'cursor-pointer', 'btn-lime', 'btn-lime-circle', 
      'social-icon', 'project-card', 'nav-link'
    ];

    // Check if element matches any clickable selector
    if (clickableSelectors.some(sel => element.matches(sel))) return true;
    
    // Check if element has any clickable class
    if (clickableClasses.some(cls => element.classList.contains(cls))) return true;
    
    // Check if element is SVG or inside SVG with clickable parent
    if (element.tagName === 'SVG' || element.tagName === 'svg' || element.closest('svg')) {
      const parent = element.closest('a, button, [role="button"]');
      if (parent) return true;
    }

    // Check parent (for nested elements like icons inside buttons)
    if (element.parentElement && element.parentElement !== document.body) {
      return isClickable(element.parentElement);
    }

    return false;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);

      // Update position directly for performance
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      setIsHovering(isClickable(target));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isClickable]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor hidden md:block ${isHovering ? 'hover' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

