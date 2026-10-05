'use client';

import { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, MapPin, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/config/site';
import { Reveal } from '@/components/shared/reveal';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactCards = [
    { icon: Phone, label: 'الهاتف', value: siteConfig.contact.phoneDisplay, href: `tel:${siteConfig.contact.phone}` },
    { icon: Mail, label: 'البريد الإلكتروني', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: MessageCircle, label: 'واتساب', value: siteConfig.contact.whatsapp, href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}` },
  ];
  const addressLine = [siteConfig.address.cityAr, siteConfig.address.streetAr].filter(Boolean).join(' - ');

  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'تواصل معنا' }]} />
        <Reveal className="mt-4 mb-10 rounded-2xl border border-border bg-white p-6 shadow-sm lg:p-8">
          <h1 className="text-2xl font-extrabold text-navy lg:text-3xl">تواصل معنا</h1>
          <p className="mt-2 text-sm text-muted-foreground">نحن هنا لمساعدتك. تواصل معنا بأي طريقة تناسبك</p>
        </Reveal>

        {/* Contact cards */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {contactCards.map((c, i) => (
            <Reveal key={i} delay={i * 70}>
              <a
                href={c.href}
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[var(--card-shadow)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-sm font-bold text-navy" dir="ltr">{c.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form */}
          <Reveal className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-navy">أرسل لنا رسالة</h2>
            {submitted ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-navy">تم إرسال رسالتك بنجاح</h3>
                <p className="mt-2 text-sm text-muted-foreground">سنرد عليك في أقرب وقت ممكن</p>
                <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                  إرسال رسالة أخرى
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-name" className="mb-1.5 block text-sm">الاسم *</Label>
                    <Input id="c-name" required placeholder="اسمك الكامل" className="h-11" />
                  </div>
                  <div>
                    <Label htmlFor="c-phone" className="mb-1.5 block text-sm">رقم الجوال *</Label>
                    <Input id="c-phone" required type="tel" placeholder="05xxxxxxxx" className="h-11" dir="ltr" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="c-email" className="mb-1.5 block text-sm">البريد الإلكتروني *</Label>
                  <Input id="c-email" required type="email" placeholder="example@email.com" className="h-11" dir="ltr" />
                </div>
                <div>
                  <Label htmlFor="c-subject" className="mb-1.5 block text-sm">الموضوع *</Label>
                  <Input id="c-subject" required placeholder="موضوع الرسالة" className="h-11" />
                </div>
                <div>
                  <Label htmlFor="c-message" className="mb-1.5 block text-sm">الرسالة *</Label>
                  <Textarea id="c-message" required placeholder="اكتب رسالتك هنا..." className="min-h-[120px]" />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="ml-2 h-4 w-4" />
                  إرسال الرسالة
                </Button>
              </form>
            )}
          </Reveal>

          {/* Info */}
          <div className="space-y-4">
            <Reveal delay={100} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-navy">معلومات التواصل</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-navy">ساعات العمل</p>
                    <p className="text-sm text-muted-foreground">{siteConfig.contact.hoursAr}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-navy">العنوان</p>
                    <p className="text-sm text-muted-foreground">{addressLine}</p>
                  </div>
                </li>
              </ul>
            </Reveal>

            {/* Map placeholder */}
            <Reveal delay={180} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <iframe
                title="خريطة الموقع في تبوك"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112309.66068874947!2d36.64830330558393!3d28.398825319873886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15a9ad0594132365%3A0x6f40e3c6b6139acf!2z2KrYqNmI2YMg2KfZhNiz2LnZiNiv2YrYqQ!5e0!3m2!1sar!2seg!4v1791201149322!5m2!1sar!2seg"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="aspect-video h-full min-h-[260px] w-full"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
