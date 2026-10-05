import Link from 'next/link';
import { ArrowLeft, BadgeCheck, Headphones, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/reveal';

export function AboutSection() {
  const points = [
    { icon: BadgeCheck, title: 'منتجات مختارة بعناية' },
    { icon: Truck, title: 'توصيل سريع داخل المملكة' },
    { icon: Headphones, title: 'دعم قبل وبعد الطلب' },
  ];

  return (
    <section className="premium-section bg-surface">
      <div className="premium-container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--soft-shadow)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/12277020/pexels-photo-12277020.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200"
                alt="تجربة تسوق أبسط"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-primary" />
              <span className="text-sm font-bold text-primary">من نحن</span>
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-navy lg:text-4xl">
              تجربة تسوق أبسط
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              نختار لك منتجات تجمع بين الجودة، التصميم، والسعر المناسب لتستمتع بتجربة تسوق أكثر سهولة ووضوحاً من أول تصفح حتى وصول الطلب.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {points.map((point, index) => (
                <Reveal
                  key={point.title}
                  delay={180 + index * 70}
                  className="rounded-2xl border border-border bg-white p-4"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-navy">{point.title}</p>
                </Reveal>
              ))}
            </div>

            <Button asChild size="lg" className="mt-8">
              <Link href="/about">
                تعرّف علينا
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
