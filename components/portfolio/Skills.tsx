"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Languages & Frameworks",
    color: "#6366f1",
    skills: ["TypeScript", "JavaScript (React 18)", "C# / ASP.NET Core 10", "Java / Spring Boot", "Python", "SQL", "HTML / CSS"],
  },
  {
    category: "Databases & Data",
    color: "#06b6d4",
    skills: ["SQL Server 2022", "PostgreSQL / PostGIS", "MongoDB", "SQLite", "Entity Framework Core", "Hibernate ORM", "PowerBI OData v4"],
  },
  {
    category: "AI & Machine Learning",
    color: "#8b5cf6",
    skills: ["Google Gemini API", "ChromaDB", "SentenceTransformers", "scikit-learn", "XGBoost", "Natural Language Processing", "RAG Systems"],
  },
  {
    category: "Security",
    color: "#ef4444",
    skills: ["OWASP Top 10", "Azure Entra ID (MSAL)", "JWT", "PBKDF2", "X.509 / PKI", "RBAC", "HSTS / CSP / XSS headers", "Penetration Testing"],
  },
  {
    category: "Spatial & Analytics",
    color: "#10b981",
    skills: ["PySAL / ESDA", "GeoPandas", "GeoServer", "OpenLayers", "Leaflet", "Folium", "Moran's I / LISA clustering"],
  },
  {
    category: "DevOps & Tools",
    color: "#f59e0b",
    skills: ["Docker / Docker Compose", "GitHub Actions CI/CD", "xUnit", "Git", "Jira / Agile", "Figma", "WCAG Accessibility"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6" style={{ background: "#0c0c18" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">What I Know</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
            Technical Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="bg-white/2 border border-white/6 p-6 hover:border-white/12 transition-colors duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: group.color }} />
                <h3 className="text-white/80 text-xs tracking-[0.15em] uppercase font-medium">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[0.65rem] tracking-wide px-2.5 py-1 border text-white/55 hover:text-white/80 transition-colors"
                    style={{ borderColor: `${group.color}20`, background: `${group.color}06` }}
                  >
                    {skill}
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
