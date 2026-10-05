'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/format';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { EmptyState } from '@/components/shared/empty-state';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Reveal } from '@/components/shared/reveal';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, hydrated, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!hydrated) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-32 rounded-xl bg-muted" />
          <div className="h-32 rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-6 lg:py-10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'سلة التسوق' }]} />
          <EmptyState
            icon="cart"
            title="سلة التسوق فارغة"
            description="لم تضف أي منتجات إلى سلتك بعد. ابدأ التسوق واكتشف منتجاتنا المميزة."
            actionLabel="ابدأ التسوق"
            actionHref="/products"
          />
        </div>
      </div>
    );
  }

  const shipping = subtotal >= siteConfig.shipping.freeThreshold ? 0 : siteConfig.shipping.standardCost;
  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const applyDiscount = () => {
    if (discountCode.trim()) {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'سلة التسوق' }]} />
        <Reveal className="mt-4 mb-8 flex items-center justify-between rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-extrabold text-navy lg:text-3xl">سلة التسوق</h1>
          <button
            onClick={clearCart}
            className="text-sm text-muted-foreground transition-colors hover:text-destructive"
          >
            إفراغ السلة
          </button>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, idx) => {
                const key = `${item.productId}-${JSON.stringify(item.variantSelections)}-${idx}`;
                return (
                  <Reveal key={key} delay={idx * 70} className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
                    <Link href={`/product/${item.slug}`} className="shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.nameAr} className="h-24 w-24 rounded-lg object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/product/${item.slug}`} className="text-sm font-bold text-navy hover:text-primary lg:text-base">
                          {item.nameAr}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId, item.variantSelections)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {Object.entries(item.variantSelections).length > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {Object.entries(item.variantSelections).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                        </p>
                      )}
                      <p className="mt-1 text-sm font-bold text-primary">{formatPrice(item.price)}</p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center rounded-lg border border-border">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantSelections)}
                            className="flex h-8 w-8 items-center justify-center text-navy hover:bg-accent"
                            aria-label="إنقاص"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantSelections)}
                            className="flex h-8 w-8 items-center justify-center text-navy hover:bg-accent"
                            aria-label="زيادة"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-navy">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
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

          {/* Summary */}
          <div className="lg:col-span-1">
            <Reveal animation="fadeIn" className="sticky top-24 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-navy">ملخص الطلب</h2>

              {/* Discount */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-navy">كود الخصم</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="أدخل الكود"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="h-10"
                  />
                  <Button variant="outline" className="shrink-0" onClick={applyDiscount} disabled={!discountCode.trim()}>
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                {discountApplied && (
                  <p className="mt-2 text-xs text-green-600">تم تطبيق خصم 10%</p>
                )}
              </div>

              <div className="space-y-3 border-t border-border pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span className="font-medium text-navy">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الشحن</span>
                  <span className="font-medium text-navy">
                    {shipping === 0 ? 'مجاني' : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-3 text-base">
                  <span className="font-bold text-navy">الإجمالي</span>
                  <span className="font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="mt-3 rounded-lg bg-accent/60 p-2.5 text-xs text-navy">
                  أضف {formatPrice(siteConfig.shipping.freeThreshold - subtotal)} للحصول على شحن مجاني
                </p>
              )}

              <Button asChild size="lg" className="mt-5 w-full">
                <Link href="/checkout">
                  إتمام الطلب
                  <ArrowLeft className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
