"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, CheckCircle } from "lucide-react";
import { MaskedText } from "@/lib/motion/MaskedText";
import { MagneticButton } from "@/lib/motion/MagneticButton";

const fields = [
  { id: "name",     label: "Full Name",       type: "text", placeholder: " ", col: 1 },
  { id: "phone",    label: "Phone Number",    type: "tel",  placeholder: " ", col: 1 },
  { id: "email",    label: "Email Address",   type: "email", placeholder: " ", col: 2 },
  { id: "pickup",   label: "Pickup Location", type: "text", placeholder: " ", col: 1 },
  { id: "dest",     label: "Destination",     type: "text", placeholder: " ", col: 1 },
  { id: "date",     label: "Date",            type: "date", placeholder: " ", col: 1 },
  { id: "time",     label: "Time",            type: "time", placeholder: " ", col: 1 },
] as const;

export default function Booking() {
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pending || submitted) return;
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <section id="booking" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Reserve Your Journey</span>
          <span className="gold-line mt-3 mx-auto w-20 block" />
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            <MaskedText delay={0.1} stagger={0.07} duration={0.9}>Book a Chauffeur</MaskedText>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-0 border border-[#c9a84c]/15">
          <motion.div
            className="md:col-span-2 bg-[#c9a84c]/5 border-b md:border-b-0 md:border-r border-[#c9a84c]/10 p-10 flex flex-col justify-between"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="w-px h-24 bg-[#c9a84c] mb-8" />
              <Quote size={24} className="text-[#c9a84c] mb-4" />
              <p
                className="text-white text-xl leading-relaxed italic"
                style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
              >
                &ldquo;Every journey deserves to be an experience, not just a commute.&rdquo;
              </p>
              <p className="text-[#c9a84c] text-sm mt-4 tracking-wider">
                — The Prestige Promise
              </p>
            </div>
            <div className="mt-12 space-y-4">
              {[
                "Fully insured & licensed fleet",
                "Professional, vetted chauffeurs",
                "24/7 customer support",
                "Complimentary water & WiFi",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                  <span className="text-[#aaa] text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-3 bg-[#0f0f0f] p-10 relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="h-full flex flex-col items-center justify-center text-center gap-5 py-16"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  role="status"
                  aria-live="polite"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", damping: 16, stiffness: 200 }}
                    className="w-20 h-20 rounded-full border border-[#c9a84c] flex items-center justify-center"
                  >
                    <CheckCircle size={36} className="text-[#c9a84c]" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <p className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                      Reservation Received
                    </p>
                    <p className="text-[#888] text-sm">
                      We&apos;ll confirm your booking within 30 minutes.
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {fields.map((f) => (
                    <div key={f.id} className={`chauffeur-input-wrap ${f.col === 2 ? "md:col-span-2" : ""}`}>
                      <input
                        id={f.id}
                        type={f.type}
                        placeholder=" "
                        required
                        className="chauffeur-input w-full bg-[#111] border border-[#c9a84c]/15 text-white px-4 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors peer"
                        style={{ colorScheme: f.type === "date" || f.type === "time" ? "dark" : undefined }}
                      />
                      <label htmlFor={f.id} className="chauffeur-floating-label">
                        {f.label}
                      </label>
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <label className="block text-[#888] text-xs tracking-[0.2em] uppercase mb-2">
                      Service Type
                    </label>
                    <select
                      required
                      defaultValue=""
                      className="w-full bg-[#111] border border-[#c9a84c]/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select service</option>
                      <option value="airport">Airport Transfer</option>
                      <option value="corporate">Corporate Travel</option>
                      <option value="wedding">Wedding &amp; Events</option>
                      <option value="tour">City Tour</option>
                      <option value="hourly">Hourly Charter</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[#888] text-xs tracking-[0.2em] uppercase mb-2">
                      Passengers
                    </label>
                    <select
                      required
                      className="w-full bg-[#111] border border-[#c9a84c]/15 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Passenger" : "Passengers"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2 mt-2">
                    <MagneticButton
                      type="submit"
                      pull={10}
                      className="shimmer-gold w-full py-4 text-black font-bold text-sm tracking-[0.25em] uppercase hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                    >
                      {pending ? (
                        <>
                          <motion.span
                            className="inline-block w-4 h-4 border-t-2 border-black rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                          />
                          Processing…
                        </>
                      ) : (
                        "Confirm Reservation"
                      )}
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
