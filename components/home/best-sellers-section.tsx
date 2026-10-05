import Link from 'next/link';
import { ArrowLeft, BadgeCheck, ShoppingBag, Star } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { ProductCard } from '@/components/shared/product-card';
import { Reveal } from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';
import { getBestSellers } from '@/data/products';

export function BestSellersSection() {
  const bestSellers = getBestSellers().slice(0, 5);
  const [featured, ...rest] = bestSellers;

  return (
    <section className="premium-section bg-surface">
      <div className="premium-container">
        <SectionHeading
          title="الأكثر مبيعاً"
          subtitle="منتجات اختارها عملاؤنا أكثر من غيرها، بتقييمات عالية وتجربة شراء موثوقة."
          href="/products"
          hrefLabel="عرض جميع المنتجات"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          {featured && (
            <Reveal className="lg:col-span-1" delay={60}>
              <Link
                href={`/product/${featured.slug}`}
                className="group relative flex h-full min-h-[430px] overflow-hidden rounded-2xl bg-navy text-white shadow-[var(--soft-shadow)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.images[0]}
                  alt={featured.nameAr}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-transparent" />
                <div className="relative mt-auto w-full p-6">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                    اختيار العملاء
                  </div>
                  <h3 className="text-2xl font-extrabold leading-tight">{featured.nameAr}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">
                    {featured.shortDescriptionAr}
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-white/60">ابتداءً من</p>
                      <p className="text-2xl font-extrabold">{formatPrice(featured.price)}</p>
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary transition-transform group-hover:-translate-x-1">
                      <ArrowLeft className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:col-span-3 lg:grid-cols-4">
            {rest.map((product, index) => (
              <Reveal key={product.id} delay={index * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal
          delay={180}
          className="mt-6 flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-navy">منتجات موثوقة ومجربة</p>
              <p className="text-xs text-muted-foreground">مختارة بعناية لتناسب احتياجك اليومي.</p>
            </div>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/products">
              <ShoppingBag className="ml-2 h-4 w-4" />
              تسوق المجموعة
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
