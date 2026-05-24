import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="portfolio-root flex flex-col items-center justify-center px-6 text-center min-h-screen">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <div className="relative z-10">
        <p className="text-[#6366f1] text-xs tracking-[0.3em] uppercase mb-4">Error 404</p>
        <h1
          className="text-6xl md:text-8xl font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-syne-var), sans-serif" }}
        >
          Lost in the <span className="gradient-text">stack</span>
        </h1>
        <p className="text-white/50 max-w-md mb-10 mx-auto">
          That page doesn&rsquo;t exist (yet). Head back to the home page or jump straight to my work.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-7 py-3.5 bg-[#6366f1] text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#4f52d8] transition-colors">
            Back to home
          </Link>
          <Link href="/#work" className="px-7 py-3.5 border border-white/15 text-white/70 text-xs tracking-[0.15em] uppercase hover:border-[#6366f1]/60 hover:text-white transition-all">
            View my work
          </Link>
        </div>
      </div>
    </main>
  );
}
