"use client";

import { motion } from "framer-motion";
import { MaskedText } from "@/lib/motion/MaskedText";

const skillRows = [
  {
    label: "Languages & Frameworks",
    color: "#6366f1",
    direction: "left" as const,
    skills: [
      "TypeScript", "JavaScript (ES2024)", "React 18", "Next.js 16",
      "C# / ASP.NET Core 10", "Java / Spring Boot", "Python / FastAPI",
      "Flask", "SQL", "HTML / CSS",
    ],
  },
  {
    label: "Databases & Data",
    color: "#06b6d4",
    direction: "right" as const,
    skills: [
      "SQL Server 2022", "PostgreSQL / PostGIS", "MongoDB", "SQLite",
      "Entity Framework Core", "Hibernate ORM", "PowerBI OData v4",
      "Redis", "Prisma", "Supabase",
    ],
  },
  {
    label: "AI & Machine Learning",
    color: "#8b5cf6",
    direction: "left" as const,
    skills: [
      "Google Gemini API", "ChromaDB", "RAG Systems", "scikit-learn",
      "XGBoost", "NLP", "SentenceTransformers", "GeoPandas",
      "PySAL / ESDA", "Moran's I / LISA",
    ],
  },
  {
    label: "Security & DevOps",
    color: "#ef4444",
    direction: "right" as const,
    skills: [
      "OWASP Top 10", "Azure Entra ID / MSAL", "JWT", "PBKDF2",
      "X.509 / PKI", "RBAC", "Docker / Compose", "GitHub Actions",
      "Penetration Testing", "HSTS / CSP / XFO",
    ],
  },
];

function SkillMarquee({
  skills, color, direction,
}: {
  skills: string[]; color: string; direction: "left" | "right";
}) {
  const doubled = [...skills, ...skills];
  const isRight = direction === "right";

  return (
    <div
      className="overflow-hidden py-1 group skills-row-scanner"
      style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `${isRight ? "marqueeRight" : "marquee"} ${22 + skills.length * 1.5}s linear infinite`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              border: `1px solid ${color}20`,
              background: `${color}0c`,
              color: `${color}cc`,
              borderRadius: "8px",
              cursor: "default",
              "--badge-color": `${color}60`,
              ...(i % 8 === 0 ? {
                animation: `badgePulse ${4 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.9) % 6}s`,
              } : {}),
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${color}22`;
              el.style.borderColor = `${color}60`;
              el.style.color = color;
              el.style.boxShadow = `0 0 20px ${color}40`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${color}0c`;
              el.style.borderColor = `${color}20`;
              el.style.color = `${color}cc`;
              el.style.boxShadow = "none";
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24" style={{ background: "#0a0a16" }}>
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">What I Work With</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
          >
            <MaskedText delay={0.1} stagger={0.08} duration={0.9}>Technical Skills</MaskedText>
          </h2>
        </motion.div>
      </div>

      <div className="space-y-4">
        {skillRows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: row.direction === "left" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="px-6 mb-2 max-w-6xl mx-auto">
              <span
                className="text-[0.6rem] tracking-[0.25em] uppercase font-medium"
                style={{ color: `${row.color}80` }}
              >
                {row.label}
              </span>
            </div>
            <SkillMarquee skills={row.skills} color={row.color} direction={row.direction} />
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-center text-white/20 text-xs mt-12 tracking-wider px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Hover any tag to highlight · rows pause on hover
      </motion.p>
    </section>
  );
}
