'use client';

import { SectionHeading } from '@/components/shared/section-heading';
import { ProductCard } from '@/components/shared/product-card';
import { Reveal } from '@/components/shared/reveal';
import { Product } from '@/types';

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;
  return (
    <div className="mt-12">
      <SectionHeading title="قد يعجبك أيضاً" />
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
        {products.map((p, index) => (
          <Reveal key={p.id} delay={index * 70}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
