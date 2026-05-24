"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCoarsePointer, useReducedMotion } from "@/lib/motion/useReducedMotion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const coarse = useCoarsePointer();
  const reduced = useReducedMotion();

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Dot — instant follow
  const dotX = useSpring(mx, { stiffness: 700, damping: 32 });
  const dotY = useSpring(my, { stiffness: 700, damping: 32 });

  // Ring — medium lag
  const ringX = useSpring(mx, { stiffness: 130, damping: 22 });
  const ringY = useSpring(my, { stiffness: 130, damping: 22 });

  // Glow — slow dramatic sweep
  const glowX = useSpring(mx, { stiffness: 35, damping: 18 });
  const glowY = useSpring(my, { stiffness: 35, damping: 18 });

  // Trail dots — 2 only to keep spring count low
  const t0x = useSpring(mx, { stiffness: 400, damping: 28 });
  const t0y = useSpring(my, { stiffness: 400, damping: 28 });
  const t1x = useSpring(mx, { stiffness: 180, damping: 24 });
  const t1y = useSpring(my, { stiffness: 180, damping: 24 });

  const enabled = !coarse && !reduced;

  useEffect(() => {
    document.body.dataset.cursor = enabled ? "on" : "off";
    return () => { delete document.body.dataset.cursor; };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setVisible(true);
        mx.set(lastX);
        my.set(lastY);
      });
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

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled, mx, my]);

  if (!enabled || !visible) return null;

  const trailDots = [
    { x: t0x, y: t0y, size: 4,   opacity: 0.5 },
    { x: t1x, y: t1y, size: 3,   opacity: 0.25 },
  ];

  return (
    <>
      {/* Glow — subtle static indigo, no color shift */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.04) 55%, transparent 75%)",
        }}
      />

      {/* Trail dots — layered between glow and ring */}
      {trailDots.map((dot, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full"
          style={{
            x: dot.x,
            y: dot.y,
            translateX: "-50%",
            translateY: "-50%",
            width: dot.size,
            height: dot.size,
            background: "rgba(99,102,241,0.8)",
            opacity: dot.opacity,
          }}
        />
      ))}

      {/* Ring — medium lag */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:  hovering ? 52 : clicking ? 14 : 32,
          height: hovering ? 52 : clicking ? 14 : 32,
          borderColor: "rgba(99,102,241,0.55)",
        }}
        transition={{
          type: "spring",
          stiffness: clicking ? 500 : 220,
          damping: clicking ? 30 : 22,
        }}
      />

      {/* Dot — instant follow */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-[#6366f1]"
          animate={{ width: clicking ? 5 : 6, height: clicking ? 5 : 6 }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </>
  );
}
