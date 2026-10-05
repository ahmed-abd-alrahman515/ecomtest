'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { ProductCard } from '@/components/shared/product-card';
import { Reveal } from '@/components/shared/reveal';
import { getNewArrivals } from '@/data/products';

export function NewArrivalsSection() {
  const newArrivals = getNewArrivals();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="premium-section bg-white">
      <div className="premium-container">
        <div className="flex items-start justify-between gap-4">
          <SectionHeading
            title="وصل حديثاً"
            subtitle="أحدث الإضافات التي اخترناها لك، بتفاصيل عملية ولمسة تناسب أسلوبك."
            href="/products"
          />
          <Reveal className="mt-1 hidden gap-2 md:flex" animation="fadeIn">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => scroll('right')} aria-label="السابق">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => scroll('left')} aria-label="التالي">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <div
          ref={scrollRef}
          className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 pt-1 scroll-smooth"
        >
          {newArrivals.map((product, index) => (
            <Reveal
              key={product.id}
              delay={index * 80}
              className="w-[72vw] shrink-0 snap-start sm:w-[310px] md:w-[285px]"
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
