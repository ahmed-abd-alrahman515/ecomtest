'use client';

import Link from 'next/link';
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { formatPrice } from '@/lib/format';
import { getDiscountPercent } from '@/data/products';
import { categories } from '@/data/categories';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { cn } from '@/lib/utils';

const badgeConfig: Record<string, { label: string; className: string }> = {
  'best-seller': { label: 'الأكثر مبيعاً', className: 'bg-gold text-gold-foreground' },
  new: { label: 'جديد', className: 'bg-emerald-600 text-white' },
  sale: { label: 'خصم', className: 'bg-rose-600 text-white' },
  limited: { label: 'كمية محدودة', className: 'bg-gold-dark text-white' },
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, has, hydrated } = useWishlist();
  const router = useRouter();
  const discount = getDiscountPercent(product.price, product.oldPrice);
  const inWishlist = hydrated && has(product.id);
  const category = categories.find((cat) => cat.slug === product.category);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.variants.length > 0) {
      router.push(`/product/${product.slug}`);
      return;
    }
    addItem(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        'group premium-card premium-card-hover relative flex h-full flex-col overflow-hidden rounded-2xl',
        className
      )}
    >
      <div className="relative m-2 mb-0 aspect-[4/4.25] overflow-hidden rounded-xl bg-[#F7F8FA]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.nameAr}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/10 via-transparent to-white/10 opacity-70" />

        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {product.badge && badgeConfig[product.badge] && (
            <span
              className={cn(
                'rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm',
                badgeConfig[product.badge].className
              )}
            >
              {product.badge === 'sale' && discount ? `خصم ${discount}%` : badgeConfig[product.badge].label}
            </span>
          )}
        </div>

        <button
          onClick={handleWishlist}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-navy shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-gold"
          aria-label={inWishlist ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
        >
          <Heart
            className={cn('h-4 w-4 transition-all', inWishlist ? 'fill-red-500 text-red-500' : 'text-navy')}
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition-all duration-300 md:translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy/90 px-3 py-2.5 text-xs font-bold text-white shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-gold-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
            {product.variants.length > 0 ? 'عرض الخيارات' : 'أضف للسلة'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {category && (
          <p className="mb-2 text-[11px] font-bold text-gold-dark">{category.nameAr}</p>
        )}

        {product.rating > 0 && (
          <div className="mb-2 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-navy">{product.rating.toFixed(1)}</span>
            {product.reviewsCount > 0 && (
              <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
            )}
          </div>
        )}

        <h3 className="line-clamp-2 min-h-[2.55rem] text-sm font-extrabold leading-snug text-navy transition-colors group-hover:text-gold-dark lg:text-[15px]">
          {product.nameAr}
        </h3>

        <p className="mt-2 hidden line-clamp-1 text-xs text-muted-foreground sm:block">
          {product.shortDescriptionAr}
        </p>

        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-4">
          <span className="text-lg font-black text-gold-dark">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
          )}
          {discount && (
            <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-bold text-gold-dark">
              وفر {discount}%
            </span>
          )}
        </div>

        <div className="mt-3 hidden items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground sm:flex">
          <span className="flex items-center gap-1 transition-colors group-hover:text-gold-dark">
            <Eye className="h-3.5 w-3.5" />
            عرض سريع
          </span>
          <span>{product.stock > 0 ? 'متوفر' : 'غير متوفر'}</span>
        </div>
      </div>
    </Link>
  );
}
