"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/about", label: "About", numeral: "I" },
  { href: "/works", label: "Works", numeral: "II" },
  { href: "#contact", label: "Contact", numeral: "III" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const { theme } = useTheme();

  // Detect when header is over dark sections
  useEffect(() => {
    const checkBackground = () => {
      const header = document.querySelector('header');
      if (!header) return;
      
      const headerRect = header.getBoundingClientRect();
      const headerCenter = headerRect.top + headerRect.height / 2;
      
      // Get all dark sections
      const darkSections = document.querySelectorAll('.section-dark, .bg-background-dark, [data-dark]');
      
      let overDarkSection = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (headerCenter >= rect.top && headerCenter <= rect.bottom) {
          overDarkSection = true;
        }
      });
      
      // In dark mode, section-dark is actually light (inverted)
      // So we need to invert the logic
      const needsLightText = theme === 'dark' 
        ? !overDarkSection  // In dark mode: normal sections are dark, section-dark is light
        : overDarkSection;   // In light mode: normal sections are light, section-dark is dark
      
      setIsOverDark(needsLightText);
    };

    // Check on scroll
    window.addEventListener('scroll', checkBackground, { passive: true });
    // Check initially
    checkBackground();
    
    return () => window.removeEventListener('scroll', checkBackground);
  }, [theme]);

  // Compute actual text colors needed
  // isOverDark = true means we need LIGHT text (we're over dark bg)
  // isOverDark = false means we need DARK text (we're over light bg)
  const textColor = isOverDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const textColorHover = isOverDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)';
  const textColorFull = isOverDark ? '#ffffff' : '#000000';
  const lineColor = isOverDark ? '#ffffff' : '#000000';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 md:py-6 transition-colors duration-300`}>
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* LEFT - Nav Links (Desktop) */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300"
                  style={{ color: textColor }}
                  onMouseEnter={(e) => e.currentTarget.style.color = textColorHover}
                  onMouseLeave={(e) => e.currentTarget.style.color = textColor}
                >
                  {link.label}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: lineColor }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* CENTER - Logo (absolutely centered) */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link 
              href="/" 
              className="text-xl font-medium tracking-tight hover:opacity-70 transition-all duration-300"
              style={{ color: textColorFull }}
            >
              Api AR<span className="text-accent">.</span>
            </Link>
          </div>

          {/* RIGHT - Theme Toggle + Contact Us (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 group"
              style={{ color: textColor }}
              onMouseEnter={(e) => e.currentTarget.style.color = textColorHover}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              Contact Us
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button - Burger + Theme Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Open menu"
            >
              <span className="w-6 h-px transition-colors duration-300" style={{ backgroundColor: lineColor }} />
              <span className="w-6 h-px transition-colors duration-300" style={{ backgroundColor: lineColor }} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Modal Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-background-dark md:hidden"
          >
            {/* Close button - Plus/X */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-6 p-2 text-foreground-light z-10"
              aria-label="Close menu"
            >
              <motion.div
                initial={{ rotate: -45 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                <Plus size={32} className="rotate-45" />
              </motion.div>
            </button>

            {/* Logo in modal */}
            <div className="absolute top-5 left-6 text-xl font-medium tracking-tight text-foreground-light">
              a.pi<span className="text-accent">.</span>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col justify-center h-full px-6 pb-20">
              <motion.ul
                className="space-y-1"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                }}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-foreground-light/10"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-baseline justify-between py-4"
                    >
                      <span className="text-4xl md:text-5xl font-bold text-foreground-light group-hover:text-accent transition-colors duration-300">
                        {link.label}
                      </span>
                      <span className="text-sm text-foreground-light/40 font-mono">
                        {link.numeral}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-6 right-6"
              >
                <div className="flex justify-between items-end text-xs text-foreground-light/40">
                  <span>© 2025 Api Al Rahman</span>
                  <span className="font-mono">Software Engineer</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


