import 'animate.css/animate.min.css';
import './globals.css';
import type { Metadata } from 'next';
import { Cairo, Tajawal } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { Toaster } from 'sonner';
import { siteConfig } from '@/config/site';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anaqa-store.sa'),
  title: {
    default: `${siteConfig.storeName} | ${siteConfig.taglineAr}`,
    template: `%s | ${siteConfig.storeName}`,
  },
  description: siteConfig.taglineAr,
  openGraph: {
    title: siteConfig.storeName,
    description: siteConfig.taglineAr,
    type: 'website',
    locale: 'ar_SA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} ${tajawal.variable} font-sans antialiased`}>
        <CartProvider>
          <WishlistProvider>
            {children}
            <Toaster
              position="top-center"
              dir="rtl"
              richColors
              closeButton
              toastOptions={{
                style: {
                  fontFamily: 'var(--font-cairo), sans-serif',
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
