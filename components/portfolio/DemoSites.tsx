"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const demos = [
  {
    title: "Luxury Chauffeur",
    subtitle: "Premium car service website",
    route: "/chauffeur",
    stack: ["Next.js 16", "Framer Motion", "Tailwind v4"],
    description:
      "Scroll-driven animations, pinned fleet showcase where vehicles crossfade as you scroll, parallax hero, animated features section.",
    tag: "Hospitality & Transport",
    tagColor: "#c9a84c",
    preview: {
      bg: "#0a0a0a",
      accent: "#c9a84c",
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
      "Cart drawer, live product filters, hover image swap, animated categories grid. Full mock checkout flow.",
    tag: "Retail & Ecommerce",
    tagColor: "#111111",
    preview: {
      bg: "#f5f5f5",
      accent: "#111",
      topText: "MAISON",
      line1: "The New Season Edit.",
      line2: "Spring / Summer 2025",
    },
  },
  {
    title: "Fine Dining Restaurant",
    subtitle: "Dark moody restaurant site",
    route: "/cafe",
    stack: ["AnimatePresence", "Masonry Gallery", "Framer Motion"],
    description:
      "Animated tabbed menu, masonry photo gallery with lightbox, reservation form with confirmation state.",
    tag: "Food & Hospitality",
    tagColor: "#d4a853",
    preview: {
      bg: "#12100a",
      accent: "#d4a853",
      topText: "LUMIÈRE",
      line1: "Where Every Bite",
      line2: "Tells a Story.",
    },
  },
];

function SitePreview({ preview }: { preview: (typeof demos)[0]["preview"] }) {
  const isDark = preview.bg !== "#f5f5f5";
  return (
    <div
      className="relative overflow-hidden border-b border-white/5"
      style={{ background: preview.bg, height: "180px" }}
    >
      {/* Fake nav bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: `${preview.accent}18` }}
      >
        <span
          className="text-[0.55rem] tracking-[0.3em] font-bold"
          style={{ color: preview.accent, fontFamily: "Georgia, serif" }}
        >
          {preview.topText}
        </span>
        <div className="flex gap-3">
          {["·", "·", "·", "·"].map((d, i) => (
            <span key={i} className="text-[0.55rem]" style={{ color: `${preview.accent}55` }}>
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

      {/* Fake hero */}
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
    </div>
  );
}

export default function DemoSites() {
  return (
    <section id="work" className="py-24 px-6 relative" style={{ background: "#08080f" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">Live Demos</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
          >
            Client-Ready Websites
          </h2>
          <p className="text-white/35 max-w-lg text-sm leading-relaxed">
            Click any card to explore the full site — built to the same standard I deliver to real clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {demos.map((demo, i) => (
            <motion.a
              key={demo.route}
              href={demo.route}
              className="group block border border-white/6 bg-white/[0.01] hover:border-[#6366f1]/40 transition-all duration-400 overflow-hidden relative"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              {/* Preview window */}
              <SitePreview preview={demo.preview} />

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span
                      className="text-[0.55rem] tracking-[0.15em] uppercase px-2 py-0.5 mb-2 inline-block"
                      style={{ color: demo.tagColor === "#111111" ? "#555" : demo.tagColor, background: `${demo.tagColor === "#111111" ? "#111" : demo.tagColor}14`, border: `1px solid ${demo.tagColor === "#111111" ? "#111" : demo.tagColor}25` }}
                    >
                      {demo.tag}
                    </span>
                    <h3
                      className="text-white font-semibold text-lg leading-snug"
                      style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
                    >
                      {demo.title}
                    </h3>
                    <p className="text-white/30 text-xs">{demo.subtitle}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-white/15 group-hover:text-[#6366f1] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0"
                  />
                </div>

                <p className="text-white/38 text-sm leading-relaxed mb-4">{demo.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {demo.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[0.58rem] tracking-wide uppercase px-2 py-0.5 text-[#818cf8]"
                      style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.14)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.03), transparent)" }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
