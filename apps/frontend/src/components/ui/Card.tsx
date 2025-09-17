import React from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outlined" | "filled" | "gradient";
  size?: "sm" | "md" | "lg";
}

interface CardHeaderProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled" | "gradient";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className, variant = "default", size = "md", ...props },
    ref
  ) => {
    const baseStyles = "rounded-md border drop-shadow-lg";

    const variants = {
      default:
        "from-slate-100 to-gray-50 bg-gradient-to-b border-gray-300 drop-shadow-blue-900/5",
      outlined: "bg-white border-gray-200 drop-shadow-gray-900/5",
      filled: "bg-white border-gray-200 drop-shadow-gray-900/10",
      gradient:
        "from-blue-50 to-indigo-50 bg-gradient-to-br border-blue-200 drop-shadow-blue-900/10",
    };

    const sizes = {
      sm: "p-1",
      md: "p-2",
      lg: "p-4",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, icon, title, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "uppercase px-1 pt-1 text-sm font-bold font-mono tracking-widest text-slate-500 mb-2 flex items-center gap-2",
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {title && <span>{title}</span>}
        {children}
      </div>
    );
  }
);

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (
    { children, className, padding = "md", variant = "default", ...props },
    ref
  ) => {
    const paddingStyles = {
      none: "",
      sm: "p-1",
      md: "p-2",
      lg: "p-4",
    };

    const variants = {
      default: "bg-white border border-slate-300 rounded-sm",
      outlined: "bg-white rounded-sm",
      filled: "bg-white border border-gray-200 rounded-sm",
      gradient: "bg-white border border-gray-200 rounded-sm",
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], paddingStyles[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardContent };
export type { CardProps, CardHeaderProps, CardContentProps };
