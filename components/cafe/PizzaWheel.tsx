"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pizzaMenu } from "@/data/menu";
import { useCoarsePointer } from "@/lib/motion/useReducedMotion";

// Single overhead pizza photo used for ALL slices so the wheel looks
// like a real pizza that's been cut — not a chaotic photo collage.
const BASE_PIZZA =
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&w=900&q=90";

const SLICES = 6;
const DEG = 360 / SLICES;
const LIFT = 18;

function wedgePoly(i: number): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const startDeg = i * DEG;
  const endDeg = (i + 1) * DEG;
  const pts: string[] = ["50% 50%"];
  for (let s = 0; s <= 52; s++) {
    const d = startDeg + (endDeg - startDeg) * (s / 52);
    pts.push(
      `${(50 + 46 * Math.cos(toRad(d))).toFixed(3)}% ${(50 + 46 * Math.sin(toRad(d))).toFixed(3)}%`
    );
  }
  return `polygon(${pts.join(", ")})`;
}

function sliceVec(i: number) {
  const midDeg = i * DEG + DEG / 2;
  const rad = ((midDeg - 90) * Math.PI) / 180;
  return { x: Math.cos(rad), y: Math.sin(rad) };
}

// SVG arc for the gold crust highlight of the active slice.
function crustArc(i: number, r = 230): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const s = i * DEG;
  const e = (i + 1) * DEG;
  const x1 = (250 + r * Math.cos(toRad(s))).toFixed(2);
  const y1 = (250 + r * Math.sin(toRad(s))).toFixed(2);
  const x2 = (250 + r * Math.cos(toRad(e))).toFixed(2);
  const y2 = (250 + r * Math.sin(toRad(e))).toFixed(2);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}

