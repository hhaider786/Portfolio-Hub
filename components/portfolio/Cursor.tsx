"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Dot — snappy
  const dotX = useSpring(mx, { stiffness: 700, damping: 32 });
  const dotY = useSpring(my, { stiffness: 700, damping: 32 });

  // Ring — lags a little
  const ringX = useSpring(mx, { stiffness: 130, damping: 22 });
  const ringY = useSpring(my, { stiffness: 130, damping: 22 });

  // Glow — lazy, drifts slowly behind cursor
  const glowX = useSpring(mx, { stiffness: 40, damping: 20 });
  const glowY = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (typeof window === "undefined" || "ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(
        t.tagName === "A" || t.tagName === "BUTTON" ||
        !!t.closest("a") || !!t.closest("button")
      );
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mx, my]);

  if (!visible) return null;

  return (
    <>
      {/* Glow — large soft radial light, lazily follows cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 320 : 260,
          height: hovering ? 320 : 260,
          background: hovering
            ? "radial-gradient(circle, rgba(99,102,241,0.13) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.09) 0%, rgba(99,102,241,0.03) 50%, transparent 70%)",
          transition: "width 0.4s ease, height 0.4s ease, background 0.4s ease",
        }}
      />

      {/* Dot — fast */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-[#6366f1]"
          animate={{ width: clicking ? 5 : 6, height: clicking ? 5 : 6 }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 48 : clicking ? 24 : 36,
          height: hovering ? 48 : clicking ? 24 : 36,
          borderColor: hovering ? "rgba(99,102,241,0.9)" : "rgba(99,102,241,0.4)",
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
}
