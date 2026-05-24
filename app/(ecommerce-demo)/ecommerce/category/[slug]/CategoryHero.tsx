"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { Tilt3D } from "@/lib/motion/Tilt3D";
import { MaskedText } from "@/lib/motion/MaskedText";

interface Category {
  name: string;
  slug: string;
  tagline: string;
  image: string;
}

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

export function CategoryHero({ cat, items }: { cat: Category; items: Product[] }) {
  return (
    <>
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <ImageWithBlur src={cat.image} alt="" fill priority sizes="100vw" className="object-cover" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/70 via-[#111]/20 to-[#111]/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            className="text-[0.65rem] tracking-[0.3em] uppercase text-white/80 mb-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {cat.tagline}
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-light text-white" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
            <MaskedText delay={0.4} stagger={0.07} duration={1}>{cat.name}</MaskedText>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.p
          className="text-[#666] mb-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {items.length} {items.length === 1 ? "piece" : "pieces"}
        </motion.p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-[#666]" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>Nothing here just yet.</p>
            <Link href="/ecommerce" className="inline-block mt-4 text-xs tracking-wider underline text-[#111]">Browse all</Link>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {items.map((p) => (
              <motion.div key={p.id} variants={cardVariant}>
                <Link href={`/ecommerce/products/${p.slug}`} className="group block">
                  <Tilt3D max={5} className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden mb-3 rounded-xl">
                    <ImageWithBlur src={p.image} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Tilt3D>
                  <p className="text-[0.65rem] tracking-[0.15em] uppercase text-[#666] mb-0.5">{p.category}</p>
                  <h2 className="text-sm text-[#111] mb-1" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif", fontSize: "1.05rem" }}>{p.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#111]">£{p.price}</span>
                    {p.originalPrice && <span className="text-sm text-[#888] line-through">£{p.originalPrice}</span>}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
