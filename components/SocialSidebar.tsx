"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { socialLinks, SocialLink } from "@/lib/data";
import { getSocialIcon } from "@/lib/icons";

// Filter only visible sidebar links (exclude email)
const sidebarLinks = socialLinks.filter(link => link.platform !== "email");

export function SocialSidebar() {
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const sidebar = document.querySelector('.social-sidebar');
      if (!sidebar) return;
      
      const sidebarRect = sidebar.getBoundingClientRect();
      const sidebarCenter = sidebarRect.top + sidebarRect.height / 2;
      
      const darkSections = document.querySelectorAll('.section-dark, .bg-background-dark, [data-dark]');
      
      let overDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (sidebarCenter >= rect.top && sidebarCenter <= rect.bottom) {
          overDark = true;
        }
      });
      
      setIsOverDark(overDark);
    };

    window.addEventListener('scroll', checkBackground, { passive: true });
    checkBackground();
    
    return () => window.removeEventListener('scroll', checkBackground);
  }, []);

  return (
    <div 
      className="social-sidebar hidden lg:flex"
      style={{ color: isOverDark ? '#ffffff' : '#000000' }}
    >
      {sidebarLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          className="social-icon hover:!text-accent transition-colors"
          aria-label={link.label}
        >
          {getSocialIcon(link.platform)}
        </Link>
      ))}
    </div>
  );
}

