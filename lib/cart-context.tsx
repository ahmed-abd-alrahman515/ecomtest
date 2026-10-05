'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number, variantSelections?: Record<string, string>) => void;
  removeItem: (productId: string, variantSelections?: Record<string, string>) => void;
  updateQuantity: (productId: string, quantity: number, variantSelections?: Record<string, string>) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  hydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'anaqa-cart';
const itemKey = (item: { productId: string; variantSelections: Record<string, string> }) =>
  `${item.productId}-${JSON.stringify(item.variantSelections)}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, quantity = 1, variantSelections: Record<string, string> = {}) => {
      setItems((prev) => {
        const key = itemKey({ productId: product.id, variantSelections });
        const existing = prev.find(
          (i) => itemKey(i) === key
        );
        if (existing) {
          return prev.map((i) =>
            itemKey(i) === key ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            nameAr: product.nameAr,
            image: product.images[0],
            price: product.price,
            quantity,
            variantSelections,
          },
        ];
      });
      toast.success('تمت إضافة المنتج إلى السلة');
    },
    []
  );

  const removeItem = useCallback((productId: string, variantSelections: Record<string, string> = {}) => {
    const key = itemKey({ productId, variantSelections });
    setItems((prev) => prev.filter((i) => itemKey(i) !== key));
    toast.info('تم حذف المنتج من السلة');
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantSelections: Record<string, string> = {}) => {
      if (quantity < 1) return;
      const key = itemKey({ productId, variantSelections });
      setItems((prev) =>
        prev.map((i) => (itemKey(i) === key ? { ...i, quantity } : i))
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setCartOpen,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
