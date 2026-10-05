'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { EmptyState } from '@/components/shared/empty-state';
import { Reveal } from '@/components/shared/reveal';

export default function WishlistPage() {
  const { ids, remove, hydrated } = useWishlist();
  const { addItem } = useCart();

  if (!hydrated) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-32 rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => ids.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="py-6 lg:py-10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'المفضلة' }]} />
          <EmptyState
            icon="wishlist"
            title="لم تضف أي منتجات للمفضلة بعد"
            description="تصفّح منتجاتنا وأضف ما يعجبك إلى المفضلة للعودة إليه لاحقاً."
            actionLabel="اكتشف المنتجات"
            actionHref="/products"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'المفضلة' }]} />
        <Reveal className="mt-4 mb-8 rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-extrabold text-navy lg:text-3xl">المفضلة</h1>
          <p className="mt-2 text-sm text-muted-foreground">{wishlistProducts.length} منتج في قائمتك</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 70} className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[var(--card-shadow)]">
              <Link href={`/product/${product.slug}`} className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.images[0]} alt={product.nameAr} className="h-24 w-24 rounded-lg object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link href={`/product/${product.slug}`} className="text-sm font-bold text-navy hover:text-primary">
                  {product.nameAr}
                </Link>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{product.shortDescriptionAr}</p>
                <p className="mt-2 text-sm font-bold text-primary">{formatPrice(product.price)}</p>
                <div className="mt-auto flex items-center gap-2 pt-3">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => addItem(product, 1)}
                    disabled={product.variants.length > 0}
                  >
                    <ShoppingCart className="ml-1.5 h-3.5 w-3.5" />
                    {product.variants.length > 0 ? 'خيارات' : 'للسلة'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="border border-border"
                    onClick={() => remove(product.id)}
                    aria-label="حذف"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/products">
              <ArrowLeft className="ml-2 h-4 w-4" />
              متابعة التسوق
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
