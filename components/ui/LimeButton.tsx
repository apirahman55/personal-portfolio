"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface LimeButtonProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  showArrow?: boolean;
  external?: boolean;
  className?: string;
}

/**
 * Reusable lime-styled button with optional arrow circle
 * Used across Hero, Contact, About, Projects sections
 */
export function LimeButton({
  href,
  children,
  icon,
  showArrow = true,
  external = false,
  className = "",
}: LimeButtonProps) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 ${className}`}
      {...linkProps}
    >
      <span className="btn-lime inline-flex items-center gap-2">
        {icon}
        {children}
      </span>
      {showArrow && (
        <span className="btn-lime-circle">
          <ArrowUpRight size={16} />
        </span>
      )}
    </Link>
  );
}

/**
 * Simple lime button without the circle (for inline usage)
 */
export function LimeButtonSimple({
  href,
  children,
  icon,
  external = false,
  className = "",
}: Omit<LimeButtonProps, "showArrow">) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      href={href}
      className={`btn-lime inline-flex items-center gap-2 ${className}`}
      {...linkProps}
    >
      {icon}
      {children}
    </Link>
  );
}
