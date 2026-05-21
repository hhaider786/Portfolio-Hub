"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[650px] flex items-end overflow-hidden pt-20">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=90')",
          backgroundColor: "#d0c8c0",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111]/70 via-[#111]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-28">
        <motion.p
          className="section-label text-white/70 mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Spring / Summer Collection
        </motion.p>

        <motion.h1
          className="text-white text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6 max-w-2xl"
          style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          The New
          <br />
          <em>Season Edit.</em>
        </motion.h1>

        <motion.p
          className="text-white/75 text-base max-w-md mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Effortless pieces for the modern wardrobe. Crafted from the finest materials,
          designed to transcend seasons.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <a
            href="#products"
            className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium bg-white text-[#111] hover:bg-[#f0f0f0] transition-colors"
          >
            Shop the Collection
          </a>
          <a
            href="#categories"
            className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium border border-white text-white hover:bg-white/10 transition-colors"
          >
            Explore Categories
          </a>
        </motion.div>
      </div>

      {/* Brand strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#111]/40 backdrop-blur-sm overflow-hidden py-3">
        <div className="marquee-track whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-white/30 text-[0.6rem] tracking-[0.4em] uppercase mx-8">
              Free Shipping Over £100 &nbsp;·&nbsp; New Arrivals Every Week &nbsp;·&nbsp; Sustainably Sourced &nbsp;·&nbsp; Returns Within 30 Days
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
