"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Briefcase, Code2, MapPin, ArrowUpRight } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", value: "haidermustafa2012@gmail.com", href: "mailto:haidermustafa2012@gmail.com" },
  { icon: Phone, label: "Phone", value: "+61 435 744 943", href: "tel:+61435744943" },
  { icon: Briefcase, label: "LinkedIn", value: "linkedin.com/in/haider-mustafa-03104b196", href: "https://linkedin.com/in/haider-mustafa-03104b196" },
  { icon: Code2, label: "GitHub", value: "github.com/hhaider786", href: "https://github.com/hhaider786" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
            Let&apos;s Work Together
          </h2>
          <p className="text-white/45 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Currently completing my Master&apos;s and open to web development contracts, freelance projects, and graduate opportunities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-5 bg-white/2 border border-white/6 hover:border-[#6366f1]/40 hover:bg-[#6366f1]/3 transition-all duration-300 text-left group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-10 h-10 bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6366f1]/20 transition-colors">
                  <link.icon size={16} className="text-[#6366f1]" />
                </div>
                <div className="min-w-0">
                  <p className="text-white/30 text-[0.65rem] tracking-wider uppercase mb-0.5">{link.label}</p>
                  <p className="text-white/70 text-sm truncate group-hover:text-white transition-colors">{link.value}</p>
                </div>
                <ArrowUpRight size={14} className="text-white/15 group-hover:text-[#6366f1] transition-colors ml-auto flex-shrink-0" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-white/25 text-sm">
            <MapPin size={13} />
            <span>Hobart, Tasmania, Australia</span>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/5 mt-20 pt-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© 2025 Muhammad Haider Mustafa. All rights reserved.</p>
          <p className="text-white/15 text-xs">Built with Next.js 16 · Tailwind v4 · Framer Motion</p>
        </div>
      </div>
    </section>
  );
}
