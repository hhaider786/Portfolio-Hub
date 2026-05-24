"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Briefcase } from "lucide-react";
import Link from "next/link";
import { FocusTrap } from "@/lib/a11y/FocusTrap";
import { useScrollLock } from "@/lib/a11y/useScrollLock";
import { useEscapeKey } from "@/lib/a11y/useEscapeKey";

const links = [
  { label: "Demos", href: "#demos" },
  { label: "Process", href: "#process" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useScrollLock(open);
  useEscapeKey(() => setOpen(false), open);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#08080f]/95 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Haider Mustafa — home">
            <div className="w-8 h-8 bg-[#6366f1] flex items-center justify-center text-white text-xs font-bold tracking-wider"
              style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
              HM
            </div>
            <span className="text-white/70 text-xs tracking-[0.2em] uppercase hidden sm:block">
              Haider Mustafa
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs tracking-[0.15em] uppercase text-white/60 hover:text-[#6366f1] transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/hhaider786"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Code2 size={16} aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-haider-mustafa-03104b196/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Briefcase size={16} aria-hidden />
            </a>
            <a
              href="#contact"
              className="px-4 py-2 bg-[#6366f1] text-white text-xs tracking-[0.15em] uppercase hover:bg-[#4f52d8] transition-colors"
            >
              Hire me
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-white/80"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-[#08080f] flex flex-col pt-24 px-8"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <FocusTrap active className="flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="py-4 text-2xl text-white/85 border-b border-white/5 hover:text-[#6366f1] transition-colors"
                  style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
