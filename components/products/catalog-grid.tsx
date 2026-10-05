'use client';

import { Product } from '@/types';
import { ProductCard } from '@/components/shared/product-card';
import { PackageSearch } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/shared/reveal';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function CatalogGrid({ products, columns = 4, className }: ProductGridProps) {
  const colClass = {
    2: 'grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  if (products.length === 0) {
    return (
      <EmptyState
        icon="filter"
        title="لا توجد منتجات مطابقة"
        description="جرّب تعديل الفلاتر أو مسحها لعرض المزيد من المنتجات"
        actionLabel="تصفّح كل المنتجات"
        actionHref="/products"
      />
    );
  }

  return (
    <div className={cn('grid gap-4 sm:gap-5', colClass, className)}>
      {products.map((p, index) => (
        <Reveal key={p.id} delay={(index % 8) * 55}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}
