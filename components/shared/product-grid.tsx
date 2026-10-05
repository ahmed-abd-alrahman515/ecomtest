import { Product } from '@/types';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/shared/reveal';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  const colClass = {
    2: 'grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

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
