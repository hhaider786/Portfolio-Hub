"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Women", href: "/ecommerce/category/women" },
      { label: "Men", href: "/ecommerce/category/men" },
      { label: "Accessories", href: "/ecommerce/category/accessories" },
      { label: "New In", href: "/ecommerce?badge=New#products" },
      { label: "Sale", href: "/ecommerce/category/sale" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & Returns", href: "/ecommerce" },
      { label: "Size Guide", href: "/ecommerce" },
      { label: "Contact Us", href: "/ecommerce" },
      { label: "FAQ", href: "/ecommerce" },
      { label: "Track Order", href: "/ecommerce" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Maison", href: "/ecommerce" },
      { label: "Sustainability", href: "/ecommerce" },
      { label: "Press", href: "/ecommerce" },
      { label: "Careers", href: "/ecommerce" },
      { label: "Stores", href: "/ecommerce" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const colVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#f0f0f0]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <motion.div
        className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div className="col-span-2 md:col-span-1" variants={colVariant}>
          <p className="text-2xl tracking-[0.12em] text-[#111] mb-3" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
            MAISON
          </p>
          <p className="text-[#666] text-sm leading-relaxed">
            Curated fashion for the modern wardrobe. Quality, elegance, and sustainability — since 2018.
          </p>
        </motion.div>
        {columns.map((col) => (
          <motion.nav key={col.title} aria-label={col.title} variants={colVariant}>
            <h3 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#111] font-medium mb-4">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="ecommerce-footer-link text-[#666] text-sm hover:text-[#111] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        ))}
      </motion.div>
      <div className="border-t border-[#f0f0f0]">
        <motion.div
          className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <p className="text-[#888] text-xs">© {new Date().getFullYear()} Maison. All rights reserved.</p>
          <ul className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <li key={item}>
                <Link href="/ecommerce" className="ecommerce-footer-link text-[#888] text-xs hover:text-[#111] transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </footer>
  );
}
