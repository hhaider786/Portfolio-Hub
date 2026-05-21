"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { products, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

type FilterState = { category: string; maxPrice: number; badge: string };

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: product.colors[0],
    });
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f5f5] mb-3" style={{ aspectRatio: "3/4" }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{ backgroundImage: `url('${product.hoverImage}')`, opacity: hovered ? 1 : 0 }}
        />

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 px-2 py-0.5 text-[0.6rem] tracking-[0.15em] uppercase font-medium ${
            product.badge === "Sale" ? "bg-red-500 text-white" :
            product.badge === "New" ? "bg-[#111] text-white" : "bg-[#d4a853] text-white"
          }`}>
            {product.badge === "Sale" && product.originalPrice
              ? `-${Math.round((1 - product.price / product.originalPrice) * 100)}%`
              : product.badge}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
        >
          <Heart size={14} fill={wishlisted ? "#111" : "none"} className="text-[#111]" />
        </button>

        {/* Quick add overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {/* Size selector */}
              <div className="bg-white px-3 pt-3 pb-1 flex gap-1.5 justify-center flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`text-[0.6rem] tracking-wider px-2 py-1 border transition-colors ${
                      selectedSize === s
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-[#ddd] text-[#555] hover:border-[#111]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-[#111] text-white text-[0.65rem] tracking-[0.2em] uppercase py-3 hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={13} />
                Add to Bag
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div>
        <p className="text-[0.65rem] tracking-[0.15em] uppercase text-[#888] mb-0.5">{product.category}</p>
        <h3 className="text-sm text-[#111] mb-1" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif", fontSize: "1.05rem" }}>
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#111]">£{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-[#aaa] line-through">£{product.originalPrice}</span>
          )}
        </div>
        {/* Color dots */}
        <div className="flex gap-1.5 mt-1.5">
          {product.colors.map((c) => (
            <span key={c} className="text-[0.6rem] tracking-wider text-[#888] capitalize">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [filters, setFilters] = useState<FilterState>({ category: "All", maxPrice: 500, badge: "All" });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const filtered = products
    .filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.badge !== "All" && p.badge !== filters.badge) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <section id="products" className="py-16 px-6 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-label mb-1">All Products</p>
            <h2
              className="text-3xl font-light text-[#111]"
              style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
            >
              The Edit — {filtered.length} pieces
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs tracking-wider border border-[#e0e0e0] bg-white text-[#555] px-3 py-2 focus:outline-none focus:border-[#111]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-xs tracking-wider border border-[#e0e0e0] bg-white px-3 py-2 hover:border-[#111] transition-colors"
            >
              <SlidersHorizontal size={13} />
              Filter
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              className="bg-white border border-[#e0e0e0] p-5 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div>
                <p className="section-label mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {["All", "Women", "Men", "Accessories"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilters((f) => ({ ...f, category: c }))}
                      className={`text-xs tracking-wider px-3 py-1.5 border transition-colors ${
                        filters.category === c
                          ? "border-[#111] bg-[#111] text-white"
                          : "border-[#ddd] text-[#555] hover:border-[#111]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="section-label mb-3">Max Price: £{filters.maxPrice}</p>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={25}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#111]"
                />
              </div>

              <div>
                <p className="section-label mb-3">Filter by</p>
                <div className="flex flex-wrap gap-2">
                  {["All", "New", "Bestseller", "Sale"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setFilters((f) => ({ ...f, badge: b }))}
                      className={`text-xs tracking-wider px-3 py-1.5 border transition-colors ${
                        filters.badge === b
                          ? "border-[#111] bg-[#111] text-white"
                          : "border-[#ddd] text-[#555] hover:border-[#111]"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-10"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#888]">
            <p className="text-lg" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>No items match your filters.</p>
            <button
              onClick={() => setFilters({ category: "All", maxPrice: 500, badge: "All" })}
              className="mt-4 text-xs tracking-wider underline text-[#111]"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
