"use client";

import { memo, useCallback, useMemo, useState, useTransition, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { products, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { Tilt3D } from "@/lib/motion/Tilt3D";
import { useCoarsePointer } from "@/lib/motion/useReducedMotion";

type FilterState = { category: string; maxPrice: number; badge: string; sortBy: string };
const DEFAULT_FILTERS: FilterState = { category: "All", maxPrice: 500, badge: "All", sortBy: "featured" };

const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCart();
  const coarse = useCoarsePointer();

  const panelVisible = coarse ? quickOpen : hovered;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: product.colors[0],
    });
    if (coarse) setQuickOpen(false);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((w) => !w);
  };

  const onSize = (e: React.MouseEvent, s: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(s);
  };

  return (
    <div className="group relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link href={`/ecommerce/products/${product.slug}`} aria-label={`View ${product.name}, £${product.price}`}>
        <Tilt3D max={5} className="relative overflow-hidden bg-[#f5f5f5] mb-3 aspect-[3/4]">
          <ImageWithBlur
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-opacity duration-500"
            style={{ opacity: panelVisible ? 0 : 1 } as React.CSSProperties}
          />
          <ImageWithBlur
            src={product.hoverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-opacity duration-500"
            style={{ opacity: panelVisible ? 1 : 0 }}
            aria-hidden
          />

          {product.badge && (
            <div className={`absolute top-3 left-3 px-2 py-0.5 text-[0.6rem] tracking-[0.15em] uppercase font-medium z-10 ${
              product.badge === "Sale" ? "bg-red-500 text-white" :
              product.badge === "New" ? "bg-[#111] text-white" : "bg-[#8a6a25] text-white"
            }`}>
              {product.badge === "Sale" && product.originalPrice
                ? `-${Math.round((1 - product.price / product.originalPrice) * 100)}%`
                : product.badge}
            </div>
          )}

          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            className={`absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center focus-visible:opacity-100 transition-opacity duration-200 hover:bg-white z-10 ${
              coarse ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <Heart size={14} fill={wishlisted ? "#111" : "none"} className="text-[#111]" />
          </button>

          {/* Touch quick-add trigger — visible on touch devices when panel is closed */}
          {coarse && !quickOpen && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickOpen(true); }}
              aria-label={`Quick add ${product.name}`}
              className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center z-10 shadow-sm"
            >
              <ShoppingBag size={15} className="text-[#111]" aria-hidden />
            </button>
          )}

          <AnimatePresence>
            {panelVisible && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 z-10"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="relative bg-white px-3 pt-3 pb-1 flex gap-1.5 justify-center flex-wrap" role="radiogroup" aria-label={`Size for ${product.name}`}>
                  {coarse && (
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickOpen(false); }}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-[#888]"
                      aria-label="Close size picker"
                    >
                      <X size={12} aria-hidden />
                    </button>
                  )}
                  {product.sizes.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={(e) => onSize(e, s)}
                      role="radio"
                      aria-checked={selectedSize === s}
                      className={`text-[0.6rem] tracking-wider px-2 py-1 border transition-colors ${
                        selectedSize === s ? "border-[#111] bg-[#111] text-white" : "border-[#ddd] text-[#555] hover:border-[#111]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  aria-label={`Add ${product.name} size ${selectedSize} to bag`}
                  className="w-full bg-[#111] text-white text-[0.65rem] tracking-[0.2em] uppercase py-3 hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={13} aria-hidden />
                  Add to Bag
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Tilt3D>

        <div>
          <p className="text-[0.65rem] tracking-[0.15em] uppercase text-[#666] mb-0.5">{product.category}</p>
          <h3 className="text-sm text-[#111] mb-1" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif", fontSize: "1.05rem" }}>
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#111]">£{product.price}</span>
            {product.originalPrice && <span className="text-sm text-[#888] line-through">£{product.originalPrice}</span>}
          </div>
          <div className="flex gap-1.5 mt-1.5">
            {product.colors.map((c) => (
              <span key={c} className="text-[0.6rem] tracking-wider text-[#666] capitalize">{c}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
});

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-xs tracking-wider px-3 py-1.5 border transition-colors ${
        active ? "border-[#111] bg-[#111] text-white" : "border-[#ddd] text-[#555] hover:border-[#111]"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProductGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const filters: FilterState = useMemo(() => ({
    category: searchParams.get("category") ?? DEFAULT_FILTERS.category,
    maxPrice: Number(searchParams.get("maxPrice") ?? DEFAULT_FILTERS.maxPrice),
    badge: searchParams.get("badge") ?? DEFAULT_FILTERS.badge,
    sortBy: searchParams.get("sort") ?? DEFAULT_FILTERS.sortBy,
  }), [searchParams]);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const setFilter = useCallback((patch: Partial<FilterState>) => {
    const next = { ...filters, ...patch };
    const params = new URLSearchParams();
    if (next.category !== DEFAULT_FILTERS.category) params.set("category", next.category);
    if (next.maxPrice !== DEFAULT_FILTERS.maxPrice) params.set("maxPrice", String(next.maxPrice));
    if (next.badge !== DEFAULT_FILTERS.badge) params.set("badge", next.badge);
    if (next.sortBy !== DEFAULT_FILTERS.sortBy) params.set("sort", next.sortBy);
    startTransition(() => {
      router.replace(`/ecommerce?${params.toString()}#products`, { scroll: false });
    });
  }, [filters, router]);

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        if (filters.category !== "All" && p.category !== filters.category) return false;
        if (p.price > filters.maxPrice) return false;
        if (filters.badge !== "All" && p.badge !== filters.badge) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [filters]);

  const clearFilters = () => {
    startTransition(() => router.replace("/ecommerce#products", { scroll: false }));
  };

  return (
    <section id="products" className="py-16 px-6 bg-[#fafafa] section-cv">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <p className="section-label mb-1">All Products</p>
            <h2 className="text-2xl sm:text-3xl font-light text-[#111]" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
              The Edit — {filtered.length} pieces
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="sr-only">Sort products</label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) => setFilter({ sortBy: e.target.value })}
              className="flex-1 sm:flex-none text-xs tracking-wider border border-[#e0e0e0] bg-white text-[#555] px-3 py-2 focus:outline-none focus:border-[#111]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low–High</option>
              <option value="price-desc">Price: High–Low</option>
            </select>
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
              className="flex items-center gap-2 text-xs tracking-wider border border-[#e0e0e0] bg-white px-3 py-2 hover:border-[#111] transition-colors"
            >
              <SlidersHorizontal size={13} aria-hidden />
              Filter
            </button>
          </div>
        </div>

        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              className="bg-white border border-[#e0e0e0] p-5 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <fieldset>
                <legend className="section-label mb-3">Category</legend>
                <div className="flex flex-wrap gap-2">
                  {["All", "Women", "Men", "Accessories"].map((c) => (
                    <FilterPill key={c} active={filters.category === c} onClick={() => setFilter({ category: c })}>{c}</FilterPill>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="max-price" className="section-label mb-3 block">Max Price: £{filters.maxPrice}</label>
                <input id="max-price" type="range" min={50} max={500} step={25} value={filters.maxPrice} onChange={(e) => setFilter({ maxPrice: Number(e.target.value) })} className="w-full accent-[#111]" />
              </div>
              <fieldset>
                <legend className="section-label mb-3">Filter by</legend>
                <div className="flex flex-wrap gap-2">
                  {["All", "New", "Bestseller", "Sale"].map((b) => (
                    <FilterPill key={b} active={filters.badge === b} onClick={() => setFilter({ badge: b })}>{b}</FilterPill>
                  ))}
                </div>
              </fieldset>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-10" layout>
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
          <div className="text-center py-20 text-[#666]">
            <p className="text-lg" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>No items match your filters.</p>
            <button type="button" onClick={clearFilters} className="mt-4 text-xs tracking-wider underline text-[#111]">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
