'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CatalogGrid } from '@/components/products/catalog-grid';
import { SortSelect } from '@/components/products/sort-select';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Product } from '@/types';

type SortKey = 'best-selling' | 'newest' | 'price-asc' | 'price-desc';

interface CategoryCatalogProps {
  initialProducts: Product[];
}

export function CategoryCatalog({ initialProducts }: CategoryCatalogProps) {
  const [sort, setSort] = useState<SortKey>('best-selling');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sorted = useMemo(() => {
    const result = [...initialProducts];
    switch (sort) {
      case 'newest':
        result.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
      default:
        result.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
        break;
    }
    return result;
  }, [initialProducts, sort]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-navy">{sorted.length}</span> منتج
        </p>
        <div className="flex items-center gap-2">
          <SortSelect value={sort} onChange={(v) => setSort(v as SortKey)} />
        </div>
      </div>
      <CatalogGrid products={sorted} columns={4} />
    </div>
  );
}
