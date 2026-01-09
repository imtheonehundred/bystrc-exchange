"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: t('home'), href: "/" },
    { name: t('information'), href: "/information" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--background-secondary)]/95 backdrop-blur-md border-b border-[var(--divider)] py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-lg">
              <img src="/desktop/logo.png" alt="BystrcExchange Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-playfair font-bold leading-none transition-colors",
                scrolled ? "text-foreground" : "text-white"
              )}>
                BystrcExchange
              </span>
              <span className={cn(
                "text-sm tracking-widest uppercase text-[0.65rem] transition-colors",
                scrolled ? "text-muted-text" : "text-slate-300"
              )}>
                Směnárna
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#6B7280]",
                  pathname === item.href ? "text-[#6B7280]" : scrolled ? "text-muted-text" : "text-slate-300"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <LanguageSwitcher isScrolled={scrolled} />

            <Button variant="luxury" size="sm" className="ml-4">
              <Phone className="w-4 h-4 mr-2" />
              {t('contact')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher isScrolled={scrolled} />
            <button
              className={cn(
                "p-2 transition-colors",
                scrolled ? "text-muted-text hover:text-foreground" : "text-slate-300 hover:text-white"
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#1E293B] shadow-lg"
            style={{ backgroundColor: '#0F172A' }}
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-lg font-medium text-slate-300 hover:text-white py-3 border-b border-[#1E293B] last:border-0 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
