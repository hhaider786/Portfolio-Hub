import type { Metadata } from "next";
import Navigation from "@/components/ecommerce/Navigation";
import Footer from "@/components/ecommerce/Footer";
import CartDrawer from "@/components/ecommerce/CartDrawer";
import BackToPortfolio from "@/components/BackToPortfolio";
import { SearchView } from "./SearchView";

export const metadata: Metadata = {
  title: "Search — Maison",
  description: "Search the Maison edit.",
};

export default function SearchPage() {
  return (
    <>
      <BackToPortfolio dark={false} />
      <Navigation />
      <CartDrawer />
      <main id="main" className="pt-28 pb-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-2">Search</p>
          <h1 className="text-4xl md:text-5xl font-light text-[#111] mb-8" style={{ fontFamily: "var(--font-cormorant-var), Georgia, serif" }}>
            What are you looking for?
          </h1>
          <SearchView />
        </div>
      </main>
      <Footer />
    </>
  );
}
