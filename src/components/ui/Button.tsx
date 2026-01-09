"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "luxury";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", isLoading, children, ...props },
    ref
  ) => {
    const variants = {
      primary:
        "!bg-[#6B7280] !text-white hover:!bg-[#4B5563] shadow-sm font-medium border border-transparent",

      secondary:
        "!bg-white !text-[#111827] border border-[#E5E7EB] hover:!bg-[#F3F4F6] font-medium",

      outline:
        "!bg-transparent !text-[#111827] border border-[#E5E7EB] hover:!bg-[#F3F4F6] font-medium",

      ghost:
        "!bg-transparent !text-[#6B7280] hover:!text-[#111827] hover:!bg-[#F3F4F6] font-medium border border-transparent",

      luxury:
        "!bg-[#6B7280] !text-white hover:!bg-[#4B5563] shadow-sm font-medium border border-transparent",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
      xl: "h-16 px-10 text-xl font-semibold",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}

        {variant === "luxury" && (
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0] transition-[background-position] duration-1000 hover:bg-[position:200%_0]" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
