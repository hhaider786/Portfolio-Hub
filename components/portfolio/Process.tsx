"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useTransform, type MotionValue } from "framer-motion";
import { ScrollScene, ScrollScenePin, useScrollProgress } from "@/lib/motion/ScrollScene";
import { MorphSVG } from "@/lib/motion/MorphSVG";

const PHASES = [
  {
    label: "Discover",
    title: "Understand the business",
    body: "Workshops, audits, competitive teardown. I learn the customer journey before writing a single line of CSS.",
  },
  {
    label: "Design",
    title: "Translate intent into systems",
    body: "Wireframes, design tokens, animation primitives, motion choreography — built to scale across every page.",
  },
  {
    label: "Build",
    title: "Ship production code",
    body: "Next.js, TypeScript, Tailwind. Accessibility, SEO, Core Web Vitals — non-negotiable from day one.",
  },
  {
    label: "Polish",
    title: "Iterate with real data",
    body: "Analytics, heatmaps, Lighthouse. Continuous tightening until every interaction feels effortless.",
  },
];

const MORPHS = [
  "M50 12 L62 50 L50 88 L38 50 Z M22 50 L78 50",
  "M22 22 L78 22 L78 78 L22 78 Z M50 22 L50 78 M22 50 L78 50",
  "M22 22 L50 50 L22 78 M60 78 L78 78",
  "M50 18 L58 42 L82 42 L62 58 L70 82 L50 66 L30 82 L38 58 L18 42 L42 42 Z",
];

function useActiveStep(progress: MotionValue<number>): number {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const update = (p: number) => {
      const next = Math.min(PHASES.length - 1, Math.max(0, Math.floor(p * PHASES.length)));
      setStep((prev) => (prev === next ? prev : next));
    };
    update(progress.get());
    return progress.on("change", update);
  }, [progress]);
  return step;
}

function Stage() {
  const progress = useScrollProgress();
  const step = useActiveStep(progress);
  const barWidth = useTransform(progress, (p) => `${Math.min(100, Math.max(0, p * 100))}%`);

  const phase = PHASES[step];

  return (
    <ScrollScenePin>
      <div className="relative h-full w-full flex items-center px-6 overflow-hidden">
        <div className="orb orb-1" />
        <div className="grid-overlay" />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left: morphing SVG */}
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full">
            <motion.div
              className="absolute inset-0 rounded-full border border-[#6366f1]/15"
              animate={{ rotate: step * 90 }}
              transition={{ type: "spring", damping: 22, stiffness: 80 }}
            />
            <motion.div
              className="absolute inset-6 rounded-full border border-[#6366f1]/10"
              animate={{ rotate: -step * 60 }}
              transition={{ type: "spring", damping: 22, stiffness: 80 }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <MorphSVG
                paths={MORPHS}
                viewBox="0 0 100 100"
                stroke="#a5b4fc"
                strokeWidth={1.2}
                className="w-2/3 h-2/3"
                duration={6}
              />
            </div>
            <div className="absolute bottom-2 right-2 text-[0.6rem] tracking-[0.3em] uppercase text-[#a5b4fc]/60">
              process
            </div>
          </div>

          {/* Right: phase text — only one shown at a time via AnimatePresence */}
          <div className="relative min-h-[280px]">
            <p className="text-[#6366f1] text-[0.6rem] tracking-[0.4em] uppercase mb-6">
              How I work · {step + 1} of {PHASES.length}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-md"
              >
                <p className="text-[#818cf8] text-[0.7rem] tracking-[0.4em] uppercase mb-3">
                  {String(step + 1).padStart(2, "0")} · {phase.label}
                </p>
                <h3
                  className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
                >
                  {phase.title}
                </h3>
                <p className="text-white/55 text-base leading-relaxed">{phase.body}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mt-12 max-w-md">
              <div className="h-px bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4]"
                  style={{ width: barWidth }}
                />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 text-[0.55rem] tracking-[0.2em] uppercase">
                {PHASES.map((p, i) => (
                  <span
                    key={p.label}
                    className={`transition-colors duration-300 ${i <= step ? "text-[#818cf8]" : "text-white/25"}`}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <span className="sr-only">
          The process has four phases: {PHASES.map((p, i) => `${i + 1}. ${p.title}`).join("; ")}.
        </span>
      </div>
    </ScrollScenePin>
  );
}

export default function Process() {
  return (
    <section id="process" aria-label="How I work" className="relative" style={{ background: "#08080f" }}>
      <ScrollScene height="350vh">
        <Stage />
      </ScrollScene>
    </section>
  );
}
