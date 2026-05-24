"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Code2 } from "lucide-react";
import { WebGLHero } from "@/lib/motion/WebGLHero";
import { MaskedText } from "@/lib/motion/MaskedText";
import { MagneticButton } from "@/lib/motion/MagneticButton";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const ROLES = [
  "Software Engineer",
  "Full-Stack Developer",
  "AI & Security Specialist",
  "Next.js & React Expert",
  "Open to Opportunities",
];

const PARTICLES = [
  { top: "15%", left: "20%", size: 2.5, dur: "9s",  delay: "0s",   color: 0, px: "20px",  py: "-28px", nx: "-14px", ny: "10px"  },
  { top: "30%", left: "72%", size: 2,   dur: "12s", delay: "1.5s", color: 1, px: "-22px", py: "14px",  nx: "16px",  ny: "-18px" },
  { top: "62%", left: "13%", size: 2.5, dur: "10s", delay: "0.8s", color: 0, px: "26px",  py: "18px",  nx: "-18px", ny: "-10px" },
  { top: "76%", left: "62%", size: 2,   dur: "14s", delay: "2s",   color: 1, px: "-16px", py: "-22px", nx: "12px",  ny: "16px"  },
];

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

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplayed(ROLES[0]);
      return;
    }
    const t = setTimeout(() => setStarted(true), 1400);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !started) return;
    const target = ROLES[roleIndex];
    const speed = isDeleting ? 32 : 72;
    const t = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < target.length) setDisplayed(target.slice(0, displayed.length + 1));
        else setTimeout(() => setIsDeleting(true), 2400);
      } else {
        if (displayed.length > 0) setDisplayed(displayed.slice(0, -1));
        else {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIndex, started, reduced]);

  return (
    <span
      className="text-[#818cf8] text-lg font-light tracking-wide min-w-0"
      aria-live="polite"
      aria-label={`Current role: ${displayed}`}
    >
      {displayed}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="work" className="relative min-h-screen flex items-center pt-24 pb-16" style={{ overflow: "clip" }}>
      <WebGLHero
        palette="violet"
        speed={0.25}
        intensity={0.7}
        className="absolute inset-0 opacity-35"
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Floating micro-particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color === 0 ? "rgba(99,102,241,0.6)" : "rgba(6,182,212,0.5)",
              "--px": p.px,
              "--py": p.py,
              "--nx": p.nx,
              "--ny": p.ny,
              animation: `heroParticle ${p.dur} ease-in-out infinite`,
              animationDelay: p.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="noise-overlay" />
      <div className="grid-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">
          <div>
            <motion.div
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-green-500/25 bg-green-500/10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" aria-hidden />
              <span className="text-green-300 text-[0.65rem] tracking-[0.2em] uppercase font-medium">
                Available for opportunities
              </span>
            </motion.div>

            <h1
              className="mb-5 text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02] tracking-tight"
              style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
            >
              <span className="block text-white">
                <MaskedText delay={0.2} stagger={0.1} duration={1}>Muhammad</MaskedText>
              </span>
              <span className="block gradient-text">
                <MaskedText delay={0.4} stagger={0.1} duration={1}>Haider</MaskedText>
              </span>
              <span className="block text-white">
                <MaskedText delay={0.6} stagger={0.1} duration={1}>Mustafa</MaskedText>
              </span>
            </h1>

            <motion.div
              className="flex items-center gap-2 mb-6 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <Typewriter />
              <span className="w-[2px] h-5 bg-[#6366f1] flex-shrink-0 animate-blink" aria-hidden />
            </motion.div>

            <motion.p
              className="text-white/60 text-base leading-relaxed mb-9 max-w-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Master&apos;s student in AI &amp; Cybersecurity at the University of Tasmania.
              I build production-grade software and client-facing web experiences that are fast,
              secure, and genuinely impressive.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <MagneticButton
                as="a"
                href="#projects"
                className="group relative px-7 py-3.5 bg-[#6366f1] text-white text-xs tracking-[0.15em] uppercase font-medium overflow-hidden shine hover:bg-[#4f52d8] transition-colors inline-flex items-center gap-2 rounded-xl"
              >
                <span>View my work</span>
                <span aria-hidden className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </MagneticButton>
              <MagneticButton
                as="a"
                href="https://github.com/hhaider786"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 border border-white/15 text-white/70 text-xs tracking-[0.15em] uppercase hover:border-[#6366f1]/60 hover:text-white transition-all duration-300 inline-flex items-center gap-2 rounded-xl"
                aria-label="GitHub profile"
              >
                <Code2 size={13} aria-hidden /> GitHub
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#contact"
                className="px-7 py-3.5 border border-white/15 text-white/70 text-xs tracking-[0.15em] uppercase hover:border-[#6366f1]/60 hover:text-white transition-all duration-300 inline-flex items-center gap-2 rounded-xl"
              >
                <Mail size={13} aria-hidden /> Contact
              </MagneticButton>
            </motion.div>

            <motion.div
              className="flex gap-6 sm:gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
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
                  <p className="text-white/40 text-[0.65rem] tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            aria-hidden
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(99,102,241,0.2) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.1)",
                }}
              />
              <div className="relative rounded-2xl border border-white/8 overflow-hidden shadow-2xl"
                style={{ background: "rgba(10,10,20,0.95)", backdropFilter: "blur(20px)" }}>
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                  <span className="ml-3 text-white/25 text-xs font-mono">~/haider — zsh</span>
                </div>

                <pre className="p-6 font-mono text-[0.78rem] space-y-1.5 m-0">
                  <TermLine delay={0.7}>
                    <span className="text-white/30">$ </span>
                    <span className="text-white/70">cat profile.json</span>
                  </TermLine>
                  <TermLine delay={0.9}><span className="text-white/30">{"{"}</span></TermLine>
                  {[
                    { key: "name", val: '"Muhammad Haider Mustafa"', color: "text-[#86efac]", delay: 1.0 },
                    { key: "location", val: '"Hobart, Australia"', color: "text-[#86efac]", delay: 1.1 },
                    { key: "degree", val: '"MIT — AI & Cybersecurity"', color: "text-[#86efac]", delay: 1.2 },
                    { key: "available", val: "true", color: "text-[#34d399]", delay: 1.3 },
                  ].map(({ key, val, color, delay }) => (
                    <TermLine key={key} delay={delay}>
                      <span className="pl-4 text-[#f472b6]">&quot;{key}&quot;</span>
                      <span className="text-white/30">: </span>
                      <span className={color}>{val}</span>
                      <span className="text-white/30">,</span>
                    </TermLine>
                  ))}
                  <TermLine delay={1.4}>
                    <span className="pl-4 text-[#f472b6]">&quot;stack&quot;</span>
                    <span className="text-white/30">: [</span>
                  </TermLine>
                  {["Next.js / React 19", "ASP.NET Core", "Spring Boot", "Python / FastAPI", "Docker · GitHub Actions"].map((s, i) => (
                    <TermLine key={s} delay={1.5 + i * 0.07}>
                      <span className="pl-8 text-[#fbbf24]">&quot;{s}&quot;</span>
                      <span className="text-white/30">,</span>
                    </TermLine>
                  ))}
                  <TermLine delay={1.88}><span className="pl-4 text-white/30">],</span></TermLine>
                  <TermLine delay={1.95}><span className="text-white/30">{"}"}</span></TermLine>
                  <motion.div
                    className="pt-2 flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.05 }}
                  >
                    <span className="text-white/30">$ </span>
                    <span className="w-[7px] h-[14px] bg-[#6366f1] inline-block ml-0.5 animate-blink" />
                  </motion.div>
                </pre>
              </div>

              <motion.div
                className="absolute -top-4 -right-4 bg-[#6366f1] text-white text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1.5 shadow-lg rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.1, type: "spring" }}
              >
                Available now
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -left-3 border border-[#6366f1]/30 bg-[#08080f] text-white/60 text-[0.6rem] tracking-wider px-3 py-1.5 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.3, type: "spring" }}
              >
                Hobart, TAS
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator — positioned relative to section, not content div */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-hidden
      >
        <span className="text-white/30 text-[0.6rem] tracking-[0.3em] uppercase mb-1">Scroll</span>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.0, ease: "easeOut" }}
          style={{ width: 1, background: "rgba(99,102,241,0.5)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: [0, 1, 0.6, 1], y: [0, 5, 0] }}
          transition={{ delay: 3.1, duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={12} className="text-[#6366f1]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
