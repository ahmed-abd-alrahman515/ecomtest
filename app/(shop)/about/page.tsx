import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Truck, Sparkles, ShieldCheck, Headphones, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'من نحن',
  description: 'تعرّف على قصة متجرنا والتزامنا بتقديم تجربة تسوق متميزة',
};

const values = [
  { icon: BadgeCheck, title: 'جودة موثوقة', desc: 'نختار كل منتج بعناية لنضمن لك أعلى معايير الجودة' },
  { icon: Sparkles, title: 'تشكيلة متنوعة', desc: 'منتجات تناسب جميع الأذواق والاحتياجات في مكان واحد' },
  { icon: Truck, title: 'توصيل سريع', desc: 'نوصل طلبك إلى جميع مناطق المملكة بكفاءة وسرعة' },
  { icon: ShieldCheck, title: 'دفع آمن', desc: 'حماية كاملة لبياناتك ومعاملاتك المالية' },
  { icon: Headphones, title: 'دعم متواصل', desc: 'فريق خدمة عملاء جاهز لمساعدتك في أي وقت' },
  { icon: MapPin, title: 'صُنع للمملكة', desc: 'نفهم احتياجات السوق السعودي ونلبيها باحترافية' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="mb-4 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-primary" />
                <span className="text-sm font-medium text-primary">من نحن</span>
              </div>
              <h1 className="text-3xl font-extrabold leading-tight text-navy lg:text-5xl">
                نصنع تجربة تسوق تستحق وقتك
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
                بدأنا برؤية بسيطة: أن نجعل التسوق الإلكتروني في المملكة العربية السعودية أسهل وأكثر متعة. نجمع منتجات مختارة بعناية، ونقدّم تجربة سلسة من الاختيار حتى التوصيل.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/products">
                  تصفّح المنتجات
                  <ArrowLeft className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
            <Reveal animation="zoomIn" delay={120} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--soft-shadow)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/7195900/pexels-photo-7195900.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200"
                alt="من نحن"
                className="h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-navy lg:text-3xl">قيمنا التي نؤمن بها</h2>
            <p className="mt-2 text-sm text-muted-foreground">مبادئ توجّه كل قرار نتخذه</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 70} className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[var(--card-shadow)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-surface py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-navy lg:text-3xl">قصتنا</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
              نؤمن بأن التسوق يجب أن يكون تجربة ممتعة وليس مجرد معاملة. لذلك نحرص على انتقاء كل منتج في متجرنا، ونوفّر واجهة سهلة الاستخدام، وخدمة عملاء تستمع إليك. هدفنا أن نكون وجهتك الأولى للتسوق الإلكتروني في المملكة.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">تواصل معنا</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
