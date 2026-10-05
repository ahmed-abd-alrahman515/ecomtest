'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/format';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';

export function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeItem, subtotal, itemCount, hydrated } = useCart();

  const shipping = subtotal >= siteConfig.shipping.freeThreshold || subtotal === 0 ? 0 : siteConfig.shipping.standardCost;
  const total = subtotal + shipping;
  const remaining = siteConfig.shipping.freeThreshold - subtotal;

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="left" className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5 text-primary" />
            سلة التسوق
            {hydrated && itemCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white">{itemCount}</span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Free shipping progress */}
        {hydrated && items.length > 0 && remaining > 0 && (
          <div className="bg-accent/60 px-5 py-3 text-xs text-navy">
            <p className="mb-2">
              أضف منتجات بقيمة <span className="font-bold text-primary">{formatPrice(remaining)}</span> للحصول على شحن مجاني
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${Math.min((subtotal / siteConfig.shipping.freeThreshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!hydrated ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-navy">سلة التسوق فارغة</p>
              <p className="mt-1 text-sm text-muted-foreground">لم تضف أي منتجات بعد</p>
              <Button asChild className="mt-6" onClick={() => setCartOpen(false)}>
                <Link href="/products">ابدأ التسوق</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => {
                const key = `${item.productId}-${JSON.stringify(item.variantSelections)}-${idx}`;
                return (
                  <div key={key} className="flex gap-3 border-b border-border pb-4 last:border-0">
                    <Link href={`/product/${item.slug}`} onClick={() => setCartOpen(false)} className="shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.nameAr} className="h-16 w-16 rounded-lg object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="truncate text-sm font-medium text-navy hover:text-primary"
                      >
                        {item.nameAr}
                      </Link>
                      {Object.entries(item.variantSelections).length > 0 && (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {Object.values(item.variantSelections).join(' • ')}
                        </p>
                      )}
                      <p className="mt-1 text-sm font-bold text-primary">{formatPrice(item.price)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantSelections)}
                            className="flex h-7 w-7 items-center justify-center text-navy hover:bg-accent"
                            aria-label="إنقاص"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantSelections)}
                            className="flex h-7 w-7 items-center justify-center text-navy hover:bg-accent"
                            aria-label="زيادة"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.variantSelections)}
                          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {hydrated && items.length > 0 && (
          <SheetFooter className="border-t border-border p-5">
            <div className="mb-3 space-y-2 text-sm">
              <div className="flex justify-between text-navy">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-navy">
                <span className="text-muted-foreground">الشحن</span>
                <span className="font-medium">
                  {shipping === 0 ? 'مجاني' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base">
                <span className="font-bold text-navy">الإجمالي</span>
                <span className="font-bold text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild size="lg" className="w-full" onClick={() => setCartOpen(false)}>
                <Link href="/checkout">
                  إتمام الطلب
                  <ArrowLeft className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full" onClick={() => setCartOpen(false)}>
                <Link href="/cart">عرض السلة</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
