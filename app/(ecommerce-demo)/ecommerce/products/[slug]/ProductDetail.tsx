"use client";

import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { MagneticButton } from "@/lib/motion/MagneticButton";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.0 } },
};
const chipVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(
      { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, size, color },
      qty
    );
    setAdded(true);
  };

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#111] mb-2">Colour — <span className="text-[#666] capitalize">{color}</span></p>
        <motion.div
          className="flex gap-2"
          role="radiogroup"
          aria-label="Colour"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {product.colors.map((c) => (
            <motion.button
              type="button"
              key={c}
              role="radio"
              aria-checked={color === c}
              aria-label={c}
              onClick={() => setColor(c)}
              variants={chipVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 text-xs tracking-wider border transition-colors capitalize ${
                color === c ? "border-[#111] bg-[#111] text-white" : "border-[#ddd] text-[#555] hover:border-[#111]"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#111]">Size</p>
          <button type="button" className="text-[0.65rem] tracking-wider uppercase text-[#666] underline hover:text-[#111]">Size guide</button>
        </div>
        <motion.div
          className="grid grid-cols-5 gap-2"
          role="radiogroup"
          aria-label="Size"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {product.sizes.map((s) => (
            <motion.button
              type="button"
              key={s}
              role="radio"
              aria-checked={size === s}
              onClick={() => setSize(s)}
              variants={chipVariant}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`py-2.5 text-xs tracking-wider border transition-colors ${
                size === s ? "border-[#111] bg-[#111] text-white" : "border-[#ddd] text-[#555] hover:border-[#111]"
              }`}
            >
              {s}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border border-[#e0e0e0]" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="px-3 py-2.5 text-[#555] hover:text-[#111]">
            <Minus size={12} aria-hidden />
          </button>
          <span className="px-4 text-sm text-[#111] border-x border-[#e0e0e0]">{qty}</span>
          <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="px-3 py-2.5 text-[#555] hover:text-[#111]">
            <Plus size={12} aria-hidden />
          </button>
        </div>

        <div className="flex-1 relative">
          <MagneticButton
            type="button"
            pull={14}
            onClick={handleAdd}
            className="w-full bg-[#111] text-white py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} aria-hidden />
            {added ? "Added to bag ✓" : "Add to bag"}
          </MagneticButton>
          <AnimatePresence>
            {added && (
              <motion.span
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#111] tracking-wider whitespace-nowrap"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                role="status"
                aria-live="polite"
              >
                Added ✓
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <MagneticButton
          type="button"
          pull={8}
          onClick={() => setWishlisted((w) => !w)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="border border-[#e0e0e0] p-3.5 hover:border-[#111] transition-colors"
        >
          <motion.span
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Heart size={16} fill={wishlisted ? "#111" : "none"} className="text-[#111]" aria-hidden />
          </motion.span>
        </MagneticButton>
      </div>
    </div>
  );
}
