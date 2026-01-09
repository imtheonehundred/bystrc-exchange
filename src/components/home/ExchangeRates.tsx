"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SearchBar } from "@/components/ui/SearchBar";
import { cn } from "@/lib/utils";
import { ExchangeRate } from "@/types";
import { useTranslations } from "next-intl";

export function ExchangeRates() {
  const t = useTranslations('Rates');
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/rates');
        if (res.ok) {
          const data = await res.json();
          setRates(data);
        }
      } catch (error) {
        console.error("Failed to fetch rates");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredRates = rates.filter(
    (rate) =>
      rate.currency.includes(search.toUpperCase()) ||
      rate.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="rates" className="py-12 md:py-24 bg-[#F3F4F6] relative border-y border-[var(--divider)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
          <div className="space-y-4 max-w-xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#111827]">
              {t('title')}
            </h2>
            <p className="text-[#6B7280]">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
            <SearchBar value={search} onChange={setSearch} placeholder={t('search')} />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRates.map((rate, index) => (
              <motion.div
                key={rate.currency}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card variant="default" className="p-6 hover:shadow-md transition-shadow group bg-white border-[#E5E7EB]">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{rate.flag}</span>
                      <div>
                        <h3 className="font-bold text-[#111827] text-lg">{rate.currency}</h3>
                        <p className="text-[#6B7280] text-xs">{rate.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#16A34A]/30 transition-colors">
                      <span className="text-[#4B5563] text-sm font-medium">{t('buy')}</span>
                      <span className="font-mono font-bold text-lg" style={{ color: '#16A34A' }}>
                        {rate.buyRate.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#DC2626]/30 transition-colors">
                      <span className="text-[#4B5563] text-sm font-medium">{t('sell')}</span>
                      <span className="font-mono font-bold text-lg" style={{ color: '#DC2626' }}>
                        {rate.sellRate.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
