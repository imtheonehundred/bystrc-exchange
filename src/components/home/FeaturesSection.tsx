"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, TrendingUp, Percent } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations('Features');

  const features = [
    {
      icon: <Percent className="w-8 h-8" />,
      title: t('commission_title'),
      description: t('commission_desc'),
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('rates_title'),
      description: t('rates_desc'),
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: t('security_title'),
      description: t('security_desc'),
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('service_title'),
      description: t('service_desc'),
    },
  ];

  return (
    <section className="py-24 bg-[#F3F4F6] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#6B7280] font-medium tracking-widest uppercase text-sm">{t('main_title')}</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-[#111827]">
            {t('main_subtitle')}
          </h2>
          <p className="text-[#4B5563] text-lg">
            {t('main_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 hover:shadow-md h-full group transition-all duration-300 bg-white border border-[#E5E7EB] shadow-sm">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F3F4F6] text-[#111827] group-hover:bg-[#E5E7EB] transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#4B5563] leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
