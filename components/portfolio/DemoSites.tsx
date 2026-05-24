"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Tilt3D } from "@/lib/motion/Tilt3D";

const demos = [
  {
    title: "Luxury Chauffeur",
    subtitle: "Premium car service website",
    route: "/chauffeur",
    stack: ["Next.js 16", "Framer Motion", "Tailwind v4"],
    description:
      "Scroll-driven animations, pinned fleet showcase where vehicles crossfade as you scroll, parallax hero, animated features section.",
    tag: "Hospitality & Transport",
    tagColor: "#e5c158",
    minHeight: 520,
    preview: {
      bg: "#0a0a0a",
      accent: "#e5c158",
      topText: "PRESTIGE CHAUFFEUR",
      line1: "Arrive in Silence.",
      line2: "Depart in Style.",
    },
  },
  {
    title: "Fashion Ecommerce",
    subtitle: "Full shopping experience",
    route: "/ecommerce",
    stack: ["React Context", "Framer Motion", "Filters"],
    description:
      "Cart drawer with localStorage persistence, live product filters, hover image swap, animated categories grid, View Transition product detail.",
    tag: "Retail & Ecommerce",
    tagColor: "#9ca3af",
    minHeight: 440,
    preview: {
      bg: "#f5f5f5",
      accent: "#111",
      topText: "MAISON",
      line1: "The New Season Edit.",
      line2: "Spring / Summer 2026",
    },
  },
  {
    title: "Fine Dining Restaurant",
    subtitle: "Dark moody restaurant site",
    route: "/cafe",
    stack: ["AnimatePresence", "Masonry Gallery", "Framer Motion"],
    description:
      "Animated tabbed menu, masonry photo gallery with full keyboard lightbox, reservation form with confirmation state.",
    tag: "Food & Hospitality",
    tagColor: "#e8be63",
    minHeight: 400,
    preview: {
      bg: "#12100a",
      accent: "#e8be63",
      topText: "LUMIÈRE",
      line1: "Where Every Bite",
      line2: "Tells a Story.",
    },
  },
];

function SitePreview({
  preview,
  isHovered,
}: {
  preview: (typeof demos)[0]["preview"];
  isHovered: boolean;
}) {
  const isDark = preview.bg !== "#f5f5f5";
  return (
    <div
      className="relative overflow-hidden border-b border-white/5 rounded-t-2xl"
      style={{ background: preview.bg, height: "180px" }}
      aria-hidden
    >
      {/* LIVE badge */}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-3 left-3 z-10 text-[0.5rem] tracking-[0.2em] uppercase px-2 py-0.5 font-bold"
        style={{ background: "#10b981", color: "#fff", borderRadius: "4px" }}
      >
        Live
      </motion.span>

      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: `${preview.accent}22` }}
      >
        <span
          className="text-[0.55rem] tracking-[0.3em] font-bold"
          style={{ color: preview.accent, fontFamily: "Georgia, serif" }}
        >
          {preview.topText}
        </span>
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="text-[0.55rem]" style={{ color: `${preview.accent}66` }}>
              Menu
            </span>
          ))}
        </div>
        <div
          className="text-[0.5rem] px-2 py-0.5 tracking-wider uppercase"
          style={{ background: preview.accent, color: isDark ? "#000" : "#fff" }}
        >
          Book
        </div>
      </div>

      <div className="flex flex-col items-center justify-center" style={{ height: "calc(100% - 36px)" }}>
        <span
          className="text-[0.5rem] tracking-[0.3em] uppercase mb-2 block"
          style={{ color: preview.accent }}
        >
          Premium Collection
        </span>
        <span
          className="text-[1.1rem] font-bold text-center leading-tight"
          style={{ color: isDark ? "#ffffff" : "#111111", fontFamily: "Georgia, serif" }}
        >
          {preview.line1}
        </span>
        <em
          className="text-[0.85rem] mt-0.5 text-center"
          style={{ color: preview.accent, fontFamily: "Georgia, serif" }}
        >
          {preview.line2}
        </em>
        <div
          className="mt-4 px-4 py-1 text-[0.5rem] tracking-[0.2em] uppercase"
          style={{ background: preview.accent, color: isDark ? "#000" : "#fff" }}
        >
          Explore
        </div>
      </div>

      {/* Hover overlay — "Open site" */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{ background: "rgba(0,0,0,0.55)" }}
      >
        <motion.span
          animate={{ y: isHovered ? 0 : 8 }}
          transition={{ duration: 0.22 }}
          className="text-white text-xs tracking-[0.2em] uppercase px-4 py-2 flex items-center gap-1.5 font-medium"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "8px" }}
        >
          → Open site
        </motion.span>
      </motion.div>
    </div>
  );
}

export default function DemoSites() {
  const [hoveredDemo, setHoveredDemo] = useState<number | null>(null);

  return (
    <section id="demos" className="py-24 px-6 relative section-cv" style={{ background: "#08080f" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">Live demos</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
          >
            Client-Ready Websites
          </h2>
          <p className="text-white/50 max-w-lg text-sm leading-relaxed">
            Click any card to explore the full site — built to the same standard I deliver to real clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.route}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="demo-card-wrap"
              onHoverStart={() => setHoveredDemo(i)}
              onHoverEnd={() => setHoveredDemo(null)}
            >
              <Link
                href={demo.route}
                className="demo-card group flex flex-col border border-white/8 bg-white/[0.01] hover:border-[#6366f1]/40 overflow-hidden relative"
                aria-label={`Open ${demo.title} — ${demo.subtitle}`}
                style={{ borderRadius: "16px" }}
              >
                <Tilt3D max={8} className="flex flex-col">
                  <SitePreview preview={demo.preview} isHovered={hoveredDemo === i} />

                  <div className="p-6 flex flex-col rounded-b-2xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span
                          className="text-[0.55rem] tracking-[0.15em] uppercase px-2 py-0.5 mb-2 inline-block"
                          style={{
                            color: demo.tagColor,
                            background: `${demo.tagColor}1a`,
                            border: `1px solid ${demo.tagColor}33`,
                            borderRadius: "6px",
                          }}
                        >
                          {demo.tag}
                        </span>
                        <h3
                          className="text-white font-semibold text-lg leading-snug"
                          style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
                        >
                          {demo.title}
                        </h3>
                        <p className="text-white/45 text-xs">{demo.subtitle}</p>
                      </div>
                      <ArrowUpRight
                        size={18}
                        aria-hidden
                        className="text-white/25 group-hover:text-[#6366f1] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0"
                      />
                    </div>

                    <p className="text-white/55 text-sm leading-relaxed mb-4">{demo.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {demo.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[0.58rem] tracking-wide uppercase px-2 py-0.5 text-[#a5b4fc]"
                          style={{ background: "rgba(99,102,241,0.09)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "6px" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Tilt3D>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                  style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.05), transparent)" }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
