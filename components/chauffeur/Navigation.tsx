"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { MagneticButton } from "@/lib/motion/MagneticButton";
import { useScrollLock } from "@/lib/a11y/useScrollLock";
import { useEscapeKey } from "@/lib/a11y/useEscapeKey";
import { FocusTrap } from "@/lib/a11y/FocusTrap";

const navLinks = [
  { href: "#fleet", label: "Our Fleet" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useScrollLock(menuOpen);
  useEscapeKey(closeMenu, menuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#c9a84c]/10 py-4"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex flex-col leading-none group">
            <span
              className="text-2xl font-bold tracking-[0.15em] text-white group-hover:text-[#c9a84c] transition-colors duration-300"
              style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
            >
              PRESTIGE
            </span>
            <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#c9a84c]">
              Chauffeur
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-[#aaa] hover:text-[#c9a84c] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a84c] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-sm text-[#aaa] hover:text-[#c9a84c] transition-colors"
            >
              <Phone size={14} />
              <span className="tracking-wider">+1 (234) 567-890</span>
            </a>
            <MagneticButton
              as="a"
              href="#booking"
              pull={14}
              className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all duration-300 font-medium"
            >
              Book Now
            </MagneticButton>
          </div>

          <button
            className="md:hidden text-white w-8 h-8 flex items-center justify-center"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-30 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden
            />
            <motion.div
              key="menu"
              className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <FocusTrap active={menuOpen} restoreFocus>
                <div className="flex flex-col gap-8 pt-28 px-8">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="text-3xl font-light tracking-widest text-white hover:text-[#c9a84c] transition-colors"
                      style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                  <MagneticButton
                    as="a"
                    href="#booking"
                    pull={10}
                    className="mt-4 w-full text-center py-4 border border-[#c9a84c] text-[#c9a84c] tracking-[0.2em] uppercase text-sm"
                    onClick={closeMenu}
                  >
                    Book Now
                  </MagneticButton>
                </div>
              </FocusTrap>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