export function PizzaWheel() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const coarse = useCoarsePointer();
  const active = coarse ? selected : hovered;
  const anyActive = active !== null;

  return (
    <div className="relative overflow-hidden rounded-xl py-10 px-4">
      {/* ── Blurred background from active pizza ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <AnimatePresence>
          {anyActive && (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65 }}
              className="absolute inset-0"
            >
              <img
                src={pizzaMenu[active!].image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: "blur(60px) brightness(0.14)",
                  transform: "scale(1.15)",
                }}
              />
              {/* Tinted veil matching the pizza's accent */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, ${pizzaMenu[active!].accentColor}14, transparent 70%)`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid lg:grid-cols-[1fr_340px] gap-12 xl:gap-20 items-center">

        {/* ── Pizza Wheel ── */}
        <div className="flex flex-col items-center gap-5">

          {/* Outer glow ring */}
          <div className="relative w-full max-w-[400px] mx-auto">
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: anyActive
                  ? `radial-gradient(circle, ${pizzaMenu[active!].accentColor}22 0%, transparent 68%)`
                  : "radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 68%)",
                transition: "background 0.6s ease",
                transform: "scale(1.18)",
                filter: "blur(12px)",
              }}
              aria-hidden
            />

            <div
              className="relative w-full aspect-square"
              role="group"
              aria-label="Pizza menu — hover or tap a slice to explore"
            >
              {/* ── Slices ── */}
              {pizzaMenu.map((pizza, i) => {
                const isActive = active === i;
                const vec = sliceVec(i);

                return (
                  <motion.div
                    key={pizza.name}
                    className="absolute inset-0"
                    style={{
                      clipPath: wedgePoly(i),
                      cursor: "pointer",
                      willChange: "transform",
                    }}
                    animate={{
                      x: isActive ? vec.x * LIFT : 0,
                      y: isActive ? vec.y * LIFT : 0,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.7 }}
                    onMouseEnter={() => !coarse && setHovered(i)}
                    onMouseLeave={() => !coarse && setHovered(null)}
                    onClick={() => coarse && setSelected((s) => (s === i ? null : i))}
                    role="button"
                    tabIndex={0}
                    aria-label={`${pizza.name}, £${pizza.price}`}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelected((s) => (s === i ? null : i))
                    }
                  >
                    {/* Unified pizza photo — same image, same position, in every slice.
                        Together they re-assemble a single whole pizza. */}
                    <img
                      src={BASE_PIZZA}
                      alt=""
                      draggable={false}
                      aria-hidden
                      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                      style={{
                        filter: isActive
                          ? "brightness(1.08) contrast(1.04)"
                          : anyActive
                            ? "brightness(0.52) saturate(0.55)"
                            : "brightness(0.78)",
                        transition: "filter 0.35s ease",
                      }}
                    />

                    {/* Per-flavour accent overlay — a subtle radial gradient
                        in that pizza's accent colour, intensifying on hover. */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${pizza.accentColor}55 0%, ${pizza.accentColor}22 45%, transparent 70%)`,
                        opacity: isActive ? 1 : anyActive ? 0.1 : 0.35,
                        transition: "opacity 0.35s ease",
                        mixBlendMode: "soft-light",
                      }}
                      aria-hidden
                    />
                  </motion.div>
                );
              })}

              {/* ── SVG overlay: crust, dividers, medallion ── */}
              <svg
                viewBox="0 0 500 500"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden
              >
                <defs>
                  {/* Ambient bottom shadow under the pizza */}
                  <radialGradient id="pw-shadow" cx="50%" cy="58%" r="50%">
                    <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
                  </radialGradient>
                  {/* Gloss highlight on top-left */}
                  <radialGradient id="pw-gloss" cx="30%" cy="25%" r="45%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                  <filter id="pw-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ambient vignette */}
                <circle cx="250" cy="250" r="230" fill="url(#pw-shadow)" />

                {/* Gloss sheen */}
                <circle cx="250" cy="250" r="230" fill="url(#pw-gloss)" />

                {/* Slice divider lines */}
                {Array.from({ length: SLICES }).map((_, i) => {
                  const rad = ((i * DEG - 90) * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1="250"
                      y1="250"
                      x2={(250 + 230 * Math.cos(rad)).toFixed(1)}
                      y2={(250 + 230 * Math.sin(rad)).toFixed(1)}
                      stroke="#0e0c08"
                      strokeWidth="4"
                    />
                  );
                })}

                {/* Charred crust outer ring */}
                <circle cx="250" cy="250" r="230" fill="none" stroke="#1a0a02" strokeWidth="12" />
                <circle cx="250" cy="250" r="223" fill="none" stroke="#3d1a06" strokeWidth="4" opacity="0.8" />
                <circle cx="250" cy="250" r="217" fill="none" stroke="#6b3510" strokeWidth="2" opacity="0.4" />

                {/* Active slice gold crust arc */}
                <AnimatePresence>
                  {anyActive && (
                    <motion.path
                      key={`arc-${active}`}
                      d={crustArc(active!)}
                      fill="none"
                      stroke="#d4a853"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      filter="url(#pw-glow)"
                    />
                  )}
                </AnimatePresence>

                {/* Inner circle line (where crust meets toppings) */}
                <circle cx="250" cy="250" r="192" fill="none" stroke="#0e0c08" strokeWidth="1.5" opacity="0.6" />

                {/* Center medallion */}
                <circle cx="250" cy="250" r="33" fill="#0e0c08" />
                <circle cx="250" cy="250" r="33" fill="none" stroke="#d4a853" strokeWidth="1.8" />
                <circle cx="250" cy="250" r="26" fill="none" stroke="#d4a853" strokeWidth="0.7" opacity="0.45" />
                {/* decorative crosshatch */}
                <line x1="230" y1="250" x2="270" y2="250" stroke="#d4a853" strokeWidth="0.6" opacity="0.25" />
                <line x1="250" y1="230" x2="250" y2="270" stroke="#d4a853" strokeWidth="0.6" opacity="0.25" />
                <text
                  x="250" y="247"
                  textAnchor="middle"
                  fill="#d4a853"
                  fontSize="6.5"
                  fontFamily="Georgia, serif"
                  letterSpacing="2.8"
                >
                  LUMIÈRE
                </text>
                <text
                  x="250" y="258"
                  textAnchor="middle"
                  fill="#d4a853"
                  fontSize="4.2"
                  fontFamily="Georgia, serif"
                  letterSpacing="2"
                  opacity="0.5"
                >
                  PIZZERIA
                </text>
              </svg>
            </div>
          </div>

          <p className="text-[#4a3a2a] text-[0.58rem] tracking-[0.28em] uppercase text-center">
            {coarse ? "Tap a slice · tap again to deselect" : "Hover a slice to explore"}
          </p>
        </div>

        {/* ── Info Panel ── */}
        <div className="min-h-[340px] flex items-center">
          <AnimatePresence mode="wait">
            {anyActive ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.42,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="w-full"
              >
                {/* Pizza photo thumbnail */}
                <div className="relative w-full h-44 overflow-hidden mb-5">
                  <img
                    src={pizzaMenu[active!].image}
                    alt={pizzaMenu[active!].name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: "brightness(0.88) contrast(1.05)" }}
                  />
                  {/* Overlay fade to dark at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c08] via-[#0e0c08]/30 to-transparent" />
                  {/* Tagline on photo */}
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[0.55rem] tracking-[0.3em] uppercase text-[#d4a853]/80">
                      {pizzaMenu[active!].tagline}
                    </span>
                  </div>
                  {/* Accent colour top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: pizzaMenu[active!].accentColor }}
                  />
                </div>

                {/* Name */}
                <h3
                  className="text-[1.75rem] font-bold text-[#f5ead8] leading-tight mb-4"
                  style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                >
                  {pizzaMenu[active!].name}
                </h3>

                {/* Ingredients */}
                <p className="text-[#6a5a45] text-[0.55rem] tracking-[0.25em] uppercase mb-3">
                  Ingredients
                </p>
                <ul className="space-y-2 mb-6">
                  {pizzaMenu[active!].ingredients.map((ing, ii) => (
                    <motion.li
                      key={ing}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: ii * 0.05 + 0.06, duration: 0.24, ease: "easeOut" }}
                      className="flex items-center gap-2.5 text-[0.83rem] text-[#9a8a70] leading-snug"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: pizzaMenu[active!].accentColor }}
                        aria-hidden
                      />
                      {ing}
                    </motion.li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div
                  className="flex items-end justify-between gap-3 pt-4"
                  style={{ borderTop: "1px solid rgba(212,168,83,0.12)" }}
                >
                  <div>
                    <p className="text-[#5a4a35] text-[0.55rem] tracking-[0.25em] uppercase mb-0.5">
                      Price
                    </p>
                    <p
                      className="text-[1.9rem] leading-none font-semibold text-[#d4a853]"
                      style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                    >
                      £{pizzaMenu[active!].price}
                    </p>
                  </div>
                  <a
                    href="#reservations"
                    className="text-[0.6rem] tracking-[0.22em] uppercase px-5 py-2.5 border border-[#d4a853]/35 text-[#d4a853] hover:bg-[#d4a853] hover:text-[#0e0c08] transition-all duration-200 whitespace-nowrap"
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
                className="w-full text-center lg:text-left py-8"
              >
                <div className="w-6 h-px bg-[#d4a853]/25 mb-6 mx-auto lg:mx-0" />
                <p
                  className="text-[#f5ead8]/15 text-2xl italic mb-4 leading-relaxed"
                  style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                >
                  Six artisan<br />creations.
                </p>
                <p className="text-[#4a3a2a] text-[0.6rem] tracking-[0.28em] uppercase">
                  Each slice a different world
                </p>
                <div className="w-6 h-px bg-[#d4a853]/25 mt-6 mx-auto lg:mx-0" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
