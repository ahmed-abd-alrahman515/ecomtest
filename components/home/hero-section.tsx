import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/reveal';
import { siteConfig } from '@/config/site';

export function HeroSection() {
  return (
    <section className="relative bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,hsl(var(--primary)/0.075),transparent_30%)]" />
      <div className="premium-container relative">
        <div className="grid min-h-[auto] grid-cols-1 items-center gap-9 py-10 lg:min-h-[650px] lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-12">
          <div className="order-1 text-center lg:text-right">
            <Reveal animation="fadeInDown" duration={560} className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold text-navy shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              مجموعة عطور سعودية أصلية
            </Reveal>

            <Reveal delay={80} duration={600}>
              <h1 className="text-[40px] font-extrabold leading-[1.16] text-navy sm:text-5xl lg:text-[60px]">
                {siteConfig.storeName}
                <span className="block text-primary">عطور فاخرة تعبر عن الهوية السعودية</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-8 text-muted-foreground sm:text-base lg:mx-0 lg:text-lg">
                اكتشف مجموعة مختارة من العطور الأصلية بروائح فاخرة مستوحاة من العود والمسك وورد الطائف والعنبر.
              </p>
            </Reveal>

            <Reveal delay={160} duration={600} className="mt-8 grid grid-cols-1 gap-3 sm:inline-flex sm:grid-cols-none sm:items-center">
              <Button asChild size="lg" className="h-12 rounded-xl px-7 text-sm font-bold sm:text-base">
                <Link href="/products">
                  تسوق الآن
                  <ArrowLeft className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-border bg-white px-7 text-sm font-bold sm:text-base">
                <Link href="/categories">اكتشف المجموعة</Link>
              </Button>
            </Reveal>
          </div>

          <Reveal animation="fadeIn" delay={120} duration={650} className="relative order-2">
            <div className="relative h-[360px] overflow-hidden rounded-[24px] shadow-[var(--soft-shadow)] sm:h-[430px] lg:h-[560px] lg:rounded-[28px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/image/7.png"
                alt="مجموعة عطور زهرة ريحانة"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
            </div>

            <div className="absolute bottom-4 right-4 w-[calc(100%-2rem)] rounded-2xl border border-border bg-white p-3 shadow-[var(--soft-shadow)] sm:bottom-6 sm:right-6 sm:w-[360px] sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 space-x-reverse">
                  {['/image/1.png', '/image/2.png', '/image/3.png'].map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={src} src={src} alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover sm:h-12 sm:w-12" />
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy">عطور أصلية بروح فاخرة</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Made with <span className="text-red-500">❤</span> in Saudi Arabia
                  </p>
                </div>
                <span className="mr-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-11 sm:w-11">
                  <Sparkles className="h-5 w-5" />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
