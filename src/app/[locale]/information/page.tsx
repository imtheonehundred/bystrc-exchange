"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Accordion } from "@/components/information/Accordion";
import { Card } from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export default function InformationPage() {
  const t = useTranslations('Information');

  const faqs = [
    {
      title: t('faq_1_title'),
      content: t('faq_1_desc')
    },
    {
      title: t('faq_2_title'),
      content: t('faq_2_desc')
    },
    {
      title: t('faq_3_title'),
      content: t('faq_3_desc')
    },
    {
      title: t('faq_4_title'),
      content: t('faq_4_desc')
    },
    {
      title: t('faq_5_title'),
      content: t('faq_5_desc')
    }
  ];

  const legalTerms = [
    {
      title: t('term_1_title'),
      content: t('term_1_desc')
    },
    {
      title: t('term_2_title'),
      content: t('term_2_desc')
    },
    {
      title: t('term_3_title'),
      content: t('term_3_desc')
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Header />
      
      <div className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-muted-text">
              {t('subtitle')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            <section>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-6 border-b border-gray-200 pb-4 inline-block">
                {t('faq_title')}
              </h2>
              <Card variant="outline" className="p-6 bg-[var(--card-bg)] shadow-md">
                <Accordion items={faqs} />
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-6 border-b border-gray-200 pb-4 inline-block">
                {t('legal_title')}
              </h2>
              <Card variant="outline" className="p-6 bg-[var(--card-bg)] shadow-md">
                <Accordion items={legalTerms} />
              </Card>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
