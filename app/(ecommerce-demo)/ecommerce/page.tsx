import type { Metadata } from "next";
import Navigation from "@/components/ecommerce/Navigation";
import Hero from "@/components/ecommerce/Hero";
import Categories from "@/components/ecommerce/Categories";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import CartDrawer from "@/components/ecommerce/CartDrawer";
import Testimonials from "@/components/ecommerce/Testimonials";
import Newsletter from "@/components/ecommerce/Newsletter";
import Footer from "@/components/ecommerce/Footer";
import BackToPortfolio from "@/components/BackToPortfolio";

export const metadata: Metadata = {
  title: "Maison — Fashion & Lifestyle",
  description: "Curated fashion and lifestyle pieces for the modern wardrobe. A live demo by Haider Mustafa.",
};

export default function EcommercePage() {
  return (
    <>
      <BackToPortfolio dark={false} />
      <Navigation />
      <CartDrawer />
      <main id="main">
        <Hero />
        <Categories />
        <ProductGrid />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
