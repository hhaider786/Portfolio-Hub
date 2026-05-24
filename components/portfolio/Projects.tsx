"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Tilt3D } from "@/lib/motion/Tilt3D";

const projects = [
  {
    name: "DSS — Tasmanian Government Platform",
    year: "2026",
    status: "In Stakeholder Testing",
    statusColor: "#10b981",
    category: "Full-Stack • Gov",
    description:
      "Commissioned by the Dept. of Premier & Cabinet. A production three-tier platform replacing manual spreadsheet-based reporting for 100+ projected government users.",
    stack: ["React 18", "ASP.NET Core 10", "SQL Server", "Azure Entra ID", "Docker", "GitHub Actions"],
    highlights: [
      "14+ dynamic field components with drag-and-drop",
      "OWASP hardening + immutable audit logging",
      "PowerBI OData v4 & CSV exports",
      "MSAL auth with DB-backed role injection",
    ],
    github: "https://github.com/hhaider786",
  },
  {
    name: "ATLAS — Enterprise Geospatial Service",
    year: "2022–23",
    status: "Deployed Nationally",
    statusColor: "#6366f1",
    category: "Full-Stack • GIS",
    description:
      "Led a 4-person team building a geospatial platform accepted by Punjab IT Board (PITB) for national deployment across Pakistan.",
    stack: ["React", "OpenLayers", "GeoServer", "PostgreSQL/PostGIS", "MongoDB", "Node.js"],
    highlights: [
      "First-known MongoDB-compatible WFS-Transaction server",
      "Dual-database: 10× query performance improvement",
      "Custom XML/GML push-parse-pop parser",
      "Real-time spatial data rendering",
    ],
    github: "https://github.com/hhaider786",
  },
  {
    name: "WWII Q&A RAG System",
    year: "2024",
    status: "Personal Project",
    statusColor: "#8b5cf6",
    category: "AI • NLP",
    description:
      "Document-grounded question answering with a 4-mode query router combining RAG, Gemini API function calling, and ChromaDB vector search.",
    stack: ["Python", "Google Gemini API", "ChromaDB", "SentenceTransformers", "Gradio"],
    highlights: [
      "4-mode router: RAG / TOOL / RAG+TOOL / GEMINI",
      "ChromaDB semantic vector search",
      "Gemini function calling for structured queries",
      "Gradio web interface with chat UI",
    ],
    github: "https://github.com/hhaider786",
  },
  {
    name: "Banking Application Security Audit",
    year: "2024",
    status: "Security Research",
    statusColor: "#ef4444",
    category: "Security • Python",
    description:
      "Identified and remediated 7 CWEs in a banking application with documented before/after code comparisons and full remediation rationale.",
    stack: ["Python", "SQLite", "PBKDF2", "secrets module"],
    highlights: [
      "SQL injection (CWE-89) remediation",
      "Plaintext password → PBKDF2 hashing (CWE-256)",
      "Timing attack mitigation (CWE-208)",
      "Path traversal fix (CWE-22)",
    ],
    github: "https://github.com/hhaider786",
  },
];

function ProjectCard({ project, i, hoveredCard, setHoveredCard }: {
  project: typeof projects[0];
  i: number;
  hoveredCard: number | null;
  setHoveredCard: (n: number | null) => void;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ gridArea: `c${i}` }}
      className="project-card-wrap"
      onMouseEnter={() => setHoveredCard(i)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <Tilt3D
        max={6}
        className={`project-card relative border border-white/8 p-7 h-full overflow-hidden shine rounded-2xl ${
          hoveredCard === i ? "conic-border" : "bg-white/[0.02]"
        }`}
      >
        <article className="flex flex-col h-full relative">
          {/* Ghost project number */}
          <span
            aria-hidden
            className="absolute -top-3 -right-2 pointer-events-none select-none font-bold"
            style={{
              fontFamily: "var(--font-syne-var), sans-serif",
              fontSize: "clamp(5rem, 10vw, 7rem)",
              lineHeight: 1,
              color: "rgba(99,102,241,0.06)",
              zIndex: 0,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <header className="flex items-start justify-between gap-3 mb-3 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: project.statusColor }}
                  aria-hidden
                />
                <span className="text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: project.statusColor }}>
                  {project.status}
                </span>
                <span className="text-white/25 text-[0.6rem]" aria-hidden>·</span>
                <span className="text-white/35 text-[0.6rem] tracking-wider">{project.category}</span>
              </div>
              <h3
                className="text-white font-semibold leading-snug text-[1.05rem]"
                style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
              >
                {project.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 mt-1">
              <span className="text-white/30 text-xs font-mono">{project.year}</span>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="text-white/30 hover:text-[#6366f1] transition-colors"
              >
                <Code2 size={14} aria-hidden />
              </a>
            </div>
          </header>

          <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1 relative z-10">{project.description}</p>

          <ul className="space-y-1 mb-5 relative z-10">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs text-white/45">
                <span className="text-[#6366f1]/60 mt-0.5 flex-shrink-0" aria-hidden>›</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 relative z-10" aria-label={`Tech stack: ${project.stack.join(", ")}`}>
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-[0.6rem] tracking-wide px-2 py-0.5 border text-[#a5b4fc]"
                style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.2)", borderRadius: "6px" }}
              >
                {s}
              </span>
            ))}
          </div>
        </article>
      </Tilt3D>
    </motion.div>
  );
}

export default function Projects() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 px-6 section-cv" style={{ background: "#0a0a16" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">What I&apos;ve built</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
          >
            Technical Projects
          </h2>
        </motion.div>

        {/* Mobile: single column */}
        <div className="grid grid-cols-1 gap-5 md:hidden">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} i={i} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
          ))}
        </div>

        {/* Desktop: asymmetric — card0 full width, card1+card2 side-by-side, card3 full width */}
        <div
          className="hidden md:grid gap-5"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateAreas: '"c0 c0" "c1 c2" "c3 c3"',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} i={i} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
          ))}
        </div>
      </div>
    </section>
  );
}
