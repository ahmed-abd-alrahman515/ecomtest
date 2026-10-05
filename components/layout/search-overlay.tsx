'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, PackageSearch } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { searchProducts } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  useEffect(() => {
    const t = setTimeout(() => {
      setResults(searchProducts(query));
    }, 150);
    return () => clearTimeout(t);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onOpenChange(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => onOpenChange(false)}>
      <div
        className="mt-0 w-full max-w-2xl bg-white shadow-2xl animate-scale-in md:mt-20 md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search bar */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-border p-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن المنتجات..."
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <Button type="submit" size="sm" disabled={!query.trim()}>
            بحث
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => onOpenChange(false)} aria-label="إغلاق">
            <X className="h-5 w-5" />
          </Button>
        </form>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              ابدأ بكتابة اسم المنتج أو التصنيف للبحث
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center px-4 py-12 text-center">
              <PackageSearch className="mb-3 h-12 w-12 text-muted-foreground/40" />
              <p className="font-medium text-navy">لم نجد نتائج مطابقة لبحثك</p>
              <p className="mt-1 text-sm text-muted-foreground">جرّب البحث بكلمة مختلفة أو تصفّح التصنيفات</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.slice(0, 6).map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent'
                  )}
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.nameAr} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-navy">{p.nameAr}</p>
                    <p className="text-xs text-muted-foreground">{p.shortDescriptionAr}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-primary">{formatPrice(p.price)}</span>
                </Link>
              ))}
              {results.length > 6 && (
                <button
                  onClick={handleSubmit}
                  className="block w-full rounded-lg p-2 text-center text-sm font-medium text-primary hover:bg-accent"
                >
                  عرض كل النتائج ({results.length})
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
