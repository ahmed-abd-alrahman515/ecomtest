'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { FilterSidebar, FilterState } from '@/components/products/filter-sidebar';
import { CatalogGrid } from '@/components/products/catalog-grid';
import { SortSelect } from '@/components/products/sort-select';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Reveal } from '@/components/shared/reveal';

const MAX_PRICE = Math.max(...products.map((p) => p.price));

const defaultFilters: FilterState = {
  categories: [],
  priceRange: [0, MAX_PRICE],
  inStockOnly: false,
  minRating: 0,
};

type SortKey = 'best-selling' | 'newest' | 'price-asc' | 'price-desc';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortKey>('best-selling');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setFilters((f) => ({ ...f, categories: [cat] }));
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    switch (sort) {
      case 'newest':
        result = result.filter((p) => p.newArrival).concat(result.filter((p) => !p.newArrival));
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
  }, [filters, sort]);

  const activeCategoryNames = filters.categories
    .map((slug) => categories.find((c) => c.slug === slug)?.nameAr)
    .filter(Boolean);

  const clearFilters = () => setFilters(defaultFilters);

  const filterContent = (
    <FilterSidebar
      filters={filters}
      onChange={setFilters}
      onClear={clearFilters}
      maxPrice={MAX_PRICE}
    />
  );

  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المتجر' },
          ]}
        />
        <Reveal className="mt-4 mb-8 rounded-2xl border border-border bg-white p-6 shadow-sm lg:p-8">
          <h1 className="text-3xl font-extrabold text-navy lg:text-4xl">المتجر</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">
            تصفّح مجموعتنا الكاملة من المنتجات المختارة، وفرز النتائج حسب احتياجك بسهولة.
          </p>
        </Reveal>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <Reveal animation="fadeIn" className="sticky top-24 rounded-2xl border border-border bg-white p-5 shadow-sm">
              {filterContent}
            </Reveal>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Toolbar */}
            <Reveal animation="fadeIn" className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-navy">{filtered.length}</span> منتج
                {activeCategoryNames.length > 0 && (
                  <span className="mr-2">في {activeCategoryNames.join('، ')}</span>
                )}
              </p>
              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal className="ml-2 h-4 w-4" />
                      تصفية
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="max-h-[85vh]">
                    <div className="mx-auto w-full max-w-md overflow-y-auto p-4 pb-8">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-bold text-navy">تصفية النتائج</h3>
                        <DrawerClose asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </DrawerClose>
                      </div>
                      {filterContent}
                      <DrawerClose asChild>
                        <Button className="mt-6 w-full">عرض {filtered.length} منتج</Button>
                      </DrawerClose>
                    </div>
                  </DrawerContent>
                </Drawer>

                <SortSelect value={sort} onChange={(v) => setSort(v as SortKey)} />
              </div>
            </Reveal>

            {/* Grid */}
            <CatalogGrid products={filtered} columns={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 rounded bg-muted" />
          <div className="h-4 w-48 rounded bg-muted" />
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
