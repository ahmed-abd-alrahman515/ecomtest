'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingCart, Menu, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { navigation, siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { SearchOverlay } from './search-overlay';
import { CartDrawer } from './cart-drawer';

export function Header() {
  const pathname = usePathname();
  const { itemCount, setCartOpen, hydrated: cartHydrated } = useCart();
  const { count, hydrated: wishHydrated } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Top bar */}
      <div className="hidden bg-navy text-white/90 md:block">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-xs">
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
            توصيل سريع لجميع مناطق المملكة
          </p>
          <div className="flex items-center gap-4">
            <span>رقم التواصل: {siteConfig.contact.phoneDisplay}</span>
            <span className="text-white/30">|</span>
            <button className="flex items-center gap-1 transition-colors hover:text-white">
              <Globe className="h-3.5 w-3.5" />
              العربية
            </button>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'animate__animated animate__fadeInDown sticky top-0 z-40 w-full border-b border-border bg-white/92 backdrop-blur-md transition-all duration-300',
          scrolled && 'border-primary/10 shadow-sm'
        )}
        style={{ '--animate-duration': '520ms' } as CSSProperties}
      >
        <div className={cn('container mx-auto flex h-16 items-center justify-between gap-4 px-4 transition-all duration-300 lg:h-20', scrolled && 'lg:h-[68px]')}>
          {/* Mobile menu */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="القائمة">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] overflow-y-auto p-0">
                <SheetTitle className="sr-only">القائمة</SheetTitle>
                <div className="flex h-16 items-center border-b px-4">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2" aria-label={siteConfig.storeName}>
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-sm">م</span>
                      <span className="font-bold text-navy">{siteConfig.storeName}</span>
                    </Link>
                  </SheetClose>
                </div>
                <nav className="flex flex-col p-2">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                          isActive(item.href)
                            ? 'bg-accent text-primary'
                            : 'text-navy hover:bg-accent'
                        )}
                      >
                        {item.labelAr}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-2 border-t p-4">
                  <SheetClose asChild>
                    <Link href="/wishlist" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-navy hover:bg-accent">
                      <span className="flex items-center gap-2"><Heart className="h-4 w-4" /> المفضلة</span>
                      {wishHydrated && count > 0 && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">{count}</span>
                      )}
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2" aria-label={siteConfig.storeName}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white font-extrabold text-lg shadow-sm transition-transform group-hover:-translate-y-0.5 lg:h-10 lg:w-10">
              م
            </span>
            <span className="hidden text-lg font-bold text-navy sm:block lg:text-xl">{siteConfig.storeName}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-navy/80 hover:bg-primary/5 hover:text-primary'
                )}
              >
                {item.labelAr}
                {isActive(item.href) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="بحث"
              onClick={() => setSearchOpen(true)}
              className="h-10 w-10 transition-transform hover:-translate-y-0.5"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/wishlist" className="relative hidden sm:inline-flex" aria-label="المفضلة">
              <Button variant="ghost" size="icon" className="h-10 w-10 transition-transform hover:-translate-y-0.5">
                <Heart className="h-5 w-5" />
              </Button>
              {wishHydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white transition-transform">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:-translate-y-0.5 hover:bg-accent"
              aria-label="سلة التسوق"
            >
              <ShoppingCart className="h-5 w-5 text-navy" />
              {cartHydrated && itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer />
    </>
  );
}
