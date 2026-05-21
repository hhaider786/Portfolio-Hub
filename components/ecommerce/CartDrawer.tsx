"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
              <div>
                <h2
                  className="text-xl font-medium text-[#111]"
                  style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
                >
                  Your Bag
                </h2>
                <p className="text-[0.65rem] tracking-wider text-[#888] uppercase mt-0.5">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button onClick={closeCart} className="text-[#888] hover:text-[#111] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} className="text-[#ddd]" />
                  <p className="text-[#888] text-sm">Your bag is empty.</p>
                  <button
                    onClick={closeCart}
                    className="text-xs tracking-[0.15em] uppercase underline text-[#111] hover:text-[#555]"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      className="flex gap-4 pb-5 border-b border-[#f5f5f5]"
                    >
                      <div
                        className="w-20 h-24 flex-shrink-0 bg-cover bg-center bg-[#f5f5f5]"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4
                            className="text-sm text-[#111] leading-snug"
                            style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif", fontSize: "1rem" }}
                          >
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-[#bbb] hover:text-[#111] transition-colors flex-shrink-0"
                          >
                            <X size={13} />
                          </button>
                        </div>
                        <p className="text-[0.65rem] tracking-wider text-[#888] uppercase mt-0.5">
                          {item.color} · Size {item.size}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#e0e0e0]">
                            <button
                              onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                              className="px-2.5 py-1.5 text-[#555] hover:text-[#111] transition-colors"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="px-3 text-sm text-[#111] border-x border-[#e0e0e0]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                              className="px-2.5 py-1.5 text-[#555] hover:text-[#111] transition-colors"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-[#111]">
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#f0f0f0] space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#888]">Subtotal</span>
                  <span className="font-medium text-[#111]">£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[0.7rem] text-[#aaa]">
                  <span>Shipping calculated at checkout</span>
                  <span>Free over £100</span>
                </div>
                <button className="w-full btn-dark py-4 text-xs tracking-[0.2em] uppercase font-medium">
                  Proceed to Checkout
                </button>
                <button
                  onClick={closeCart}
                  className="w-full btn-outline py-3 text-xs tracking-[0.2em] uppercase"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
