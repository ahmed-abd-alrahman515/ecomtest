import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Truck, RefreshCw, Headphones, Gift, ShieldCheck, Package } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'خدماتنا',
  description: 'تعرف على خدمات زهرة ريحانة للعطور: الشحن، التغليف الفاخر، الدعم، والدفع الآمن',
};

const services = [
  {
    id: 'shipping',
    icon: Truck,
    title: 'الشحن والتوصيل',
    desc: 'نوفر توصيلا سريعا وموثوقا لعطور زهرة ريحانة إلى جميع مناطق المملكة العربية السعودية. الطلبات فوق 200 ر.س تشحن مجانا.',
    features: ['توصيل لجميع مناطق المملكة', 'شحن مجاني للطلبات فوق 200 ر.س', 'تتبع الطلب أونلاين', 'تغليف يحافظ على العطر'],
  },
  {
    id: 'returns',
    icon: RefreshCw,
    title: 'الاستبدال والاسترجاع',
    desc: 'يمكنك استبدال أو استرجاع العطر خلال 14 يوما من تاريخ الاستلام وفق حالة المنتج وسياسة المتجر.',
    features: ['14 يوما للاستبدال أو الاسترجاع', 'عملية بسيطة وسريعة', 'دعم خطوة بخطوة', 'متابعة واضحة للطلب'],
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'دعم العملاء',
    desc: 'فريق خدمة العملاء لدينا جاهز لمساعدتك في اختيار الرائحة المناسبة أو متابعة طلبك عبر الهاتف أو البريد أو واتساب.',
    features: ['استشارة عطرية', 'هاتف وبريد وواتساب', 'ردود سريعة', 'دعم قبل وبعد الشراء'],
  },
  {
    id: 'gift-wrapping',
    icon: Gift,
    title: 'تغليف الهدايا',
    desc: 'نوفر تغليفا فاخرا أخضر وذهبي يليق بعطور سعودية أصلية، مع بطاقة إهداء مناسبة للمناسبات الخاصة.',
    features: ['تغليف أنيق', 'بطاقة إهداء مخصصة', 'مناسب للمناسبات', 'لمسة فاخرة للإهداء'],
  },
  {
    id: 'payment',
    icon: ShieldCheck,
    title: 'الدفع الآمن',
    desc: 'نوفر خيارات دفع متعددة وآمنة. جميع المعاملات مشفرة بالكامل لحماية بياناتك.',
    features: ['مدى، Visa، Mastercard', 'Apple Pay', 'الدفع عند الاستلام', 'تشفير كامل للبيانات'],
  },
  {
    id: 'orders',
    icon: Package,
    title: 'طلبات العطور الخاصة',
    desc: 'للهدايا الكبيرة أو طلبات الشركات، نوفر حلولا مخصصة من عطور زهرة ريحانة مع تغليف فاخر ومتابعة خاصة.',
    features: ['حلول للطلبات الكبيرة', 'أسعار خاصة للكميات', 'استشارة مجانية', 'متابعة مخصصة'],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'خدماتنا' }]} />
        <Reveal className="mt-4 mb-10 rounded-2xl border border-border bg-white p-6 shadow-sm lg:p-8">
          <h1 className="text-2xl font-extrabold text-navy lg:text-3xl">خدماتنا</h1>
          <p className="mt-2 text-sm text-muted-foreground">كل ما نقدمه لتصل عطورك الأصلية بأمان وأناقة</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, index) => (
            <Reveal key={s.id} delay={index * 70} id={s.id} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[var(--card-shadow)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-navy">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 space-y-2">
                {s.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-navy">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
