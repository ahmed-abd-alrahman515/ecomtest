import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CategoryCard } from '@/components/shared/category-card';
import { Reveal } from '@/components/shared/reveal';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import type { CSSProperties } from 'react';

const visualOrder = ['oud', 'musk', 'taif-rose', 'amber-saffron', 'luxury-gifts', 'oriental-perfumes'];

export function CategoriesSection() {
  const orderedCategories = visualOrder
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter(Boolean) as typeof categories;
  const [featuredCategory, ...secondaryCategories] = orderedCategories;

  const productCount = (slug: string) =>
    products.filter((product) => product.category === slug).length;

  const animationStyle = (index: number) =>
    ({
      animationDelay: `${Math.min(index * 70, 300)}ms`,
      '--animate-duration': '580ms',
    } as CSSProperties);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="premium-container">
        <Reveal className="mb-9 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end lg:mb-10">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-navy lg:text-[42px]">
              <span className="text-primary">تسوق</span> حسب الرائحة
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground lg:text-base">
              استكشف مجموعات العود والمسك وورد الطائف والعنبر، بروائح سعودية أصلية مختارة بعناية.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5"
          >
            عرض الكل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:hidden">
          {orderedCategories.map((category, index) => {
            const featured = category.slug === featuredCategory?.slug;
            return (
              <CategoryCard
                key={category.id}
                category={category}
                productCount={productCount(category.slug)}
                variant={featured ? 'editorial' : 'default'}
                className={[
                  'animate__animated animate__fadeInUp',
                  featured ? 'col-span-2 aspect-[4/3] md:aspect-[16/9]' : 'aspect-square md:aspect-[4/3]',
                ].join(' ')}
                style={animationStyle(index)}
              />
            );
          })}
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-12 lg:grid-rows-[260px_260px]">
          {featuredCategory && (
            <CategoryCard
              category={featuredCategory}
              productCount={productCount(featuredCategory.slug)}
              variant="editorial"
              className="animate__animated animate__fadeInUp col-span-4 row-span-2 aspect-auto"
              style={animationStyle(0)}
            />
          )}

          <div className="col-span-8 grid min-h-0 grid-rows-[260px_260px] gap-5">
            <div className="grid min-h-0 grid-cols-2 gap-5">
              {secondaryCategories.slice(0, 2).map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  productCount={productCount(category.slug)}
                  className="animate__animated animate__fadeInUp aspect-auto"
                  style={animationStyle(index + 1)}
                />
              ))}
            </div>
            <div className="grid min-h-0 grid-cols-3 gap-5">
              {secondaryCategories.slice(2).map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  productCount={productCount(category.slug)}
                  className="animate__animated animate__fadeInUp aspect-auto"
                  style={animationStyle(index + 3)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
