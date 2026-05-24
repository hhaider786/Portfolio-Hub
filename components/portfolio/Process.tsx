"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
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

function PhaseCard({
  phase,
  index,
  idx,
}: {
  phase: (typeof PHASES)[number];
  index: number;
  idx: MotionValue<number>;
}) {
  const opacity = useTransform(idx, [index - 0.4, index, index + 1, index + 1.4], [0, 1, 1, 0]);
  const y = useTransform(idx, [index - 0.4, index, index + 1, index + 1.4], [40, 0, 0, -40]);
  return (
    <motion.div style={{ opacity, y, position: "absolute" }} className="max-w-md">
      <p className="text-[#6366f1] text-[0.6rem] tracking-[0.4em] uppercase mb-3">
        {String(index + 1).padStart(2, "0")} · {phase.label}
      </p>
      <h3
        className="text-4xl md:text-5xl font-bold text-white mb-4"
        style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
      >
        {phase.title}
      </h3>
      <p className="text-white/55 text-base leading-relaxed">{phase.body}</p>
    </motion.div>
  );
}

function ScrollHint({ idx }: { idx: MotionValue<number> }) {
  const opacity = useTransform(idx, (v) => 0.35 + (Math.sin(v * Math.PI) + 1) * 0.1);
  return (
    <motion.span
      aria-hidden
      style={{ opacity }}
      className="block mt-32 text-[0.6rem] tracking-[0.4em] uppercase text-white/30"
    >
      scroll to advance ↓
    </motion.span>
  );
}

function Stage() {
  const progress = useScrollProgress();
  const idx = useTransform(progress, [0, 1], [0, PHASES.length]);

  return (
    <ScrollScenePin>
      <div className="relative h-full w-full flex items-center px-6">
        <div className="orb orb-1" />
        <div className="grid-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full">
            <div className="absolute inset-0 rounded-full border border-[#6366f1]/15" />
            <div className="absolute inset-6 rounded-full border border-[#6366f1]/10" />
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
            <span aria-hidden className="absolute bottom-2 right-2 text-[0.6rem] tracking-[0.3em] uppercase text-[#a5b4fc]/60">
              process
            </span>
          </div>

          <div className="relative min-h-[260px]">
            {PHASES.map((phase, i) => (
              <PhaseCard key={phase.label} phase={phase} index={i} idx={idx} />
            ))}
            <ScrollHint idx={idx} />
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
      <ScrollScene height="400vh">
        <Stage />
      </ScrollScene>
    </section>
  );
}
