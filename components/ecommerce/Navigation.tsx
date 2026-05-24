"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useScrollLock } from "@/lib/a11y/useScrollLock";
import { useEscapeKey } from "@/lib/a11y/useEscapeKey";
import { FocusTrap } from "@/lib/a11y/FocusTrap";

const navLinks = [
  { label: "New In", href: "/ecommerce?badge=New#products" },
  { label: "Women", href: "/ecommerce/category/women" },
  { label: "Men", href: "/ecommerce/category/men" },
  { label: "Accessories", href: "/ecommerce/category/accessories" },
  { label: "Sale", href: "/ecommerce/category/sale" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart, hydrated } = useCart();
  const reduced = useReducedMotion();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useScrollLock(menuOpen);
  useEscapeKey(closeMenu, menuOpen);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-4"
        }`}
        initial={reduced ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/ecommerce" className="flex flex-col leading-none" aria-label="Maison — home">
            <span
              className="text-2xl font-semibold tracking-[0.12em] text-[#111]"
              style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
            >
              MAISON
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs tracking-[0.12em] uppercase transition-colors duration-200 relative group ${
                  link.label === "Sale" ? "text-red-500" : "text-[#555] hover:text-[#111]"
                }`}
              >
                {link.label}
                <span aria-hidden className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#111] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/ecommerce/search" aria-label="Search" className="flex text-[#555] hover:text-[#111] transition-colors">
              <Search size={18} aria-hidden />
            </Link>
            <button type="button" aria-label="Wishlist" className="hidden md:flex text-[#555] hover:text-[#111] transition-colors">
              <Heart size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open shopping bag, ${hydrated ? totalItems : 0} ${totalItems === 1 ? "item" : "items"}`}
              className="relative text-[#555] hover:text-[#111] transition-colors"
            >
              <ShoppingBag size={18} aria-hidden />
              {hydrated && totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 min-w-4 h-4 px-1 bg-[#111] text-white text-[0.55rem] rounded-full flex items-center justify-center font-medium"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="lg:hidden text-[#111]"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-30 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden
            />
            <motion.div
              key="menu"
              className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <FocusTrap active={menuOpen} restoreFocus>
                <div>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-4 text-2xl border-b border-[#f0f0f0] ${link.label === "Sale" ? "text-red-500" : "text-[#111]"}`}
                        style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: navLinks.length * 0.04 + 0.1 }}
                    className="mt-8"
                  >
                    <Link
                      href="/ecommerce/search"
                      className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#666] py-2"
                      onClick={closeMenu}
                    >
                      <Search size={14} aria-hidden />
                      Search
                    </Link>
                  </motion.div>
                </div>
              </FocusTrap>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
