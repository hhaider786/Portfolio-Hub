"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Charlotte B.", location: "London", rating: 5, text: "The quality exceeded every expectation. The silk dress is absolutely divine — I've received so many compliments." },
  { name: "Emma R.", location: "Paris", rating: 5, text: "Fast delivery, gorgeous packaging, and the fit is impeccable. Maison has become my go-to for every occasion." },
  { name: "Isabella K.", location: "Milan", rating: 5, text: "Finally found a brand that understands timeless elegance. The blazer is worth every penny — it's a wardrobe staple." },
];

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
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              className="bg-[#fafafa] p-8 border border-[#f0f0f0]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
          ))}
        </div>
      </div>
    </section>
  );
}
