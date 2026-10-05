'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
  className?: string;
  style?: CSSProperties;
  variant?: 'default' | 'editorial';
}

export function CategoryCard({ category, productCount, className, style, variant = 'default' }: CategoryCardProps) {
  if (variant === 'editorial') {
    return (
      <Link
        href={`/category/${category.slug}`}
        className={cn(
          'group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-navy shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--card-shadow)]',
          className
        )}
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.image}
          alt={category.nameAr}
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
        <div className="relative p-5 text-white">
          <h3 className="text-lg font-bold lg:text-xl">{category.nameAr}</h3>
          {productCount !== undefined && (
            <p className="mt-1 text-xs text-white/80">{productCount} منتج</p>
          )}
          <div className="mt-3 flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2">
            تسوق الآن
            <ArrowLeft className="h-4 w-4" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        'group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--card-shadow)]',
        className
      )}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={category.image}
        alt={category.nameAr}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
      <div className="relative p-4 text-white">
        <h3 className="text-base font-bold">{category.nameAr}</h3>
        <div className="mt-2 flex items-center justify-between">
          {productCount !== undefined && (
            <span className="text-xs text-white/80">{productCount} منتج</span>
          )}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:-translate-x-1 group-hover:bg-white/30">
            <ArrowLeft className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
