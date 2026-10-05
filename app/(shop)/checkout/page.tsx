'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, CreditCard, Wallet, Banknote, Truck, Store, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/format';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { EmptyState } from '@/components/shared/empty-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/shared/reveal';

const saudiCities = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة المنورة', 'الخبر', 'الطائف', 'أبها', 'تبوك', 'بريدة'];

export default function CheckoutPage() {
  const { items, subtotal, hydrated, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('mada');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [submitted, setSubmitted] = useState(false);

  if (!hydrated) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-64 rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="py-6 lg:py-10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'إتمام الطلب' }]} />
          <EmptyState
            icon="cart"
            title="لا يمكن إتمام الطلب"
            description="سلتك فارغة. أضف منتجات إلى السلة أولاً قبل إتمام الطلب."
            actionLabel="ابدأ التسوق"
            actionHref="/products"
          />
        </div>
      </div>
    );
  }

  const shipping = deliveryMethod === 'express' ? 45 : subtotal >= siteConfig.shipping.freeThreshold ? 0 : siteConfig.shipping.standardCost;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="py-6 lg:py-10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'إتمام الطلب' }]} />
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-navy">تم استلام طلبك بنجاح</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              شكراً لك! سيتم التواصل معك قريباً لتأكيد الطلب وترتيب التوصيل.
            </p>
            <Button asChild className="mt-8" size="lg">
              <Link href="/products">متابعة التسوق</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'سلة التسوق', href: '/cart' }, { label: 'إتمام الطلب' }]} />
        <Reveal className="mt-4 mb-8 rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-extrabold text-navy lg:text-3xl">إتمام الطلب</h1>
          <p className="mt-2 text-sm text-muted-foreground">أكمل بيانات التوصيل والدفع في خطوات واضحة وآمنة.</p>
        </Reveal>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form sections */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact */}
            <Reveal className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-navy">معلومات التواصل</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="mb-1.5 block text-sm">الاسم الكامل *</Label>
                  <Input id="name" required placeholder="الاسم الكامل" className="h-11" />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-1.5 block text-sm">رقم الجوال *</Label>
                  <Input id="phone" required type="tel" placeholder="05xxxxxxxx" className="h-11" dir="ltr" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email" className="mb-1.5 block text-sm">البريد الإلكتروني *</Label>
                  <Input id="email" required type="email" placeholder="example@email.com" className="h-11" dir="ltr" />
                </div>
              </div>
            </Reveal>

            {/* Shipping */}
            <Reveal delay={70} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-navy">عنوان الشحن</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="city" className="mb-1.5 block text-sm">المدينة *</Label>
                  <select id="city" required className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option value="">اختر المدينة</option>
                    {saudiCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="district" className="mb-1.5 block text-sm">الحي *</Label>
                  <Input id="district" required placeholder="اسم الحي" className="h-11" />
                </div>
                <div>
                  <Label htmlFor="street" className="mb-1.5 block text-sm">الشارع *</Label>
                  <Input id="street" required placeholder="اسم الشارع" className="h-11" />
                </div>
                <div>
                  <Label htmlFor="building" className="mb-1.5 block text-sm">رقم المبنى *</Label>
                  <Input id="building" required placeholder="رقم المبنى" className="h-11" />
                </div>
                <div>
                  <Label htmlFor="postal" className="mb-1.5 block text-sm">الرمز البريدي</Label>
                  <Input id="postal" placeholder="الرمز البريدي" className="h-11" dir="ltr" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="notes" className="mb-1.5 block text-sm">ملاحظات إضافية</Label>
                  <Textarea id="notes" placeholder="أي تعليمات خاصة بالتوصيل..." className="min-h-[80px]" />
                </div>
              </div>
            </Reveal>

            {/* Delivery */}
            <Reveal delay={120} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-navy">طريقة التوصيل</h2>
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                <label className={cn('flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all', deliveryMethod === 'standard' ? 'border-primary bg-accent/40' : 'border-border')}>
                  <RadioGroupItem value="standard" />
                  <Truck className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-navy">توصيل عادي</p>
                    <p className="text-xs text-muted-foreground">٢-٥ أيام عمل</p>
                  </div>
                  <span className="text-sm font-bold text-navy">
                    {subtotal >= siteConfig.shipping.freeThreshold ? 'مجاني' : formatPrice(siteConfig.shipping.standardCost)}
                  </span>
                </label>
                <label className={cn('flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all', deliveryMethod === 'express' ? 'border-primary bg-accent/40' : 'border-border')}>
                  <RadioGroupItem value="express" />
                  <Truck className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-navy">توصيل سريع</p>
                    <p className="text-xs text-muted-foreground">١-٢ يوم عمل</p>
                  </div>
                  <span className="text-sm font-bold text-navy">{formatPrice(45)}</span>
                </label>
              </RadioGroup>
            </Reveal>

            {/* Payment */}
            <Reveal delay={170} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-navy">طريقة الدفع</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <label className={cn('flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all', paymentMethod === 'mada' ? 'border-primary bg-accent/40' : 'border-border')}>
                  <RadioGroupItem value="mada" />
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-sm font-bold text-navy">مدى</span>
                </label>
                <label className={cn('flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all', paymentMethod === 'credit' ? 'border-primary bg-accent/40' : 'border-border')}>
                  <RadioGroupItem value="credit" />
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-sm font-bold text-navy">بطاقة ائتمانية</span>
                </label>
                <label className={cn('flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all', paymentMethod === 'apple-pay' ? 'border-primary bg-accent/40' : 'border-border')}>
                  <RadioGroupItem value="apple-pay" />
                  <Wallet className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-sm font-bold text-navy">Apple Pay</span>
                </label>
                <label className={cn('flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all', paymentMethod === 'cod' ? 'border-primary bg-accent/40' : 'border-border')}>
                  <RadioGroupItem value="cod" />
                  <Banknote className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-sm font-bold text-navy">الدفع عند الاستلام</span>
                </label>
              </RadioGroup>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                جميع المعاملات مشفرة وآمنة
              </p>
            </Reveal>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Reveal animation="fadeIn" className="sticky top-24 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-navy">ملخص الطلب</h2>
              <div className="mb-4 max-h-48 space-y-3 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={`${item.productId}-${idx}`} className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.nameAr} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-medium text-navy">{item.nameAr}</p>
                      <p className="text-xs text-muted-foreground">الكمية: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-navy">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span className="font-medium text-navy">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الشحن</span>
                  <span className="font-medium text-navy">{shipping === 0 ? 'مجاني' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base">
                  <span className="font-bold text-navy">الإجمالي</span>
                  <span className="font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              <Button type="submit" size="lg" className="mt-5 w-full">
                تأكيد الطلب
              </Button>
            </Reveal>
          </div>
        </form>
      </div>
    </div>
  );
}
