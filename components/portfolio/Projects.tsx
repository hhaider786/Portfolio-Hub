"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    name: "DSS — Tasmanian Government Platform",
    year: "2026",
    status: "In Stakeholder Testing",
    statusColor: "#10b981",
    description: "Commissioned by the Department of Premier and Cabinet (DPAC). A production three-tier platform replacing manual spreadsheet-based reporting workflows for 100+ projected government users.",
    stack: ["React 18", "ASP.NET Core 10", "SQL Server", "Azure Entra ID", "Docker", "GitHub Actions"],
    highlights: ["14+ interactive dynamic field components", "OWASP security hardening + audit logging", "PowerBI OData v4 integration", "MSAL auth with DB-backed role injection"],
    github: "https://github.com/hhaider786",
  },
  {
    name: "ATLAS — Enterprise Geospatial Data Service",
    year: "2022–23",
    status: "Deployed Nationally",
    statusColor: "#6366f1",
    description: "Led a 4-person team to build a geospatial platform accepted by the Punjab Information Technology Board (PITB) for national-level deployment across Pakistan.",
    stack: ["React", "OpenLayers", "GeoServer", "PostgreSQL/PostGIS", "MongoDB", "Node.js"],
    highlights: ["First-known MongoDB-compatible WFS-Transaction server", "Dual-database architecture: 10× query improvement", "Custom XML/GML push-parse-pop parser", "Real-time spatial data rendering"],
    github: "https://github.com/hhaider786",
  },
  {
    name: "WWII Q&A RAG System",
    year: "2024",
    status: "Personal Project",
    statusColor: "#8b5cf6",
    description: "Document-grounded question answering system with a 4-mode query router combining retrieval-augmented generation with Gemini API function calling.",
    stack: ["Python", "Google Gemini API", "ChromaDB", "SentenceTransformers", "Gradio"],
    highlights: ["4-mode router: RAG ONLY, TOOL ONLY, RAG+TOOLS, GEMINI ONLY", "ChromaDB vector store with semantic search", "Gradio web interface"],
    github: "https://github.com/hhaider786",
  },
  {
    name: "Banking Application Security Audit",
    year: "2024",
    status: "Security Research",
    statusColor: "#ef4444",
    description: "Identified and remediated 7 CWEs in a banking application with documented before/after code comparisons and full remediation rationale.",
    stack: ["Python", "SQLite", "PBKDF2", "secrets module"],
    highlights: ["SQL injection (CWE-89)", "Plaintext password storage (CWE-256)", "Timing attacks (CWE-208)", "Path traversal (CWE-22)"],
    github: "https://github.com/hhaider786",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6" style={{ background: "#0c0c18" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">What I&apos;ve Built</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
            Technical Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              className="bg-white/2 border border-white/6 p-7 hover:border-[#6366f1]/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.statusColor }} />
                    <span className="text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: project.statusColor }}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold leading-snug"
                    style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
                    {project.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-white/25 text-xs">{project.year}</span>
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="text-white/20 hover:text-white/60 transition-colors">
                    <Code2 size={14} />
                  </a>
                </div>
              </div>

              <p className="text-white/45 text-sm leading-relaxed mb-4">{project.description}</p>

              <ul className="space-y-1 mb-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-white/35">
                    <span className="text-[#6366f1]/50 mt-0.5">›</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {project.stack.map((s) => (
                  <span key={s}
                    className="text-[0.6rem] tracking-wide px-2 py-0.5 bg-[#6366f1]/8 border border-[#6366f1]/12 text-[#818cf8]">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
