"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown, Mail, Code2, ExternalLink } from "lucide-react";

const ROLES = [
  "Software Engineer",
  "Full-Stack Developer",
  "AI & Security Specialist",
  "Next.js & React Expert",
  "Open to Opportunities",
];

/* ── Magnetic button ──────────────────────────────────────────── */
function MagBtn({
  children, href, className, target,
}: {
  children: React.ReactNode; href: string; className: string; target?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };

  return (
    <motion.a
      ref={ref} href={href} target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.a>
  );
}

/* ── Animated terminal line ───────────────────────────────────── */
function TermLine({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Main hero ────────────────────────────────────────────────── */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const target = ROLES[roleIndex];
    const speed = isDeleting ? 32 : 72;
    const t = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < target.length) {
          setDisplayed(target.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIndex, started]);

  const words = ["Muhammad", "Haider", "Mustafa"];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16" style={{ overflow: "clip" }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="noise-overlay" />
      <div className="grid-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div>
            {/* Available pill */}
            <motion.div
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="text-green-400 text-[0.65rem] tracking-[0.2em] uppercase font-medium">
                Available for opportunities
              </span>
            </motion.div>

            {/* Name — word-by-word clip reveal (premium effect) */}
            <div className="mb-5">
              {words.map((word, i) => (
                <div key={word} style={{ overflow: "hidden", lineHeight: 1.05 }}>
                  <motion.h1
                    className={`block text-[clamp(3rem,8vw,6rem)] font-bold leading-none tracking-tight ${
                      i === 1 ? "gradient-text" : "text-white"
                    }`}
                    style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.11, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Typewriter role */}
            <motion.div
              className="flex items-center gap-2 mb-6 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              <span className="text-[#818cf8] text-lg font-light tracking-wide min-w-0">
                {displayed}
              </span>
              <span className="w-[2px] h-5 bg-[#6366f1] flex-shrink-0 animate-blink" />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-white/45 text-base leading-relaxed mb-9 max-w-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              Master&apos;s student in AI &amp; Cybersecurity at the University of Tasmania.
              I build production-grade software and client-facing web experiences that are fast,
              secure, and genuinely impressive.
            </motion.p>

            {/* Magnetic CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <MagBtn
                href="#work"
                className="group relative px-7 py-3.5 bg-[#6366f1] text-white text-xs tracking-[0.15em] uppercase font-medium overflow-hidden shine hover:bg-[#4f52d8] transition-colors"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
                </span>
              </MagBtn>
              <MagBtn
                href="https://github.com/hhaider786"
                target="_blank"
                className="px-7 py-3.5 border border-white/12 text-white/55 text-xs tracking-[0.15em] uppercase hover:border-[#6366f1]/60 hover:text-white transition-all duration-300"
              >
                <span className="flex items-center gap-2"><Code2 size={13} />GitHub</span>
              </MagBtn>
              <MagBtn
                href="mailto:haidermustafa2012@gmail.com"
                className="px-7 py-3.5 border border-white/12 text-white/55 text-xs tracking-[0.15em] uppercase hover:border-[#6366f1]/60 hover:text-white transition-all duration-300"
              >
                <span className="flex items-center gap-2"><Mail size={13} />Contact</span>
              </MagBtn>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {[
                { value: "4+", label: "Years Coding" },
                { value: "10+", label: "Projects Built" },
                { value: "2", label: "Master's Specialisations" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-white/25 text-[0.65rem] tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Animated terminal ── */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            <div className="relative">
              {/* Glow behind card */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(99,102,241,0.2) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.1)",
                }}
              />

              {/* Terminal */}
              <div className="relative rounded-xl border border-white/8 overflow-hidden shadow-2xl"
                style={{ background: "rgba(10,10,20,0.95)", backdropFilter: "blur(20px)" }}>

                {/* Traffic lights bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  {["#ff5f57","#febc2e","#28c840"].map((c) => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                  <span className="ml-3 text-white/15 text-xs font-mono">~/haider — zsh</span>
                </div>

                {/* Code content */}
                <div className="p-6 font-mono text-[0.78rem] space-y-1.5">
                  <TermLine delay={0.7}>
                    <span className="text-white/25">$ </span>
                    <span className="text-white/60">cat profile.json</span>
                  </TermLine>

                  <TermLine delay={0.9}>
                    <span className="text-white/20">{"{"}</span>
                  </TermLine>

                  {[
                    { key: "name", val: '"Muhammad Haider Mustafa"', color: "text-[#86efac]", delay: 1.0 },
                    { key: "location", val: '"Hobart, Australia 🇦🇺"', color: "text-[#86efac]", delay: 1.1 },
                    { key: "degree", val: '"MIT — AI & Cybersecurity"', color: "text-[#86efac]", delay: 1.2 },
                    { key: "available", val: "true", color: "text-[#34d399]", delay: 1.3 },
                  ].map(({ key, val, color, delay }) => (
                    <TermLine key={key} delay={delay}>
                      <span className="pl-4 text-[#f472b6]">&quot;{key}&quot;</span>
                      <span className="text-white/30">: </span>
                      <span className={color}>{val}</span>
                      <span className="text-white/20">,</span>
                    </TermLine>
                  ))}

                  <TermLine delay={1.4}>
                    <span className="pl-4 text-[#f472b6]">&quot;stack&quot;</span>
                    <span className="text-white/30">: [</span>
                  </TermLine>

                  {["Next.js / React 18", "ASP.NET Core 10", "Java Spring Boot", "Python / FastAPI", "Docker + GitHub Actions"].map((s, i) => (
                    <TermLine key={s} delay={1.5 + i * 0.07}>
                      <span className="pl-8 text-[#fbbf24]">&quot;{s}&quot;</span>
                      <span className="text-white/20">,</span>
                    </TermLine>
                  ))}

                  <TermLine delay={1.88}>
                    <span className="pl-4 text-white/20">],</span>
                  </TermLine>
                  <TermLine delay={1.95}>
                    <span className="text-white/20">{"}"}</span>
                  </TermLine>

                  <motion.div
                    className="pt-2 flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.05 }}
                  >
                    <span className="text-white/25">$ </span>
                    <span className="w-[7px] h-[14px] bg-[#6366f1] inline-block ml-0.5 animate-blink" />
                  </motion.div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-[#6366f1] text-white text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1.5 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.1, type: "spring" }}
              >
                Available Now
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3 border border-[#6366f1]/30 bg-[#08080f] text-white/50 text-[0.6rem] tracking-wider px-3 py-1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.3, type: "spring" }}
              >
                Hobart, TAS 🌏
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-white/20 text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={14} className="text-[#6366f1]/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
