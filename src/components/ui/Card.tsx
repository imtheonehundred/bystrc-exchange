"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "outline";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-white border border-[var(--divider)] shadow-sm hover:shadow-md transition-shadow duration-300",
      glass: "bg-white border border-[var(--divider)] shadow-sm",
      outline: "bg-transparent border border-[var(--divider)]",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden transition-all duration-300",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

export { Card };
