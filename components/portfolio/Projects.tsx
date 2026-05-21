"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";

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

function TiltCard({ children, className }: { children: React.ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) translateZ(8px)`;
  };

  const onLeave = () => {
    if (ref.current) {
      ref.current.style.transition = "transform 0.6s ease";
      ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };

  const onEnter = () => {
    if (ref.current) ref.current.style.transition = "none";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.6s ease" }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6" style={{ background: "#0a0a16" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">What I&apos;ve Built</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
          >
            Technical Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="tilt-card bg-white/2 border border-white/6 p-7 h-full flex flex-col shine">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: project.statusColor }}
                      />
                      <span className="text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: project.statusColor }}>
                        {project.status}
                      </span>
                      <span className="text-white/20 text-[0.6rem]">·</span>
                      <span className="text-white/25 text-[0.6rem] tracking-wider">{project.category}</span>
                    </div>
                    <h3
                      className="text-white font-semibold leading-snug text-[1.05rem]"
                      style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
                    >
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    <span className="text-white/20 text-xs font-mono">{project.year}</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/20 hover:text-[#6366f1] transition-colors"
                    >
                      <Code2 size={14} />
                    </a>
                  </div>
                </div>

                <p className="text-white/40 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                {/* Highlights */}
                <ul className="space-y-1 mb-5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-white/30">
                      <span className="text-[#6366f1]/50 mt-0.5 flex-shrink-0">›</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[0.6rem] tracking-wide px-2 py-0.5 border text-[#818cf8]"
                      style={{ background: "rgba(99,102,241,0.06)", borderColor: "rgba(99,102,241,0.15)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
