import Navigation from "@/components/cafe/Navigation";
import Hero from "@/components/cafe/Hero";
import Story from "@/components/cafe/Story";
import Menu from "@/components/cafe/Menu";
import Gallery from "@/components/cafe/Gallery";
import Reservations from "@/components/cafe/Reservations";
import Reviews from "@/components/cafe/Reviews";
import Footer from "@/components/cafe/Footer";
import BackToPortfolio from "@/components/BackToPortfolio";

export const metadata = { title: "Lumière — Fine Dining & Bar" };

export default function CafePage() {
  return (
    <main>
      <BackToPortfolio />
      <Navigation />
      <Hero />
      <Story />
      <Menu />
      <Gallery />
      <Reservations />
      <Reviews />
      <Footer />
    </main>
  );
}
