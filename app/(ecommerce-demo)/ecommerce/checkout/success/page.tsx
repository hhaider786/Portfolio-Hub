import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/ecommerce/Navigation";
import Footer from "@/components/ecommerce/Footer";
import BackToPortfolio from "@/components/BackToPortfolio";
import { ClearCart } from "./ClearCart";

export const metadata: Metadata = {
  title: "Order placed — Maison",
  description: "Your order is confirmed.",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return (
    <>
      <BackToPortfolio dark={false} />
      <Navigation />
      <main id="main" className="pt-28 pb-20 px-6 min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#111] text-white flex items-center justify-center text-xl">✓</div>
          <p className="section-label mb-2">Order confirmed</p>
          <h1 className="text-3xl md:text-4xl font-light text-[#111] mb-4" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
            Thank you.
          </h1>
          <p className="text-[#666] mb-2">A receipt is on its way to your inbox.</p>
          {order && <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#888] mb-8">Order #{order}</p>}
          <Link href="/ecommerce" className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase bg-[#111] text-white hover:bg-[#333] transition-colors">
            Continue shopping
          </Link>
          <ClearCart />
        </div>
      </main>
      <Footer />
    </>
  );
}
