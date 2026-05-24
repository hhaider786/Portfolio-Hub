import type { Metadata } from "next";
import Navigation from "@/components/ecommerce/Navigation";
import Footer from "@/components/ecommerce/Footer";
import BackToPortfolio from "@/components/BackToPortfolio";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Maison",
  description: "Complete your order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <BackToPortfolio dark={false} />
      <Navigation />
      <main id="main" className="pt-28 pb-20 px-6 min-h-screen bg-[#fafafa]">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-2">Secure checkout</p>
          <h1 className="text-4xl md:text-5xl font-light text-[#111] mb-10" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
            Checkout
          </h1>
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
