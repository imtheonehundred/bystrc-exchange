"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 w-full"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ background: "linear-gradient(to bottom, #0F172A, #1E293B)" }}
        />
      </div>

      {/* Animated Floating Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["$", "€", "£", "¥", "CHF"].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-white/5 font-playfair font-bold text-9xl select-none"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              y: [0, -50, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6 md:space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white leading-tight">
            {t("title")}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 w-full">
            {/* CTA Buttons Removed */}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-text flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-gray-500/50 to-transparent" />
      </motion.div>
    </section>
  );
}
