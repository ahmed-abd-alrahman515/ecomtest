export type CategorySlug =
  | 'oriental-perfumes'
  | 'musk'
  | 'taif-rose'
  | 'oud'
  | 'amber-saffron'
  | 'luxury-gifts';

export interface Category {
  id: string;
  slug: CategorySlug;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
}

export type BadgeType = 'best-seller' | 'new' | 'sale' | 'limited';

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  images: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  badge?: BadgeType;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  variants: ProductVariant[];
  sku: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  nameAr: string;
  image: string;
  price: number;
  quantity: number;
  variantSelections: Record<string, string>;
}

export interface NavItem {
  labelAr: string;
  labelEn: string;
  href: string;
}
