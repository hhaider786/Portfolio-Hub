"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/products";

export default function Categories() {
  return (
    <section id="categories" className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-2">Shop by Category</p>
          <h2
            className="text-4xl md:text-5xl font-light text-[#111]"
            style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
          >
            Curated Collections
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href="#products"
              className="group relative overflow-hidden cursor-pointer block"
              style={{ aspectRatio: i < 2 ? "3/4" : "3/4" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
                style={{ backgroundImage: `url('${cat.image}')`, backgroundColor: "#ccc" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/70 via-[#111]/10 to-transparent group-hover:from-[#111]/80 transition-all duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                {cat.name === "Sale" && (
                  <span className="inline-block bg-red-500 text-white text-[0.6rem] tracking-[0.15em] uppercase px-2 py-0.5 mb-2">
                    {cat.tagline}
                  </span>
                )}
                {cat.name !== "Sale" && (
                  <p className="text-white/60 text-[0.65rem] tracking-[0.2em] uppercase mb-1">{cat.tagline}</p>
                )}
                <h3
                  className="text-white text-2xl font-medium"
                  style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
                >
                  {cat.name}
                </h3>
                <span className="inline-block mt-2 text-white/70 text-[0.65rem] tracking-[0.15em] uppercase group-hover:text-white transition-colors">
                  Shop Now →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
