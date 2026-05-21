"use client";

import { motion } from "framer-motion";
import { Code2, Briefcase, Mail, MapPin, ArrowDown } from "lucide-react";

const roles = ["Software Engineer", "Full-Stack Developer", "AI & Security Specialist", "Web Experience Builder"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs tracking-[0.2em] uppercase">Available for opportunities</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              Muhammad
              <br />
              <span className="text-[#6366f1]">Haider</span>
              <br />
              Mustafa
            </motion.h1>

            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              {["Software Engineer", "React & Next.js", "AI & Cybersecurity", "Java Spring Boot"].map((tag) => (
                <span key={tag}
                  className="text-[0.65rem] tracking-[0.15em] uppercase px-3 py-1.5 border border-[#6366f1]/25 text-[#818cf8] bg-[#6366f1]/5">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.p
              className="text-white/50 text-base leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              Master&apos;s student in AI &amp; Cybersecurity at the University of Tasmania.
              I build production-grade software — from government platforms to luxury client websites —
              with a focus on security, performance, and elegant user experience.
            </motion.p>

            <motion.div
              className="flex items-center gap-2 text-white/35 text-sm mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              <MapPin size={13} />
              <span>Hobart, Tasmania, Australia</span>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a href="#work"
                className="flex items-center gap-2 px-6 py-3 bg-[#6366f1] text-white text-xs tracking-[0.15em] uppercase hover:bg-[#4f52d8] transition-colors">
                View My Work
              </a>
              <a href="https://github.com/hhaider786" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 border border-white/15 text-white/60 text-xs tracking-[0.15em] uppercase hover:border-white/40 hover:text-white transition-all">
                <Code2 size={13} />
                GitHub
              </a>
              <a href="mailto:haidermustafa2012@gmail.com"
                className="flex items-center gap-2 px-5 py-3 border border-white/15 text-white/60 text-xs tracking-[0.15em] uppercase hover:border-white/40 hover:text-white transition-all">
                <Mail size={13} />
                Email Me
              </a>
            </motion.div>
          </div>

          {/* Right: code card */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="bg-[#0f0f1c] border border-white/8 rounded-lg overflow-hidden font-mono text-sm">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/3 border-b border-white/5">
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                ))}
                <span className="ml-3 text-white/20 text-xs">haider.ts</span>
              </div>
              <div className="p-5 space-y-1.5 text-[0.8rem]">
                <p><span className="text-[#818cf8]">const</span> <span className="text-[#7dd3fc]">engineer</span> <span className="text-white/50">=</span> <span className="text-white/30">{"{"}</span></p>
                <p className="pl-5"><span className="text-[#f472b6]">name</span><span className="text-white/30">:</span> <span className="text-[#86efac]">&quot;Muhammad Haider Mustafa&quot;</span><span className="text-white/30">,</span></p>
                <p className="pl-5"><span className="text-[#f472b6]">location</span><span className="text-white/30">:</span> <span className="text-[#86efac]">&quot;Hobart, Australia&quot;</span><span className="text-white/30">,</span></p>
                <p className="pl-5"><span className="text-[#f472b6]">education</span><span className="text-white/30">:</span> <span className="text-[#86efac]">&quot;MIT — AI &amp; Cybersecurity&quot;</span><span className="text-white/30">,</span></p>
                <p className="pl-5"><span className="text-[#f472b6]">stack</span><span className="text-white/30">: [</span></p>
                {["React", "Next.js", "ASP.NET Core", "Java Spring Boot", "Python", "Docker"].map((s) => (
                  <p key={s} className="pl-10"><span className="text-[#fbbf24]">&quot;{s}&quot;</span><span className="text-white/30">,</span></p>
                ))}
                <p className="pl-5"><span className="text-white/30">],</span></p>
                <p className="pl-5"><span className="text-[#f472b6]">focus</span><span className="text-white/30">: [</span><span className="text-[#fbbf24]">&quot;Security&quot;</span><span className="text-white/30">, </span><span className="text-[#fbbf24]">&quot;AI&quot;</span><span className="text-white/30">, </span><span className="text-[#fbbf24]">&quot;Web&quot;</span><span className="text-white/30">],</span></p>
                <p className="pl-5"><span className="text-[#f472b6]">available</span><span className="text-white/30">:</span> <span className="text-[#86efac]">true</span></p>
                <p><span className="text-white/30">{"}"}</span></p>
                <p className="text-white/20 mt-2 text-[0.75rem]"><span style={{ animation: "blink 1s step-end infinite", display: "inline-block", width: 8, background: "#6366f1", height: "1em", verticalAlign: "text-bottom" }} /></p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} className="text-white/25" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
