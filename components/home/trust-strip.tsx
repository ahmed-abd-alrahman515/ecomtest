import { BadgeCheck, Headphones, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';

const benefits = [
  { icon: Truck, title: 'توصيل سريع', desc: 'لجميع مناطق المملكة' },
  { icon: ShieldCheck, title: 'دفع آمن', desc: 'حماية كاملة لبياناتك' },
  { icon: BadgeCheck, title: 'عطور أصلية', desc: 'جودة موثوقة' },
  { icon: Headphones, title: 'دعم العملاء', desc: 'من 9ص حتى 11م' },
  { icon: RefreshCw, title: 'استبدال واسترجاع', desc: 'خلال 14 يوما' },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-white">
      <div className="premium-container">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 py-5 md:grid-cols-5 md:gap-3 lg:py-6">
          {benefits.map((benefit, index) => (
            <Reveal
              key={benefit.title}
              animation="fadeIn"
              delay={Math.min(index * 60, 240)}
              duration={520}
              className="flex items-center gap-3 md:justify-center"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-dark ring-1 ring-gold/20">
                <benefit.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <strong className="block text-[14px] font-extrabold leading-5 text-navy lg:text-[15px]">{benefit.title}</strong>
                <span className="block text-xs leading-5 text-muted-foreground lg:text-[13px]">{benefit.desc}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
