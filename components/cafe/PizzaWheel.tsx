"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pizzaMenu } from "@/data/menu";
import { useCoarsePointer } from "@/lib/motion/useReducedMotion";

const SLICES = 6;
const LIFT = 16;

// Generate a CSS clip-path polygon approximating a pizza wedge slice.
// cx, cy, r are in percentage units (0–100) relative to the element.
function wedgePolygon(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const pts: string[] = [`${cx}% ${cy}%`];
  const steps = 48;
  for (let s = 0; s <= steps; s++) {
    const d = startDeg + (endDeg - startDeg) * (s / steps);
    const x = cx + r * Math.cos(toRad(d));
    const y = cy + r * Math.sin(toRad(d));
    pts.push(`${x.toFixed(3)}% ${y.toFixed(3)}%`);
  }
  return `polygon(${pts.join(", ")})`;
}

// Direction vector pointing from center toward the mid-angle of slice i.
function sliceVector(i: number) {
  const midDeg = i * (360 / SLICES) + 360 / SLICES / 2;
  const rad = ((midDeg - 90) * Math.PI) / 180;
  return { x: Math.cos(rad), y: Math.sin(rad) };
}

// SVG arc path for a wedge (used for the crust-ring arc on active slice).
function svgArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

const DEG = 360 / SLICES;

