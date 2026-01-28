import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
}

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-full magnetic-btn";

  const variants = {
    primary: "bg-foreground text-background hover:bg-accent",
    secondary: "bg-accent text-background hover:bg-accent-hover",
    outline:
      "border border-border text-foreground hover:border-accent hover:text-accent",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
        {icon && <ArrowUpRight size={16} />}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
      {icon && <ArrowUpRight size={16} />}
    </button>
  );
}
