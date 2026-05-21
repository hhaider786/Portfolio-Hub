"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: number;
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
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number, size: string) => void;
  updateQty: (id: number, size: string, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id && i.size === newItem.size);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.size === newItem.size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: number, size: string) =>
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));

  const updateQty = (id: number, size: string, qty: number) => {
    if (qty <= 0) { removeItem(id, size); return; }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity: qty } : i))
    );
  };

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, isOpen,
      addItem, removeItem, updateQty,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
