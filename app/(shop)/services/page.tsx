import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Truck, RefreshCw, Headphones, Gift, ShieldCheck, Package } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'خدماتنا',
  description: 'تعرّف على خدماتنا: الشحن، الاستبدال والاسترجاع، دعم العملاء، والمزيد',
};

const services = [
  {
    id: 'shipping',
    icon: Truck,
    title: 'الشحن والتوصيل',
    desc: 'نوفّر توصيلاً سريعاً وموثوقاً لجميع مناطق المملكة العربية السعودية. الطلبات فوق 200 ر.س تشحن مجاناً. مدة التوصيل المعتادة من ٢ إلى ٥ أيام عمل.',
    features: ['توصيل لجميع مناطق المملكة', 'شحن مجاني للطلبات فوق 200 ر.س', 'تتبع الطلب أونلاين', 'توصيل سريع متاح'],
  },
  {
    id: 'returns',
    icon: RefreshCw,
    title: 'الاستبدال والاسترجاع',
    desc: 'راضٍ عن عملية الشراء أو لا، يمكنك استبدال أو استرجاع المنتج خلال ١٤ يوماً من تاريخ الاستلام. نسهّل عليك العملية خطوة بخطوة.',
    features: ['١٤ يوماً للاستبدال أو الاسترجاع', 'استرجاع المبلغ أو استبدال المنتج', 'عملية بسيطة وسريعة', 'شحن الإرجاع مجاني'],
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'دعم العملاء',
    desc: 'فريق خدمة العملاء لدينا جاهز لمساعدتك في أي وقت. تواصل معنا عبر الهاتف، البريد الإلكتروني، أو واتساب.',
    features: ['دعم على مدار اليوم', 'هاتف وبريد وواتساب', 'ردود سريعة', 'فريق متخصص'],
  },
  {
    id: 'gifts',
    icon: Gift,
    title: 'تغليف الهدايا',
    desc: 'هل تشتري هدية؟ نوفّر خدمة تغليف هدايا أنيقة مع بطاقة إهداء مخصصة. اختر الخيار عند إتمام الطلب.',
    features: ['تغليف أنيق ومجاني', 'بطاقة إهداء مخصصة', 'خيار عند إتمام الطلب', 'مناسب لكل المناسبات'],
  },
  {
    id: 'payment',
    icon: ShieldCheck,
    title: 'الدفع الآمن',
    desc: 'نوفّر خيارات دفع متعددة وآمنة. جميع المعاملات مشفرة بالكامل لحماية بياناتك.',
    features: ['مدى، Visa، Mastercard', 'Apple Pay', 'الدفع عند الاستلام', 'تشفير كامل للبيانات'],
  },
  {
    id: 'orders',
    icon: Package,
    title: 'الطلبات الخاصة',
    desc: 'للطلبات الكبيرة أو الخاصة، نوفّر حلولاً مخصصة تناسب احتياجك. تواصل معنا لمناقشة التفاصيل.',
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
          <p className="mt-2 text-sm text-muted-foreground">كل ما نقدمه لنجعل تجربتك أسهل وأكثر راحة</p>
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
