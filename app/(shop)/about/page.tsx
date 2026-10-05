import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Truck, Sparkles, ShieldCheck, Headphones, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'من نحن',
  description: 'تعرف على قصة زهرة ريحانة وعطورها السعودية الأصلية',
};

const values = [
  { icon: BadgeCheck, title: 'عطور أصلية', desc: 'نختار كل عطر بعناية لضمان جودة موثوقة وثبات أنيق' },
  { icon: Sparkles, title: 'هوية سعودية', desc: 'روائح مستوحاة من العود والمسك وورد الطائف والعنبر' },
  { icon: Truck, title: 'توصيل سريع', desc: 'نوصل طلبك إلى جميع مناطق المملكة بكفاءة وسرعة' },
  { icon: ShieldCheck, title: 'دفع آمن', desc: 'حماية كاملة لبياناتك ومعاملاتك المالية' },
  { icon: Headphones, title: 'دعم متواصل', desc: 'فريق خدمة عملاء جاهز لمساعدتك قبل وبعد الطلب' },
  { icon: MapPin, title: 'صناعة سعودية', desc: 'صناعة سعودية بروح فاخرة ولمسة إهداء راقية' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-surface py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'الرئيسية', href: '/' }, { label: 'من نحن' }]} />
          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="mb-4 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-primary" />
                <span className="text-sm font-medium text-primary">من نحن</span>
              </div>
              <h1 className="text-3xl font-extrabold leading-tight text-navy lg:text-5xl">
                {siteConfig.storeName} لعطور سعودية أصلية
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
                بدأنا برؤية واضحة: تقديم عطور فاخرة تعبر عن الهوية السعودية، وتجمع بين عمق العود ونعومة المسك ورقة ورد الطائف ودفء العنبر والزعفران.
              </p>
              <p className="mt-4 text-sm font-semibold text-navy">
                Made with <span className="text-red-500">❤</span> in Saudi Arabia
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/products">
                  تصفح العطور
                  <ArrowLeft className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
            <Reveal animation="zoomIn" delay={120} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--soft-shadow)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/image/5.png"
                alt="مجموعة عطور زهرة ريحانة"
                className="h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-navy lg:text-3xl">قيمنا التي نؤمن بها</h2>
            <p className="mt-2 text-sm text-muted-foreground">منتجات أصلية، صناعة سعودية، وتجربة إهداء فاخرة</p>
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

      <section className="bg-surface py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-navy lg:text-3xl">قصتنا</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
              نؤمن بأن العطر ليس مجرد منتج، بل أثر وهوية وذكرى. لذلك ننتقي عطور زهرة ريحانة بعناية لتكون أنيقة في حضورها، واضحة في جودتها، ومتصلة بجمال الروائح السعودية الأصيلة.
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
