"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { MaskedText } from "@/lib/motion/MaskedText";
import { Tilt3D } from "@/lib/motion/Tilt3D";

const reviews = [
  { name: "Charlotte B.", location: "London", rating: 5, text: "The quality exceeded every expectation. The silk dress is absolutely divine — I've received so many compliments." },
  { name: "Emma R.", location: "Paris", rating: 5, text: "Fast delivery, gorgeous packaging, and the fit is impeccable. Maison has become my go-to for every occasion." },
  { name: "Isabella K.", location: "Milan", rating: 5, text: "Finally found a brand that understands timeless elegance. The blazer is worth every penny — it's a wardrobe staple." },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 36, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label mb-2">Client Reviews</p>
          <h2
            className="text-4xl font-light text-[#111]"
            style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
          >
            <MaskedText delay={0.1} stagger={0.06} duration={0.9}>What Our Clients Say</MaskedText>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {reviews.map((r) => (
            <motion.div key={r.name} variants={cardVariant}>
              <Tilt3D max={6} className="rounded-2xl overflow-hidden h-full">
                <motion.div
                  className="bg-[#fafafa] p-8 border border-[#f0f0f0] rounded-2xl h-full"
                  whileHover={{ y: -5, boxShadow: "0 16px 40px -8px rgba(17,17,17,0.12)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={13} fill="#111" className="text-[#111]" />
                    ))}
                  </div>
                  <p className="text-[#444] text-sm leading-relaxed mb-6 italic">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-[#111] text-sm font-medium">{r.name}</p>
                    <p className="text-[#aaa] text-xs tracking-wider">{r.location}</p>
                  </div>
                </motion.div>
              </Tilt3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
