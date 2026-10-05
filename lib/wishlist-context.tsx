'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

interface WishlistContextType {
  ids: string[];
  count: number;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
  hydrated: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = 'anaqa-wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setIds(JSON.parse(stored));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids, hydrated]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        toast.info('تم حذف المنتج من المفضلة');
        return prev.filter((x) => x !== id);
      }
      toast.success('تمت إضافة المنتج إلى المفضلة');
      return [...prev, id];
    });
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
    toast.info('تم حذف المنتج من المفضلة');
  }, []);

  return (
    <WishlistContext.Provider value={{ ids, count: ids.length, toggle, has, remove, hydrated }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
