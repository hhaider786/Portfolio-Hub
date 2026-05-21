"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackToPortfolio({ dark = true }: { dark?: boolean }) {
  return (
    <div className={`fixed top-4 left-4 z-[100]`}>
      <Link
        href="/"
        className={`flex items-center gap-2 px-3 py-2 text-[0.65rem] tracking-[0.15em] uppercase font-medium backdrop-blur-sm border transition-all duration-200 ${
          dark
            ? "bg-white/5 border-white/15 text-white/70 hover:text-white hover:border-white/40"
            : "bg-black/5 border-black/15 text-black/60 hover:text-black hover:border-black/40"
        }`}
      >
        <ArrowLeft size={12} />
        Portfolio
      </Link>
    </div>
  );
}
