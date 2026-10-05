import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { ProductDetail } from '@/components/products/product-detail';
import { RelatedProducts } from '@/components/products/related-products';
import { getProductBySlug, getRelatedProducts, products } from '@/data/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'المنتج غير موجود' };
  return {
    title: product.nameAr,
    description: product.shortDescriptionAr,
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <>
      <div className="pt-6">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'المتجر', href: '/products' },
              { label: product.nameAr },
            ]}
          />
        </div>
      </div>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <div className="container mx-auto px-4 pb-20 lg:pb-10">
          <RelatedProducts products={related} />
        </div>
      )}
    </>
  );
}
