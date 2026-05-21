"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-[#111] py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#888] text-[0.65rem] tracking-[0.3em] uppercase mb-3">Join the Edit</p>
          <h2
            className="text-4xl md:text-5xl font-light text-white mb-3"
            style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}
          >
            Get 15% Off Your First Order
          </h2>
          <p className="text-[#666] text-sm mb-8">
            Subscribe for early access to new collections, exclusive offers, and style inspiration.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-sm tracking-wider"
            >
              ✓ &nbsp; Thank you — your discount code is on its way.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/15 text-white placeholder-[#555] px-4 py-3.5 text-sm focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-[#111] px-6 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#f0f0f0] transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[#444] text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
