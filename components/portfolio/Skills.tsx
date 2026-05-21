"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "Languages & Frameworks",
    color: "#6366f1",
    icon: "⚡",
    skills: [
      { name: "TypeScript / JavaScript", level: 90 },
      { name: "React 18 / Next.js 16", level: 92 },
      { name: "C# / ASP.NET Core 10", level: 85 },
      { name: "Java / Spring Boot", level: 82 },
      { name: "Python / FastAPI", level: 80 },
    ],
  },
  {
    category: "Databases & Data",
    color: "#06b6d4",
    icon: "🗄️",
    skills: [
      { name: "SQL Server / PostgreSQL", level: 85 },
      { name: "MongoDB / NoSQL", level: 78 },
      { name: "Entity Framework Core", level: 82 },
      { name: "Hibernate ORM", level: 75 },
      { name: "PowerBI / OData v4", level: 70 },
    ],
  },
  {
    category: "AI & Machine Learning",
    color: "#8b5cf6",
    icon: "🧠",
    skills: [
      { name: "Google Gemini API / RAG", level: 80 },
      { name: "ChromaDB / Vector Search", level: 75 },
      { name: "scikit-learn / XGBoost", level: 72 },
      { name: "NLP / SentenceTransformers", level: 74 },
      { name: "GeoPandas / ESDA / PySAL", level: 78 },
    ],
  },
  {
    category: "Security & DevOps",
    color: "#ef4444",
    icon: "🔐",
    skills: [
      { name: "OWASP Top 10 / Hardening", level: 85 },
      { name: "Azure Entra ID / MSAL", level: 80 },
      { name: "X.509 / PKI / JWT", level: 82 },
      { name: "Docker / Docker Compose", level: 85 },
      { name: "GitHub Actions CI/CD", level: 80 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-white/60 text-xs tracking-wide group-hover:text-white/80 transition-colors">{name}</span>
        <motion.span
          className="text-[0.65rem] font-mono font-medium"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6" style={{ background: "#0a0a16" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">What I Know</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
          >
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="bg-white/2 border border-white/6 p-7 hover:border-white/10 transition-all duration-300 shine"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
                  style={{ background: `${group.color}18`, border: `1px solid ${group.color}30` }}
                >
                  {group.icon}
                </div>
                <h3 className="text-white/80 text-sm font-medium tracking-wide">{group.category}</h3>
              </div>

              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={group.color}
                    delay={gi * 0.1 + si * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
