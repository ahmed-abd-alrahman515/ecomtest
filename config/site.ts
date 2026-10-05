import { NavItem } from '@/types';

export const siteConfig = {
  storeName: 'متجر أناقة',
  storeNameEn: 'Anaqa Store',
  taglineAr: 'منتجات مختارة بعناية لتجربة تسوّق أفضل',
  taglineEn: 'Curated products for a better shopping experience',
  logo: '/logo.svg',
  currency: {
    code: 'SAR',
    symbolAr: 'ر.س',
    symbolEn: 'SAR',
  },
  contact: {
    phone: '+966 11 234 5678',
    phoneDisplay: '+966 11 234 5678',
    email: 'support@anaqa-store.sa',
    whatsapp: '+966 55 123 4567',
    hoursAr: 'يومياً من 9 صباحاً حتى 11 مساءً',
    hoursEn: 'Daily from 9 AM to 11 PM',
  },
  address: {
    cityAr: 'الرياض',
    cityEn: 'Riyadh',
    streetAr: 'حي العليا، طريق الملك فهد',
    streetEn: 'Al Olaya District, King Fahd Road',
  },
  shipping: {
    freeThreshold: 200,
    standardCost: 25,
    estimatedDaysAr: '٢-٥ أيام عمل',
  },
  social: {
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    snapchat: 'https://snapchat.com',
  },
  paymentMethods: ['mada', 'visa', 'mastercard', 'apple-pay'],
} as const;

export const navigation: NavItem[] = [
  { labelAr: 'الرئيسية', labelEn: 'Home', href: '/' },
  { labelAr: 'المتجر', labelEn: 'Shop', href: '/products' },
  { labelAr: 'التصنيفات', labelEn: 'Categories', href: '/categories' },
  { labelAr: 'من نحن', labelEn: 'About', href: '/about' },
  { labelAr: 'خدماتنا', labelEn: 'Services', href: '/services' },
  { labelAr: 'تواصل معنا', labelEn: 'Contact', href: '/contact' },
];

export const footerLinks = {
  store: [
    { labelAr: 'الرئيسية', labelEn: 'Home', href: '/' },
    { labelAr: 'المتجر', labelEn: 'Shop', href: '/products' },
    { labelAr: 'التصنيفات', labelEn: 'Categories', href: '/categories' },
    { labelAr: 'من نحن', labelEn: 'About', href: '/about' },
    { labelAr: 'تواصل معنا', labelEn: 'Contact', href: '/contact' },
  ],
  customer: [
    { labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ', href: '/services#faq' },
    { labelAr: 'الشحن والتوصيل', labelEn: 'Shipping', href: '/services#shipping' },
    { labelAr: 'الاستبدال والاسترجاع', labelEn: 'Returns', href: '/services#returns' },
    { labelAr: 'سياسة الخصوصية', labelEn: 'Privacy Policy', href: '/services#privacy' },
    { labelAr: 'الشروط والأحكام', labelEn: 'Terms', href: '/services#terms' },
  ],
};
