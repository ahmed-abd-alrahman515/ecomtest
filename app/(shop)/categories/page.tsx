import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { CategoryCard } from '@/components/shared/category-card';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { Reveal } from '@/components/shared/reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'التصنيفات',
  description: 'تصفّح جميع تصنيفات منتجاتنا المختارة',
};

export default function CategoriesPage() {
  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'التصنيفات' },
          ]}
        />
        <Reveal className="mt-4 mb-10 rounded-2xl border border-border bg-white p-6 shadow-sm lg:p-8">
          <h1 className="text-3xl font-extrabold text-navy lg:text-4xl">جميع التصنيفات</h1>
          <p className="mt-3 text-sm text-muted-foreground lg:text-base">اختر التصنيف الذي يناسب احتياجك</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-3">
          {categories.map((cat, index) => {
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <Reveal key={cat.id} delay={index * 70}>
                <CategoryCard
                  category={cat}
                  productCount={count}
                  variant="editorial"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
