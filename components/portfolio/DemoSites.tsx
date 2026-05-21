"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const demos = [
  {
    title: "Luxury Chauffeur",
    subtitle: "Premium car service website",
    route: "/chauffeur",
    stack: ["Next.js", "Framer Motion", "Tailwind v4"],
    description: "Scroll-driven animations, pinned fleet showcase, parallax hero. Built for high-end chauffeur businesses.",
    preview: {
      bg: "#0a0a0a",
      accent: "#c9a84c",
      navText: "PRESTIGE",
      heroText: "Arrive in Silence.",
      heroSub: "Depart in Style.",
      tagColor: "#c9a84c",
    },
  },
  {
    title: "Fashion Ecommerce",
    subtitle: "Full-stack fashion store",
    route: "/ecommerce",
    stack: ["Next.js", "React Context", "Framer Motion"],
    description: "Cart drawer, live product filters, hover image swap, animated categories. Full shopping experience.",
    preview: {
      bg: "#ffffff",
      accent: "#111111",
      navText: "MAISON",
      heroText: "The New Season Edit.",
      heroSub: "Curated collections.",
      tagColor: "#111",
    },
  },
  {
    title: "Fine Dining Restaurant",
    subtitle: "Dark moody restaurant site",
    route: "/cafe",
    stack: ["Next.js", "AnimatePresence", "Framer Motion"],
    description: "Tabbed menu system, masonry gallery with lightbox, reservation form with confirmation state.",
    preview: {
      bg: "#12100a",
      accent: "#d4a853",
      navText: "LUMIÈRE",
      heroText: "Where Every Bite",
      heroSub: "Tells a Story.",
      tagColor: "#d4a853",
    },
  },
];

function SiteCard({ demo, index }: { demo: typeof demos[0]; index: number }) {
  const isDark = demo.preview.bg !== "#ffffff";

  return (
    <motion.a
      href={demo.route}
      className="group block border border-white/8 bg-white/2 hover:border-[#6366f1]/40 hover:bg-[#6366f1]/3 transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
    >
      {/* CSS mini preview */}
      <div
        className="relative h-44 overflow-hidden border-b border-white/5"
        style={{ background: demo.preview.bg }}
      >
        {/* Fake nav */}
        <div className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: `${demo.preview.accent}20` }}>
          <span className="text-[0.6rem] tracking-[0.25em] font-bold"
            style={{ color: demo.preview.accent, fontFamily: "Georgia, serif" }}>
            {demo.preview.navText}
          </span>
          <div className="flex gap-3">
            {["•", "•", "•"].map((d, i) => (
              <span key={i} className="text-[0.55rem]" style={{ color: `${demo.preview.accent}60` }}>Menu</span>
            ))}
          </div>
        </div>
        {/* Fake hero */}
        <div className="flex flex-col items-center justify-center h-[calc(100%-44px)] text-center px-6">
          <span className="text-[0.55rem] tracking-[0.3em] uppercase mb-2 block"
            style={{ color: demo.preview.accent }}>
            Premium Service
          </span>
          <span className="text-lg font-bold leading-tight"
            style={{ color: isDark ? "#ffffff" : "#111111", fontFamily: "Georgia, serif" }}>
            {demo.preview.heroText}
          </span>
          <span className="text-sm italic mt-0.5"
            style={{ color: demo.preview.accent, fontFamily: "Georgia, serif" }}>
            {demo.preview.heroSub}
          </span>
          <div className="mt-4 px-4 py-1.5 text-[0.55rem] tracking-wider"
            style={{ background: demo.preview.accent, color: isDark ? "#000" : "#fff" }}>
            View More
          </div>
        </div>
      </div>

      {/* Card info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-semibold text-lg mb-0.5"
              style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
              {demo.title}
            </h3>
            <p className="text-white/40 text-xs tracking-wider">{demo.subtitle}</p>
          </div>
          <ArrowUpRight size={18} className="text-white/20 group-hover:text-[#6366f1] transition-colors mt-1" />
        </div>
        <p className="text-white/45 text-sm leading-relaxed mb-4">{demo.description}</p>
        <div className="flex flex-wrap gap-2">
          {demo.stack.map((s) => (
            <span key={s} className="text-[0.6rem] tracking-wider uppercase px-2 py-1 bg-[#6366f1]/8 border border-[#6366f1]/15 text-[#818cf8]">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function DemoSites() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">Client Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
            Demo Sites
          </h2>
          <p className="text-white/45 max-w-lg">
            Live demos of websites I build for clients. Click any card to explore the full site.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {demos.map((demo, i) => (
            <SiteCard key={demo.route} demo={demo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
