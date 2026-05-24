"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="portfolio-root min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-4">Runtime error</p>
      <h1
        className="text-5xl md:text-7xl font-bold text-white mb-6"
        style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
      >
        Stack trace, but make it pretty.
      </h1>
      <p className="text-white/50 max-w-md mb-10">An unexpected error occurred. Try again, or head home.</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="px-7 py-3.5 bg-[#6366f1] text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#4f52d8] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-7 py-3.5 border border-white/15 text-white/70 text-xs tracking-[0.15em] uppercase hover:border-[#6366f1]/60 hover:text-white transition-all"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
