"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { WebGLHero } from "@/lib/motion/WebGLHero";
import { MaskedText } from "@/lib/motion/MaskedText";
import { MagneticButton } from "@/lib/motion/MagneticButton";

const HERO_IMG = "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[650px] flex items-end overflow-hidden pt-20 bg-[#0a0a0a]">
      <ImageWithBlur src={HERO_IMG} alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover object-center" />
      <WebGLHero palette="warm" speed={0.6} intensity={1.1} className="absolute inset-0 mix-blend-soft-light opacity-60" fallbackImage={HERO_IMG} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111]/75 via-[#111]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111]/70 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-28">
        <motion.p
          className="section-label text-white/80 mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Spring / Summer Collection
        </motion.p>

        <h1
          className="text-white text-5xl md:text-7xl lg:text-8xl font-light leading-[1.02] mb-6 max-w-2xl"
          style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
        >
          <MaskedText delay={0.1} stagger={0.08} duration={1}>The New</MaskedText>
          <br />
          <em><MaskedText delay={0.35} stagger={0.08} duration={1}>Season Edit.</MaskedText></em>
        </h1>

        <motion.p
          className="text-white/80 text-base max-w-md mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          Effortless pieces for the modern wardrobe. Crafted from the finest materials, designed to transcend seasons.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <MagneticButton as="a" href="#products" className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium bg-white text-[#111] hover:bg-[#f0f0f0] transition-colors">
            Shop the Collection
          </MagneticButton>
          <Link
            href="#categories"
            className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium border border-white text-white hover:bg-white/10 transition-colors text-center"
          >
            Explore Categories
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#111]/40 backdrop-blur-sm overflow-hidden py-3 marquee-wrapper">
        <div className="marquee-track whitespace-nowrap" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-white/40 text-[0.6rem] tracking-[0.4em] uppercase mx-8">
              Free Shipping Over £100 &nbsp;·&nbsp; New Arrivals Every Week &nbsp;·&nbsp; Sustainably Sourced &nbsp;·&nbsp; Returns Within 30 Days
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
