"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Briefcase, Code2, MapPin, ArrowUpRight, Send } from "lucide-react";
import { sendContact } from "@/app/actions/contact";
import type { ActionResult, FieldError } from "@/lib/actions/validation";

const initial: ActionResult = { status: "idle" };

const links = [
  { icon: Mail, label: "Email", value: "haidermustafa2012@gmail.com", href: "mailto:haidermustafa2012@gmail.com" },
  { icon: Phone, label: "Phone", value: "+61 435 744 943", href: "tel:+61435744943" },
  { icon: Briefcase, label: "LinkedIn", value: "linkedin.com/in/haider-mustafa", href: "https://www.linkedin.com/in/muhammad-haider-mustafa-03104b196/" },
  { icon: Code2, label: "GitHub", value: "github.com/hhaider786", href: "https://github.com/hhaider786" },
];

function fieldError(state: ActionResult, field: string): string | undefined {
  if (state.status !== "error") return;
  return state.errors?.find((e: FieldError) => e.field === field)?.message;
}

export default function Contact() {
  const [state, formAction, pending] = useActionState(sendContact, initial);

  return (
    <section id="contact" className="py-24 px-6 section-cv">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-4">Get in touch</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-syne-var), sans-serif" }}>
            Let&apos;s build something
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
            Currently completing my Master&apos;s and open to freelance contracts, graduate roles, and ambitious projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <motion.form
            action={formAction}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] border border-white/8 p-6 sm:p-8 space-y-5"
            noValidate
          >
            <h3 className="text-[0.7rem] tracking-[0.2em] uppercase text-[#6366f1] mb-2">Send a message</h3>

            {[
              { id: "name", label: "Your name", type: "text", autoComplete: "name" },
              { id: "email", label: "Your email", type: "email", autoComplete: "email" },
              { id: "subject", label: "Subject (optional)", type: "text", autoComplete: "off" },
            ].map((f) => {
              const err = fieldError(state, f.id);
              return (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-1.5">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    aria-invalid={!!err}
                    aria-describedby={err ? `${f.id}-err` : undefined}
                    className="w-full bg-black/30 border border-white/10 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
                  />
                  {err && <p id={`${f.id}-err`} role="alert" className="text-red-400 text-xs mt-1">{err}</p>}
                </div>
              );
            })}

            <div>
              <label htmlFor="message" className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={!!fieldError(state, "message")}
                aria-describedby={fieldError(state, "message") ? "message-err" : undefined}
                className="w-full bg-black/30 border border-white/10 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-colors resize-none"
              />
              {fieldError(state, "message") && (
                <p id="message-err" role="alert" className="text-red-400 text-xs mt-1">{fieldError(state, "message")}</p>
              )}
            </div>

            {state.status === "error" && state.message && (
              <p role="alert" className="text-red-400 text-sm">{state.message}</p>
            )}
            {state.status === "success" && (
              <p role="status" aria-live="polite" className="text-green-400 text-sm">{state.message}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#6366f1] text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#4f52d8] transition-colors disabled:opacity-60"
            >
              <Send size={13} aria-hidden />
              {pending ? "Sending…" : "Send message"}
            </button>
          </motion.form>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/8 hover:border-[#6366f1]/40 hover:bg-[#6366f1]/[0.04] transition-all duration-300 text-left group"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  aria-label={`${link.label}: ${link.value}`}
                >
                  <div className="w-10 h-10 bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6366f1]/20 transition-colors" aria-hidden>
                    <link.icon size={16} className="text-[#6366f1]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/35 text-[0.65rem] tracking-wider uppercase mb-0.5">{link.label}</p>
                    <p className="text-white/80 text-sm truncate group-hover:text-white transition-colors">{link.value}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#6366f1] transition-colors ml-auto flex-shrink-0" aria-hidden />
                </motion.a>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-white/35 text-sm">
              <MapPin size={13} aria-hidden />
              <span>Hobart, Tasmania, Australia</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 mt-20 pt-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Muhammad Haider Mustafa. All rights reserved.</p>
          <p className="text-white/20 text-xs">Built with Next.js 16 · Tailwind v4 · Framer Motion</p>
        </div>
      </div>
    </section>
  );
}
