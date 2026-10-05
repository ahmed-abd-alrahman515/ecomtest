'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappLink = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`;

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 260);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="الرجوع للأعلى"
        className={cn(
          'fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-[0_14px_30px_hsl(var(--gold)_/_0.32)] ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-1 hover:bg-gold-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:bottom-6 sm:right-6',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none'
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="fixed bottom-5 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_hsl(142_70%_35%_/_0.28)] ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1EBE5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:left-6"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </>
  );
}
