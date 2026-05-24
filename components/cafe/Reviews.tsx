"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { MaskedText } from "@/lib/motion/MaskedText";

const reviews = [
  { name: "Amélie T.", platform: "Google", rating: 5, text: "Lumière is an experience unlike any other in the city. The foie gras and the Chateaubriand were perfection. Service was impeccable — discreet yet warm." },
  { name: "James W.", platform: "TripAdvisor", rating: 5, text: "We booked for our anniversary and the team went above and beyond. The sommelier's pairings were extraordinary and the atmosphere is genuinely magical." },
  { name: "Sofia M.", platform: "Google", rating: 5, text: "The best restaurant meal I've had in years. Every dish was a work of art. We'll be back for every special occasion from now on." },
  { name: "Oliver K.", platform: "OpenTable", rating: 5, text: "Exceptional in every way. The miso black cod was sublime and the cocktail menu is the most creative I've encountered in London." },
  { name: "Clara B.", platform: "Google", rating: 5, text: "From the moment you walk in, you know this is somewhere truly special. The warm candlelit setting, the attentive team — Lumière is in a class of its own." },
  { name: "Ravi P.", platform: "TripAdvisor", rating: 5, text: "The Sunday brunch is simply the best in the city. Bottomless champagne, extraordinary food, and service that makes you feel like royalty." },
];

function ReviewCard({ r }: { r: (typeof reviews)[0] }) {
  return (
    <div className="cafe-review-card flex-shrink-0 w-80 bg-[#1a1510] border border-[#d4a853]/10 p-7 mx-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: r.rating }).map((_, j) => (
            <Star key={j} size={12} fill="#d4a853" className="text-[#d4a853]" />
          ))}
        </div>
        <span className="text-[#4a3a2a] text-[0.6rem] tracking-wider uppercase">{r.platform}</span>
      </div>
      <p className="text-[#8a7a65] text-sm leading-relaxed mb-5 italic">&ldquo;{r.text}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-[#d4a853]/10">
        <div className="w-8 h-8 rounded-full bg-[#d4a853]/15 flex items-center justify-center text-[#d4a853] text-xs font-bold">
          {r.name[0]}
        </div>
        <p className="text-[#f5ead8] text-sm" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
          {r.name}
        </p>
      </div>
    </div>
  );
}

export default function Reviews() {
  const doubled = [...reviews, ...reviews];
  // Offset second row by 3 to avoid identical visual sequence
  const doubledRight = [...reviews.slice(3), ...reviews.slice(0, 3), ...reviews.slice(3), ...reviews.slice(0, 3)];

  return (
    <section className="py-24 overflow-hidden" style={{ background: "#12100a" }}>
      <motion.div
        className="text-center mb-14 px-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-eyebrow">Praise from Our Guests</span>
        <span className="amber-line mt-3 mx-auto w-20 block" />
        <h2
          className="text-4xl md:text-5xl font-bold text-[#f5ead8] mt-5"
          style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
        >
          <MaskedText delay={0.1} stagger={0.065} duration={0.9}>Guest Reviews</MaskedText>
        </h2>
      </motion.div>

      {/* First row — left scroll */}
      <div className="marquee-wrapper overflow-hidden mb-4">
        <div className="marquee-track">
          {doubled.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>

      {/* Second row — right scroll for depth */}
      <div className="marquee-wrapper overflow-hidden">
        <div
          className="marquee-track"
          style={{ animationName: "marqueeRight", animationDuration: "50s" }}
        >
          {doubledRight.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
