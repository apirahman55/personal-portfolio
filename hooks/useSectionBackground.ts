"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface UseSectionBackgroundOptions {
  /** CSS selector for the element to track */
  selector: string;
  /** Whether to account for dark mode inversion */
  accountForDarkMode?: boolean;
}

interface UseSectionBackgroundResult {
  /** Whether the element is currently over a dark section */
  isOverDark: boolean;
  /** Whether the current background is effectively light (accounting for dark mode) */
  isOverLightBg: boolean;
}

/**
 * Hook to detect if an element is over a dark section
 * Used by Header and SocialSidebar for dynamic text color
 */
export function useSectionBackground({
  selector,
  accountForDarkMode = true,
}: UseSectionBackgroundOptions): UseSectionBackgroundResult {
  const [isOverDark, setIsOverDark] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const checkBackground = () => {
      const element = document.querySelector(selector);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;

      const darkSections = document.querySelectorAll(
        ".section-dark, .bg-background-dark, [data-dark]"
      );

      let overDark = false;
      darkSections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();
        if (elementCenter >= sectionRect.top && elementCenter <= sectionRect.bottom) {
          overDark = true;
        }
      });

      setIsOverDark(overDark);
    };

    window.addEventListener("scroll", checkBackground, { passive: true });
    checkBackground();

    return () => window.removeEventListener("scroll", checkBackground);
  }, [selector]);

  // In dark mode, section-dark is inverted (becomes light)
  const isOverLightBg = accountForDarkMode
    ? isDarkMode
      ? !isOverDark // In dark mode: normal sections are dark, section-dark is light
      : isOverDark // In light mode: normal sections are light, section-dark is dark
    : isOverDark;

  return {
    isOverDark,
    isOverLightBg: !isOverLightBg, // Invert for easier usage (true = light bg)
  };
}
