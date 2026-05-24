"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { MagneticButton } from "@/lib/motion/MagneticButton";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVariant = {
  hidden: { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function CartView() {
  const { items, removeItem, updateQty, totalPrice, hydrated } = useCart();

  if (!hydrated) return <div className="py-20 text-center text-[#888]">Loading…</div>;

  if (items.length === 0) {
    return (
      <motion.div
        className="border border-[#f0f0f0] py-24 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <ShoppingBag size={42} className="mx-auto text-[#ddd] mb-4" aria-hidden />
        <p className="text-[#666] mb-6">Your bag is empty.</p>
        <Link href="/ecommerce" className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase bg-[#111] text-white hover:bg-[#333] transition-colors">
          Continue shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
      <motion.ul
        className="lg:col-span-2 divide-y divide-[#f0f0f0]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {items.map((item) => (
            <motion.li
              key={`${item.id}-${item.size}`}
              className="flex gap-5 py-6"
              variants={itemVariant}
              layout
              exit={{ opacity: 0, x: -20, height: 0, paddingTop: 0, paddingBottom: 0, overflow: "hidden" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="relative w-28 h-36 flex-shrink-0 bg-[#f5f5f5] overflow-hidden">
                <ImageWithBlur src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-lg text-[#111]" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
                    <Link href={`/ecommerce/products/${item.slug}`} className="hover:underline">{item.name}</Link>
                  </h2>
                  <button type="button" onClick={() => removeItem(item.id, item.size)} aria-label={`Remove ${item.name}`} className="text-[#aaa] hover:text-[#111]">
                    <X size={15} aria-hidden />
                  </button>
                </div>
                <p className="text-[0.65rem] tracking-wider text-[#666] uppercase mt-1">{item.color} · Size {item.size}</p>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center border border-[#e0e0e0]" role="group" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" onClick={() => updateQty(item.id, item.size, item.quantity - 1)} aria-label="Decrease" className="px-3 py-2 text-[#555] hover:text-[#111]">
                      <Minus size={11} aria-hidden />
                    </button>
                    <span className="px-3 text-sm text-[#111] border-x border-[#e0e0e0]">{item.quantity}</span>
                    <button type="button" onClick={() => updateQty(item.id, item.size, item.quantity + 1)} aria-label="Increase" className="px-3 py-2 text-[#555] hover:text-[#111]">
                      <Plus size={11} aria-hidden />
                    </button>
                  </div>
                  <span className="text-base font-medium text-[#111]">£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <motion.aside
        className="border border-[#f0f0f0] p-6 h-fit lg:sticky lg:top-28 rounded-2xl"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <h2 className="text-[0.7rem] tracking-[0.2em] uppercase text-[#111] mb-5">Order summary</h2>
        <dl className="space-y-2 text-sm text-[#444]">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>£{totalPrice.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{totalPrice >= 100 ? "Free" : "£8.00"}</dd></div>
          <div className="flex justify-between"><dt>Estimated tax</dt><dd>£{(totalPrice * 0.2).toFixed(2)}</dd></div>
        </dl>
        <div className="flex justify-between text-base font-medium text-[#111] border-t border-[#f0f0f0] mt-5 pt-5">
          <span>Total</span>
          <span>£{(totalPrice + (totalPrice >= 100 ? 0 : 8) + totalPrice * 0.2).toFixed(2)}</span>
        </div>
        <MagneticButton
          as="a"
          href="/ecommerce/checkout"
          pull={12}
          className="block w-full bg-[#111] text-white py-4 mt-6 text-xs tracking-[0.2em] uppercase text-center hover:bg-[#333] transition-colors"
        >
          Proceed to checkout
        </MagneticButton>
        <Link href="/ecommerce" className="block text-center mt-3 text-xs tracking-wider underline text-[#666] hover:text-[#111]">
          Continue shopping
        </Link>
      </motion.aside>
    </div>
  );
}
