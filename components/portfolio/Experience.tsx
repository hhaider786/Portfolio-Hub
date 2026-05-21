"use client";

import { motion } from "framer-motion";

const experience = [
  {
    company: "Woolworths",
    role: "Night Fill Team Member",
    period: "Aug 2025 — Present",
    location: "Sorell, Tasmania",
    current: true,
    bullets: [
      "Replenish and merchandise stock across departments to tight overnight timelines, maintaining store presentation standards.",
      "Collaborate within a shift team under time pressure — demonstrating consistent attendance and dependability while completing a Master's degree concurrently.",
    ],
  },
  {
    company: "Codegic",
    role: "Software Engineer (Associate)",
    period: "Sep 2023 — Nov 2023",
    location: "Lahore, Pakistan",
    current: false,
    bullets: [
      "Designed and built the Certificate Authority (CA) and Registration Authority (RA) for Khatim — a corporate PKI platform enabling enterprise-level PDF digital signing and document integrity assurance.",
      "Developed Java Spring Boot RESTful APIs for X.509 certificate lifecycle management (issuance, renewal, revocation), deployed via Apache Tomcat with HTTPS/TLS enforcement.",
      "Integrated Hibernate ORM with PostgreSQL for injection-resistant data persistence; delivered across Agile sprints using Jira with cross-functional security engineering teams.",
    ],
  },
];

const education = [
  {
    institution: "University of Tasmania",
    degree: "Master of Information Technology and Systems",
    specialisation: "AI & Cybersecurity",
    period: "Feb 2024 — Jul 2026 (Expected)",
    highlight: "Units: Cybersecurity & Ethical Hacking · Penetration Testing · Big Data Analytics · NLP · Web Development (Distinction) · ICT Project — DSS Government Platform",
  },
  {
    institution: "Information Technology University",
    degree: "Bachelor of Science in Computer Science",
    specialisation: "",
    period: "Aug 2019 — Aug 2023",
    highlight: "Capstone: ATLAS Geospatial Data Service — accepted for national deployment by the Punjab Information Technology Board (PITB).",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Work experience */}
          <div>
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">Where I&apos;ve Worked</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
                Experience
              </h2>
            </motion.div>

            <div className="space-y-8">
              {experience.map((job, i) => (
                <motion.div
                  key={job.company}
                  className="relative pl-5 border-l border-white/8 hover:border-[#6366f1]/40 transition-colors duration-300"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-[#6366f1]"
                    style={{ background: job.current ? "#6366f1" : "#08080f" }} />
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                    <div>
                      <h3 className="text-white font-semibold">{job.role}</h3>
                      <p className="text-[#6366f1] text-sm">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/35 text-xs tracking-wider">{job.period}</p>
                      <p className="text-white/25 text-xs">{job.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mt-3">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-sm text-white/45 leading-relaxed">
                        <span className="text-[#6366f1]/60 mt-1.5 flex-shrink-0">›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-3">Academic Background</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
                Education
              </h2>
            </motion.div>

            <div className="space-y-8">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.institution}
                  className="bg-white/2 border border-white/6 p-6 hover:border-[#6366f1]/30 transition-colors duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div>
                      <p className="text-white font-semibold">{edu.degree}</p>
                      {edu.specialisation && (
                        <p className="text-[#6366f1] text-sm">{edu.specialisation}</p>
                      )}
                      <p className="text-white/50 text-sm mt-0.5">{edu.institution}</p>
                    </div>
                    <p className="text-white/30 text-xs tracking-wider">{edu.period}</p>
                  </div>
                  <p className="text-white/35 text-xs leading-relaxed border-t border-white/5 pt-3 mt-3">
                    {edu.highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
