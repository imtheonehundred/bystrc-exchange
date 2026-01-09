"use client";

import { Link } from "@/navigation";
import { Globe, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#F3F4F6] border-t border-[var(--divider)] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-lg">
                <img src="/desktop/logo.png" alt="BystrcExchange Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-playfair font-bold text-[#111827] leading-none">
                  BystrcExchange
                </span>
                <span className="text-xs text-[#6B7280] tracking-widest uppercase">
                  Směnárna
                </span>
              </div>
            </Link>
            <p className="text-[#4B5563] text-sm leading-relaxed">
              {t('company_desc')}
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Twitter className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Instagram className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Linkedin className="w-4 h-4" />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#111827] font-playfair font-semibold mb-6">{t('quick_links')}</h3>
            <ul className="space-y-3">
              <FooterLink href="/#rates">{t('live_rates')}</FooterLink>
              <FooterLink href="/information">{t('legal_info')}</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#111827] font-playfair font-semibold mb-6">{t('services')}</h3>
            <ul className="space-y-3">
              <FooterLink href="#">{t('currency_exchange')}</FooterLink>
              <FooterLink href="#">{t('international_transfers')}</FooterLink>
              <FooterLink href="#">{t('travel_money')}</FooterLink>
              <FooterLink href="#">{t('corporate_services')}</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#111827] font-playfair font-semibold mb-6">{t('contact_us')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-[#4B5563] text-sm">
                <MapPin className="w-5 h-5 text-[#6B7280] shrink-0" />
                <span>nám. 28. dubna 1069/2,<br />635 00 Brno-Bystrc</span>
              </li>
              <li className="flex items-center space-x-3 text-[#4B5563] text-sm">
                <Phone className="w-5 h-5 text-[#6B7280] shrink-0" />
                <span>+420 602 258 621</span>
              </li>
              <li className="flex items-center space-x-3 text-[#4B5563] text-sm">
                <Mail className="w-5 h-5 text-[#6B7280] shrink-0" />
                <span>exmony10@seznam.cz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--divider)] pt-8 flex flex-col md:flex-row justify-between items-center text-[#6B7280] text-sm">
          <p>© {new Date().getFullYear()} BystrcExchange. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#111827] transition-all duration-300 shadow-sm border border-[#E5E7EB]"
    >
      {icon}
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[#4B5563] hover:text-[#111827] transition-colors text-sm">
        {children}
      </Link>
    </li>
  );
}
