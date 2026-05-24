"use client";

import { motion } from "framer-motion";
import { Plane, Briefcase, Star, MapPin } from "lucide-react";
import { MaskedText } from "@/lib/motion/MaskedText";
import { MagneticButton } from "@/lib/motion/MagneticButton";
import { Tilt3D } from "@/lib/motion/Tilt3D";

const services = [
  {
    icon: Plane,
    title: "Airport Transfers",
    description:
      "Seamless, punctual transfers to and from all major airports. Flight tracking ensures we're always there — even if you're early or delayed.",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    description:
      "Make the right impression with every corporate journey. Discreet, professional service for executives and business delegations.",
  },
  {
    icon: Star,
    title: "Weddings & Events",
    description:
      "Arrive in unforgettable style on your most important day. Beautifully presented vehicles with experienced bridal chauffeurs.",
  },
  {
    icon: MapPin,
    title: "City Tours & Leisure",
    description:
      "Explore the city at your own pace in absolute comfort. Custom routes, insider knowledge, and complete flexibility.",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 36, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">What We Offer</span>
          <span className="gold-line mt-3 mx-auto w-20 block" />
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            <MaskedText delay={0.1} stagger={0.07} duration={0.9}>Our Services</MaskedText>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={cardVariant}>
                <Tilt3D max={8} className="rounded-2xl overflow-hidden h-full">
                  <motion.div
                    className="group relative bg-[#111]/80 border border-[#c9a84c]/10 p-8 h-full"
                    whileHover={{
                      y: -6,
                      borderColor: "rgba(201,168,76,0.4)",
                      boxShadow: "0 24px 56px -12px rgba(201,168,76,0.22), 0 8px 20px -6px rgba(201,168,76,0.1)",
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c9a84c]/0 group-hover:border-[#c9a84c]/80 transition-all duration-500" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c9a84c]/0 group-hover:border-[#c9a84c]/80 transition-all duration-500" />

                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center group-hover:bg-[#c9a84c]/20 transition-colors duration-300">
                        <Icon size={22} className="text-[#c9a84c]" />
                      </div>

                      <div>
                        <h3
                          className="text-xl font-semibold text-white mb-3"
                          style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-[#888] leading-relaxed text-sm">{service.description}</p>
                        <MagneticButton
                          as="a"
                          href="#booking"
                          pull={8}
                          className="inline-flex items-center gap-2 mt-5 text-[#c9a84c] text-xs tracking-[0.2em] uppercase hover:gap-3 transition-all duration-300"
                        >
                          Book This Service <span>→</span>
                        </MagneticButton>
                      </div>
                    </div>
                  </motion.div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
