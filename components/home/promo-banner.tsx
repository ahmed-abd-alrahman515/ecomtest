import Link from 'next/link';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/reveal';

export function PromoBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="premium-container">
        <Reveal className="relative overflow-hidden rounded-2xl bg-navy shadow-[var(--soft-shadow)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.pexels.com/photos/6567204/pexels-photo-6567204.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200"
            alt="اختيارات هذا الأسبوع"
            className="absolute inset-0 h-full w-full object-cover opacity-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-navy via-navy/75 to-navy/20" />
          <div className="relative grid min-h-[420px] grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
            <div className="hidden lg:block" />
            <div className="max-w-xl text-white">
              <Reveal
                animation="fadeInDown"
                delay={80}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-4 py-2 text-xs font-semibold backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-blue-200" />
                مجموعة مختارة بعناية
              </Reveal>
              <Reveal delay={140}>
                <h2 className="text-3xl font-extrabold leading-tight lg:text-5xl">
                  اختيارات هذا الأسبوع
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 lg:text-lg">
                  عروض ومنتجات مختارة لتمنحك تجربة تسوق أخف، أجمل، وأكثر قيمة في كل طلب.
                </p>
              </Reveal>
              <Reveal delay={220} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90">
                  <Link href="/products">
                    اكتشف العرض
                    <ArrowLeft className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="inline-flex items-center gap-2 text-sm text-white/70">
                  <Clock className="h-4 w-4 text-blue-200" />
                  لفترة محدودة
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
