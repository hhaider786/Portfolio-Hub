"use client";

import { useMemo, useState, useDeferredValue } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { Tilt3D } from "@/lib/motion/Tilt3D";

const POPULAR = ["silk dress", "wool blazer", "linen", "leather tote", "cashmere", "men"];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 36, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const pillVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function SearchView() {
  const [q, setQ] = useState("");
  const deferred = useDeferredValue(q);

  const results = useMemo(() => {
    const needle = deferred.trim().toLowerCase();
    if (!needle) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(needle) ||
      p.category.toLowerCase().includes(needle) ||
      p.description.toLowerCase().includes(needle) ||
      p.colors.some((c) => c.includes(needle))
    );
  }, [deferred]);

  return (
    <>
      <div className="relative max-w-2xl mb-10 ecommerce-input-wrap">
        <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] z-10" aria-hidden />
        <label htmlFor="search-input" className="sr-only">Search the edit</label>
        <input
          id="search-input"
          type="search"
          autoFocus
          placeholder={`Try “silk dress” or “cashmere”`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full border border-[#e0e0e0] bg-white pl-11 pr-4 py-4 text-base focus:outline-none focus:border-[#111]"
        />
      </div>

      <AnimatePresence mode="wait">
        {deferred.trim() === "" ? (
          <motion.div
            key="popular"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="section-label mb-4">Popular searches</p>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {POPULAR.map((term) => (
                <motion.button
                  type="button"
                  key={term}
                  variants={pillVariant}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setQ(term)}
                  className="px-4 py-2 text-xs tracking-wider border border-[#e0e0e0] hover:border-[#111] transition-colors"
                >
                  {term}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ) : results.length === 0 ? (
          <motion.p
            key="empty"
            className="text-[#666]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            No pieces match &ldquo;{deferred}&rdquo;.
          </motion.p>
        ) : (
          <motion.div
            key={deferred}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[#666] mb-6 text-sm" aria-live="polite">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              key={deferred}
            >
              {results.map((p) => (
                <motion.div key={p.id} variants={cardVariant}>
                  <Link href={`/ecommerce/products/${p.slug}`} className="group block">
                    <Tilt3D max={4} className="rounded-xl overflow-hidden mb-3">
                      <div className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden">
                        <ImageWithBlur src={p.image} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    </Tilt3D>
                    <h2 className="text-sm text-[#111]" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif", fontSize: "1.05rem" }}>{p.name}</h2>
                    <p className="text-sm font-medium text-[#111]">£{p.price}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
