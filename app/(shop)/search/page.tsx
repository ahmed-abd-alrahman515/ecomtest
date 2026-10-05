'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { CatalogGrid } from '@/components/products/catalog-grid';
import { EmptyState } from '@/components/shared/empty-state';
import { searchProducts } from '@/data/products';
import { Reveal } from '@/components/shared/reveal';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'البحث' }]} />
        <Reveal className="mt-4 mb-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-extrabold text-navy lg:text-3xl">نتائج البحث</h1>
          {query && (
            <p className="mt-2 text-sm text-muted-foreground">
              {results.length > 0 ? `وجدنا ${results.length} نتيجة لـ` : 'لم نجد نتائج لـ'} <span className="font-bold text-navy">&quot;{query}&quot;</span>
            </p>
          )}
        </Reveal>

        {results.length === 0 ? (
          <EmptyState
            icon="search"
            title="لم نجد نتائج مطابقة لبحثك"
            description="جرّب البحث بكلمة مختلفة أو تصفّح التصنيفات."
            actionLabel="تصفّح المنتجات"
            actionHref="/products"
          />
        ) : (
          <CatalogGrid products={results} columns={4} />
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 rounded bg-muted" />
          <div className="h-4 w-48 rounded bg-muted" />
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
