import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { CategoryCatalog } from '@/components/products/category-catalog';
import { categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { Reveal } from '@/components/shared/reveal';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return { title: 'التصنيف غير موجود' };
  return {
    title: category.nameAr,
    description: category.descriptionAr,
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(params.slug);

  return (
    <div className="bg-surface/60 py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'التصنيفات', href: '/categories' },
            { label: category.nameAr },
          ]}
        />

        {/* Banner */}
        <Reveal className="relative mt-4 mb-8 overflow-hidden rounded-2xl bg-navy shadow-[var(--soft-shadow)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.image}
            alt={category.nameAr}
            className="h-48 w-full object-cover opacity-60 md:h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
          <div className="absolute bottom-0 right-0 p-6 text-white md:p-8">
            <h1 className="text-2xl font-extrabold lg:text-4xl">{category.nameAr}</h1>
            <p className="mt-2 max-w-lg text-sm text-white/80 md:text-base">
              {category.descriptionAr}
            </p>
            <p className="mt-2 text-xs text-white/60">{categoryProducts.length} منتج</p>
          </div>
        </Reveal>

        <CategoryCatalog initialProducts={categoryProducts} />
      </div>
    </div>
  );
}
