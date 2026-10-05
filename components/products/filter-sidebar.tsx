'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { categories } from '@/data/categories';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  minRating: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  maxPrice: number;
  className?: string;
}

export function FilterSidebar({ filters, onChange, onClear, maxPrice, className }: FilterSidebarProps) {
  const toggleCategory = (slug: string) => {
    const exists = filters.categories.includes(slug);
    onChange({
      ...filters,
      categories: exists ? filters.categories.filter((c) => c !== slug) : [...filters.categories, slug],
    });
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-navy">تصفية النتائج</h3>
        <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-xs text-primary">
          مسح الفلاتر
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-3 border-t border-border pt-5">
        <h4 className="text-sm font-bold text-navy">التصنيفات</h4>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.slug} className="flex items-center gap-2.5">
              <Checkbox
                id={`cat-${cat.slug}`}
                checked={filters.categories.includes(cat.slug)}
                onCheckedChange={() => toggleCategory(cat.slug)}
              />
              <Label htmlFor={`cat-${cat.slug}`} className="cursor-pointer text-sm text-navy">
                {cat.nameAr}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-3 border-t border-border pt-5">
        <h4 className="text-sm font-bold text-navy">السعر</h4>
        <div className="px-1">
          <Slider
            value={filters.priceRange}
            onValueChange={(v) => onChange({ ...filters, priceRange: [v[0], v[1]] as [number, number] })}
            min={0}
            max={maxPrice}
            step={10}
            className="my-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filters.priceRange[0]} ر.س</span>
            <span>{filters.priceRange[1]} ر.س</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3 border-t border-border pt-5">
        <h4 className="text-sm font-bold text-navy">التقييم</h4>
        <div className="space-y-2">
          {[4, 3, 2, 0].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, minRating: r })}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
                filters.minRating === r ? 'bg-accent text-navy' : 'text-muted-foreground hover:bg-accent/50'
              )}
            >
              {r > 0 ? (
                <>
                  <div className="flex">
                    {Array.from({ length: r }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="mr-1 text-xs">فأكثر</span>
                  </div>
                </>
              ) : (
                'كل التقييمات'
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3 border-t border-border pt-5">
        <h4 className="text-sm font-bold text-navy">التوفّر</h4>
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="in-stock"
            checked={filters.inStockOnly}
            onCheckedChange={(v) => onChange({ ...filters, inStockOnly: !!v })}
          />
          <Label htmlFor="in-stock" className="cursor-pointer text-sm text-navy">
            المتوفر فقط
          </Label>
        </div>
      </div>
    </div>
  );
}
