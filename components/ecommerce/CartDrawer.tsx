"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FocusTrap } from "@/lib/a11y/FocusTrap";
import { useScrollLock } from "@/lib/a11y/useScrollLock";
import { useEscapeKey } from "@/lib/a11y/useEscapeKey";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice } = useCart();

  useScrollLock(isOpen);
  useEscapeKey(closeCart, isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} aria-hidden />

          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-heading"
          >
            <FocusTrap active className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
                <div>
                  <h2 id="cart-heading" className="text-xl font-medium text-[#111]" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
                    Your Bag
                  </h2>
                  <p className="text-[0.65rem] tracking-wider text-[#666] uppercase mt-0.5">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                </div>
                <button type="button" onClick={closeCart} aria-label="Close bag" className="text-[#666] hover:text-[#111] transition-colors">
                  <X size={20} aria-hidden />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <ShoppingBag size={40} className="text-[#ddd]" aria-hidden />
                    <p className="text-[#666] text-sm">Your bag is empty.</p>
                    <button type="button" onClick={closeCart} className="text-xs tracking-[0.15em] uppercase underline text-[#111] hover:text-[#555]">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-5" aria-label="Bag contents">
                    {items.map((item) => (
                      <motion.li
                        key={`${item.id}-${item.size}`}
                        layout
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        className="flex gap-4 pb-5 border-b border-[#f5f5f5]"
                      >
                        <div className="relative w-20 h-24 flex-shrink-0 bg-[#f5f5f5] overflow-hidden">
                          <ImageWithBlur src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-sm text-[#111] leading-snug" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif", fontSize: "1rem" }}>
                              <Link href={`/ecommerce/products/${item.slug}`} className="hover:underline" onClick={closeCart}>
                                {item.name}
                              </Link>
                            </h3>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id, item.size)}
                              aria-label={`Remove ${item.name} size ${item.size}`}
                              className="text-[#aaa] hover:text-[#111] transition-colors flex-shrink-0"
                            >
                              <X size={13} aria-hidden />
                            </button>
                          </div>
                          <p className="text-[0.65rem] tracking-wider text-[#666] uppercase mt-0.5">
                            {item.color} · Size {item.size}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-[#e0e0e0]" role="group" aria-label="Quantity">
                              <button type="button" onClick={() => updateQty(item.id, item.size, item.quantity - 1)} aria-label="Decrease" className="px-2.5 py-1.5 text-[#555] hover:text-[#111]">
                                <Minus size={11} aria-hidden />
                              </button>
                              <span className="px-3 text-sm text-[#111] border-x border-[#e0e0e0]">{item.quantity}</span>
                              <button type="button" onClick={() => updateQty(item.id, item.size, item.quantity + 1)} aria-label="Increase" className="px-2.5 py-1.5 text-[#555] hover:text-[#111]">
                                <Plus size={11} aria-hidden />
                              </button>
                            </div>
                            <span className="text-sm font-medium text-[#111]">£{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="px-6 py-5 border-t border-[#f0f0f0] space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#666]">Subtotal</span>
                    <span className="font-medium text-[#111]">£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[0.7rem] text-[#888]">
                    <span>Shipping calculated at checkout</span>
                    <span>Free over £100</span>
                  </div>
                  <Link
                    href="/ecommerce/checkout"
                    onClick={closeCart}
                    className="block w-full btn-dark py-4 text-xs tracking-[0.2em] uppercase font-medium text-center"
                  >
                    Proceed to Checkout
                  </Link>
                  <button type="button" onClick={closeCart} className="w-full btn-outline py-3 text-xs tracking-[0.2em] uppercase">
                    Continue Shopping
                  </button>
                </div>
              )}
            </FocusTrap>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
