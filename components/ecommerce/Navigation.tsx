"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = ["Collections", "New In", "Women", "Men", "Accessories", "Sale"];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-4"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none">
            <span
              className="text-2xl font-semibold tracking-[0.12em] text-[#111]"
              style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
            >
              MAISON
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className={`text-xs tracking-[0.12em] uppercase transition-colors duration-200 relative group ${
                  link === "Sale" ? "text-red-500" : "text-[#555] hover:text-[#111]"
                }`}
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#111] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex text-[#555] hover:text-[#111] transition-colors">
              <Search size={18} />
            </button>
            <button className="hidden md:flex text-[#555] hover:text-[#111] transition-colors">
              <Heart size={18} />
            </button>
            <button
              onClick={openCart}
              className="relative text-[#555] hover:text-[#111] transition-colors"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-[#111] text-white text-[0.55rem] rounded-full flex items-center justify-center font-medium"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button className="lg:hidden text-[#111]" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                className={`py-4 text-2xl border-b border-[#f0f0f0] ${
                  link === "Sale" ? "text-red-500" : "text-[#111]"
                }`}
                style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
