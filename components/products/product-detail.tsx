'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Minus, Plus, Truck, ShieldCheck, RefreshCw, Check, ChevronLeft } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/format';
import { getDiscountPercent } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/shared/star-rating';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/shared/reveal';

interface ProductDetailProps {
  product: Product;
}

const badgeConfig: Record<string, { label: string; className: string }> = {
  'best-seller': { label: 'الأكثر مبيعاً', className: 'bg-primary text-white' },
  'new': { label: 'جديد', className: 'bg-green-600 text-white' },
  'sale': { label: 'خصم', className: 'bg-red-500 text-white' },
  'limited': { label: 'كمية محدودة', className: 'bg-amber-500 text-white' },
};

export function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const { addItem, setCartOpen } = useCart();
  const { toggle, has, hydrated } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [variantSelections, setVariantSelections] = useState<Record<string, string>>({});

  const discount = getDiscountPercent(product.price, product.oldPrice);
  const inWishlist = hydrated && has(product.id);
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    if (product.variants.length > 0) {
      const missing = product.variants.filter((v) => !variantSelections[v.name]);
      if (missing.length > 0) {
        return;
      }
    }
    addItem(product, quantity, variantSelections);
  };

  const handleBuyNow = () => {
    if (product.variants.length > 0) {
      const missing = product.variants.filter((v) => !variantSelections[v.name]);
      if (missing.length > 0) return;
    }
    addItem(product, quantity, variantSelections);
    router.push('/checkout');
  };

  const setVariant = (name: string, value: string) => {
    setVariantSelections((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <Reveal animation="fadeIn" className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[selectedImage]}
                alt={product.nameAr}
                  className="h-full w-full object-cover"
              />
              {product.badge && badgeConfig[product.badge] && (
                <span className={cn('absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold', badgeConfig[product.badge].className)}>
                  {product.badge === 'sale' && discount ? `خصم ${discount}%` : badgeConfig[product.badge].label}
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      'relative h-20 w-20 overflow-hidden rounded-xl border-2 bg-white transition-all',
                      selectedImage === idx ? 'border-primary' : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${product.nameAr} - ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          {/* Info */}
          <Reveal delay={100} className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm lg:p-7">
            <h1 className="text-2xl font-extrabold leading-tight text-navy lg:text-3xl">{product.nameAr}</h1>
            <div className="mt-3 flex items-center gap-4">
              <StarRating rating={product.rating} count={product.reviewsCount} size="md" />
              <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
            </div>

            <p className="mt-4 text-base text-muted-foreground">{product.shortDescriptionAr}</p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-primary">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                  {discount && (
                    <span className="rounded-lg bg-red-50 px-2 py-1 text-sm font-bold text-red-600">
                      وفّر {discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Stock */}
            <div className="mt-4 flex items-center gap-2 text-sm">
              {inStock ? (
                <>
                  <span className="flex h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-medium text-green-600">متوفر في المخزون</span>
                </>
              ) : (
                <>
                  <span className="flex h-2 w-2 rounded-full bg-red-500" />
                  <span className="font-medium text-red-600">غير متوفر</span>
                </>
              )}
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mt-6 space-y-4">
                {product.variants.map((variant) => (
                  <div key={variant.name}>
                    <p className="mb-2 text-sm font-bold text-navy">{variant.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((opt) => {
                        const selected = variantSelections[variant.name] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => setVariant(variant.name, opt)}
                            className={cn(
                              'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                              selected
                                ? 'border-primary bg-primary text-white'
                                : 'border-border bg-white text-navy hover:border-primary/50'
                            )}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-bold text-navy">الكمية</p>
              <div className="inline-flex items-center rounded-lg border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-navy transition-colors hover:bg-accent"
                  aria-label="إنقاص"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-14 text-center text-base font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="flex h-11 w-11 items-center justify-center text-navy transition-colors hover:bg-accent"
                  aria-label="زيادة"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingCart className="ml-2 h-5 w-5" />
                أضف إلى السلة
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={handleBuyNow}
                disabled={!inStock}
              >
                شراء الآن
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="border border-border"
                onClick={() => toggle(product.id)}
                aria-label="إضافة للمفضلة"
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-red-500 text-red-500')} />
              </Button>
            </div>

            {/* Trust */}
            <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-surface p-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </span>
                <span className="text-xs font-medium text-navy">توصيل سريع</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </span>
                <span className="text-xs font-medium text-navy">دفع آمن</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </span>
                <span className="text-xs font-medium text-navy">استبدال واسترجاع</span>
              </div>
            </div>

            {/* Tabs */}
            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="description">
                <AccordionTrigger className="text-base font-bold text-navy">الوصف</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {product.descriptionAr}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="details">
                <AccordionTrigger className="text-base font-bold text-navy">التفاصيل</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> SKU: {product.sku}</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> التقييم: {product.rating.toFixed(1)} من 5</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> عدد المراجعات: {product.reviewsCount}</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> المخزون: {product.stock} قطعة</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-base font-bold text-navy">الشحن والاسترجاع</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  نوفر توصيلاً سريعاً لجميع مناطق المملكة خلال ٢-٥ أيام عمل. الشحن مجاني للطلبات فوق 200 ر.س. يمكنك استبدال أو استرجاع المنتج خلال ١٤ يوماً من تاريخ الاستلام.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>
        </div>
      </div>

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white p-3 shadow-lg lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">السعر</p>
            <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
          </div>
          <Button className="flex-1" onClick={handleAddToCart} disabled={!inStock}>
            <ShoppingCart className="ml-2 h-4 w-4" />
            أضف للسلة
          </Button>
        </div>
      </div>
    </div>
  );
}
