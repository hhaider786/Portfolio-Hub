import Navigation from "@/components/ecommerce/Navigation";
import Hero from "@/components/ecommerce/Hero";
import Categories from "@/components/ecommerce/Categories";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import CartDrawer from "@/components/ecommerce/CartDrawer";
import Testimonials from "@/components/ecommerce/Testimonials";
import Newsletter from "@/components/ecommerce/Newsletter";
import Footer from "@/components/ecommerce/Footer";
import BackToPortfolio from "@/components/BackToPortfolio";

export const metadata = { title: "Maison — Fashion & Lifestyle" };

export default function EcommercePage() {
  return (
    <main>
      <BackToPortfolio dark={false} />
      <Navigation />
      <CartDrawer />
      <Hero />
      <Categories />
      <ProductGrid />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
