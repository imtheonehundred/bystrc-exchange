"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
    setIsOpen(false);
  };

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/10",
          isScrolled ? "text-muted-text hover:text-foreground hover:bg-black/5" : "text-slate-300 hover:text-white"
        )}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="uppercase">{currentLang.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-48 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--divider)] rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    disabled={isPending}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-[var(--background)]",
                      locale === lang.code ? "text-[#111827] font-semibold bg-[var(--background)]" : "text-foreground"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                    {locale === lang.code && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
