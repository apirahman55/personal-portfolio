"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/hooks/useMagnetic";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo - Simple A with underline on hover */}
        <Link 
          href="/" 
          className="text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity"
        >
          A<span className="text-accent">|</span>
        </Link>

        {/* Desktop Navigation - Simple text links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors link-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button Group - Lime pill + circle arrow (Aziz style) */}
        <Magnetic strength={0.2}>
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="#contact"
              className="btn-lime text-sm"
            >
              Contact
            </Link>
            <Link
              href="#contact"
              className="btn-lime-circle"
            >
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Magnetic>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border/20 md:hidden"
          >
            <ul className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-lime inline-flex items-center gap-2"
                >
                  Contact
                  <ArrowUpRight size={16} />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
