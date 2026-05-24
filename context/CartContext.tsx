"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAnnounce } from "@/lib/a11y";

export type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: number, size: string) => void;
  updateQty: (id: number, size: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "maison.cart.v1";

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is CartItem =>
        x &&
        typeof x.id === "number" &&
        typeof x.size === "string" &&
        typeof x.quantity === "number" &&
        x.quantity > 0
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const announce = useAnnounce();

  useEffect(() => {
    setItems(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* quota exceeded — ignore */
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === newItem.id && i.size === newItem.size);
        if (existing) {
          return prev.map((i) =>
            i.id === newItem.id && i.size === newItem.size ? { ...i, quantity: i.quantity + qty } : i
          );
        }
        return [...prev, { ...newItem, quantity: qty }];
      });
      setIsOpen(true);
      announce(`${newItem.name} added to bag`, "polite");
    },
    [announce]
  );

  const removeItem = useCallback((id: number, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const updateQty = useCallback(
    (id: number, size: string, qty: number) => {
      if (qty <= 0) {
        removeItem(id, size);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity: qty } : i))
      );
    },
    [removeItem]
  );

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextType>(() => {
    const totalItems = items.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return {
      items,
      isOpen,
      hydrated,
      addItem,
      removeItem,
      updateQty,
      clear,
      openCart,
      closeCart,
      totalItems,
      totalPrice,
    };
  }, [items, isOpen, hydrated, addItem, removeItem, updateQty, clear, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
