import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter } from 'lucide-react';
import { siteConfig, footerLinks } from '@/config/site';
import { Newsletter } from '@/components/shared/newsletter';
import { Reveal } from '@/components/shared/reveal';

export function Footer() {
  const social = [
    { icon: Twitter, href: siteConfig.social.twitter, label: 'تويتر' },
    { icon: Instagram, href: siteConfig.social.instagram, label: 'انستغرام' },
    { icon: Facebook, href: siteConfig.social.facebook, label: 'فيسبوك' },
  ];
  const addressLine = [siteConfig.address.cityAr, siteConfig.address.streetAr].filter(Boolean).join(' - ');

  return (
    <footer className="mt-0 bg-navy text-white">
      <div className="border-b border-white/10 bg-white/[0.03]">
        <div className="premium-container">
          <Newsletter />
        </div>
      </div>

      <div className="premium-container py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
          <Reveal className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-lg font-black text-gold-foreground shadow-sm">ز</span>
              <span className="text-xl font-black">{siteConfig.storeName}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              زهرة ريحانة متجر متخصص في العطور الأصلية بروح سعودية ولمسة فاخرة تجمع بين العود والمسك وورد الطائف والعنبر.
            </p>
            <p className="text-sm font-semibold text-white/80">
              Made with <span className="text-red-500">❤</span> in Saudi Arabia
            </p>
            <div className="flex items-center gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-gold-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="mb-4 text-sm font-bold text-white">روابط سريعة</h3>
            <ul className="space-y-2.5">
              {footerLinks.store.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.labelAr}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <h3 className="mb-4 text-sm font-bold text-white">خدمة العملاء</h3>
            <ul className="space-y-2.5">
              {footerLinks.customer.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.labelAr}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <h3 className="mb-4 text-sm font-bold text-white">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/65">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span dir="ltr">{siteConfig.contact.phoneDisplay}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/65">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span dir="ltr">{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/65">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>واتساب: {siteConfig.contact.whatsapp}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{addressLine}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {siteConfig.storeName}. جميع الحقوق محفوظة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {siteConfig.paymentMethods.map((method) => (
              <div
                key={method}
                className="flex h-8 items-center rounded-md border border-white/10 bg-white/5 px-3 text-[10px] font-bold uppercase text-white/70"
              >
                {method === 'apple-pay' ? 'Pay' : method}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
