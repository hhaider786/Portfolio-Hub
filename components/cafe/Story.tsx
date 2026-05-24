"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { MaskedText } from "@/lib/motion/MaskedText";

const STORY_IMG = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85";

function CountUp({ target, suffix = "", duration = 1400 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = 16;
          const increment = target / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else { setCount(Math.floor(start)); }
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const statVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Story() {
  return (
    <section id="story" className="py-24 md:py-32 px-6 section-cv" style={{ background: "#12100a" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative w-full h-[480px] overflow-hidden">
            <ImageWithBlur src={STORY_IMG} alt="Chef Élise Moreau plating a course in the Lumière kitchen" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <motion.div
            className="cafe-frame-deco absolute -bottom-5 -right-5 w-36 h-36 border border-[#e8be63]/30 hidden md:block"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            aria-hidden
          />
          <motion.div
            className="cafe-frame-deco-alt absolute -top-5 -left-5 w-36 h-36 border border-[#e8be63]/15 hidden md:block"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7 }}
            aria-hidden
          />
          <motion.div
            className="absolute bottom-8 left-8 bg-[#12100a]/90 border border-[#e8be63]/25 px-5 py-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="text-[#e8be63] text-[0.6rem] tracking-[0.3em] uppercase mb-1">Established</p>
            <p className="text-[#f5ead8] text-3xl font-bold" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>2019</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="section-eyebrow">Our story</span>
          <span className="amber-line mt-3 mb-6 w-20 block" aria-hidden />
          <h2 className="text-4xl md:text-5xl font-bold text-[#f5ead8] mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
            <MaskedText delay={0.1} stagger={0.065} duration={0.9}>Born from passion,</MaskedText>
            <br />
            <em><MaskedText delay={0.4} stagger={0.065} duration={0.9}>crafted with purpose.</MaskedText></em>
          </h2>
          <motion.p
            className="text-[#b8a380] leading-relaxed mb-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Lumière was born from a single obsession: to bring the warmth and artistry of Parisian dining to a city that deserved it. Founded by chef Élise Moreau, every dish on our menu is a love letter to the seasons, the producers, and the stories behind each ingredient.
          </motion.p>
          <motion.p
            className="text-[#b8a380] leading-relaxed mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            We believe dining is more than sustenance — it is theatre, conversation, and memory. From our hand-laid floors to our single-origin wine cellar, every detail at Lumière has been chosen to make your evening truly unforgettable.
          </motion.p>

          <motion.dl
            className="grid grid-cols-3 gap-6 pt-6 border-t border-[#e8be63]/15"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { target: 6,  label: "Years open",    duration: 1200 },
              { target: 12, label: "Awards won",    duration: 1400 },
              { target: 2,  label: "Michelin stars", duration: 1000 },
            ].map((s) => (
              <motion.div key={s.label} variants={statVariant}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <p className="text-[#e8be63] text-3xl font-bold" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                    <CountUp target={s.target} duration={s.duration} />
                  </p>
                  <p className="text-[#a09070] text-xs tracking-wider uppercase mt-1">{s.label}</p>
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