export function PizzaWheel() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const coarse = useCoarsePointer();
  const active = coarse ? selected : hovered;
  const anyActive = active !== null;

  return (
    <div className="relative overflow-hidden rounded-xl py-8 px-4">
      {/* Blurred section background from active pizza */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <AnimatePresence>
          {anyActive && (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img
                src={pizzaMenu[active!].image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "blur(56px) brightness(0.16)", transform: "scale(1.2)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-16 items-center max-w-5xl mx-auto">

        {/* ── Pizza Wheel ── */}
        <div className="flex flex-col items-center gap-6">
          <div
            className="relative w-full max-w-[420px] aspect-square mx-auto"
            role="group"
            aria-label="Pizza selection wheel — hover or tap a slice"
          >
            {/* Per-slice images with clip-path */}
            {pizzaMenu.map((pizza, i) => {
              const isActive = active === i;
              const vec = sliceVector(i);

              return (
                <motion.div
                  key={pizza.name}
                  className="absolute inset-0"
                  style={{
                    clipPath: wedgePolygon(50, 50, 46, i * DEG, (i + 1) * DEG),
                    cursor: "pointer",
                    willChange: "transform",
                    filter: isActive
                      ? "brightness(1.1) drop-shadow(0 4px 28px rgba(212,168,83,0.5))"
                      : anyActive
                        ? "brightness(0.55) saturate(0.5)"
                        : "brightness(0.82)",
                    transition: "filter 0.35s ease",
                  }}
                  animate={{
                    x: isActive ? vec.x * LIFT : 0,
                    y: isActive ? vec.y * LIFT : 0,
                  }}
                  transition={{ type: "spring", stiffness: 270, damping: 24, mass: 0.8 }}
                  onMouseEnter={() => !coarse && setHovered(i)}
                  onMouseLeave={() => !coarse && setHovered(null)}
                  onClick={() => coarse && setSelected((s) => (s === i ? null : i))}
                  aria-label={`${pizza.name} — £${pizza.price}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelected((s) => (s === i ? null : i))}
                >
                  <img
                    src={pizza.thumbImage}
                    alt={pizza.name}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  />
                </motion.div>
              );
            })}

            {/* SVG overlay — crust ring, dividers, center medallion */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden
            >
              <defs>
                <radialGradient id="shadow-grad" cx="50%" cy="56%" r="50%">
                  <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
                </radialGradient>
                <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ambient shadow vignette around pizza */}
              <circle cx="250" cy="250" r="230" fill="url(#shadow-grad)" />

              {/* Slice dividing lines */}
              {Array.from({ length: SLICES }).map((_, i) => {
                const angle = i * DEG;
                const rad = ((angle - 90) * Math.PI) / 180;
                const x2 = 250 + 230 * Math.cos(rad);
                const y2 = 250 + 230 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1="250" y1="250"
                    x2={x2.toFixed(1)} y2={y2.toFixed(1)}
                    stroke="#0e0c08"
                    strokeWidth="3.5"
                  />
                );
              })}

              {/* Outer crust ring — dark brown charred crust */}
              <circle cx="250" cy="250" r="230" fill="none" stroke="#1e0e04" strokeWidth="10" />
              <circle cx="250" cy="250" r="224" fill="none" stroke="#4a2208" strokeWidth="3" opacity="0.7" />
              <circle cx="250" cy="250" r="218" fill="none" stroke="#7a4010" strokeWidth="1.5" opacity="0.35" />

              {/* Active slice gold arc highlight */}
              <AnimatePresence>
                {anyActive && (
                  <motion.path
                    key={active}
                    d={svgArc(250, 250, 230, active! * DEG, (active! + 1) * DEG)}
                    fill="none"
                    stroke="#d4a853"
                    strokeWidth="3"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    filter="url(#glow-gold)"
                  />
                )}
              </AnimatePresence>

              {/* Center medallion */}
              <circle cx="250" cy="250" r="32" fill="#100d06" />
              <circle cx="250" cy="250" r="32" fill="none" stroke="#d4a853" strokeWidth="1.5" />
              <circle cx="250" cy="250" r="25" fill="none" stroke="#d4a853" strokeWidth="0.6" opacity="0.4" />
              {/* Cross hatching in center */}
              <line x1="232" y1="250" x2="268" y2="250" stroke="#d4a853" strokeWidth="0.5" opacity="0.3" />
              <line x1="250" y1="232" x2="250" y2="268" stroke="#d4a853" strokeWidth="0.5" opacity="0.3" />
              <text
                x="250" y="247"
                textAnchor="middle"
                fill="#d4a853"
                fontSize="6"
                fontFamily="Georgia, serif"
                letterSpacing="2.5"
              >
                LUMIÈRE
              </text>
              <text
                x="250" y="258"
                textAnchor="middle"
                fill="#d4a853"
                fontSize="4"
                fontFamily="Georgia, serif"
                letterSpacing="2"
                opacity="0.55"
              >
                PIZZERIA
              </text>
            </svg>
          </div>

          {/* Slice name ring labels — small text at mid-radius, only on active */}
          <p className="text-[#4a3a2a] text-[0.6rem] tracking-[0.25em] uppercase text-center">
            {coarse ? "Tap a slice · tap again to deselect" : "Hover a slice to explore"}
          </p>
        </div>

        {/* ── Info Panel ── */}
        <div className="min-h-[320px] flex items-center">
          <AnimatePresence mode="wait">
            {anyActive ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="w-full border border-[#d4a853]/20 bg-[#12100a]/80 backdrop-blur-md p-7"
              >
                {/* Tag */}
                <span className="inline-block text-[0.55rem] tracking-[0.3em] uppercase text-[#d4a853]/55 mb-2">
                  {pizzaMenu[active!].tagline}
                </span>

                {/* Name */}
                <h3
                  className="text-[2rem] font-bold text-[#f5ead8] leading-tight mb-1"
                  style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                >
                  {pizzaMenu[active!].name}
                </h3>

                {/* Accent line */}
                <div
                  className="w-10 h-px mb-5 mt-2"
                  style={{ background: pizzaMenu[active!].accentColor }}
                />

                {/* Ingredients */}
                <p className="text-[#7a6a55] text-[0.58rem] tracking-[0.22em] uppercase mb-3">
                  Ingredients
                </p>
                <ul className="space-y-2.5 mb-7">
                  {pizzaMenu[active!].ingredients.map((ing, ii) => (
                    <motion.li
                      key={ing}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: ii * 0.055 + 0.08,
                        duration: 0.28,
                        ease: "easeOut",
                      }}
                      className="flex items-center gap-3 text-sm text-[#9a8a70] leading-snug"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-px"
                        style={{ background: pizzaMenu[active!].accentColor }}
                        aria-hidden
                      />
                      {ing}
                    </motion.li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-end justify-between gap-4 pt-4 border-t border-[#d4a853]/10">
                  <div>
                    <p className="text-[#5a4a35] text-[0.58rem] tracking-[0.22em] uppercase mb-0.5">Price</p>
                    <p
                      className="text-[2rem] leading-none font-semibold text-[#d4a853]"
                      style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                    >
                      £{pizzaMenu[active!].price}
                    </p>
                  </div>
                  <a
                    href="#reservations"
                    className="text-[0.6rem] tracking-[0.22em] uppercase px-5 py-2.5 border border-[#d4a853]/40 text-[#d4a853] hover:bg-[#d4a853] hover:text-[#0e0c08] transition-all duration-250 whitespace-nowrap"
                  >
                    Reserve a Table
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full text-center py-12 px-4"
              >
                <div className="w-8 h-px bg-[#d4a853]/20 mx-auto mb-5" />
                <p
                  className="text-[#f5ead8]/20 text-xl italic mb-3"
                  style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                >
                  Six artisan creations.
                </p>
                <p className="text-[#4a3a2a] text-[0.65rem] tracking-[0.25em] uppercase">
                  Each slice a different world
                </p>
                <div className="w-8 h-px bg-[#d4a853]/20 mx-auto mt-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
