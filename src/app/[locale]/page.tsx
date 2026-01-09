import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ExchangeRates } from "@/components/home/ExchangeRates";
import { FeaturesSection } from "@/components/home/FeaturesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Header />
      <HeroSection />
      <ExchangeRates />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
