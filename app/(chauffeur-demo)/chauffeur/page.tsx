import Navigation from "@/components/chauffeur/Navigation";
import Hero from "@/components/chauffeur/Hero";
import Fleet from "@/components/chauffeur/Fleet";
import Features from "@/components/chauffeur/Features";
import Services from "@/components/chauffeur/Services";
import Booking from "@/components/chauffeur/Booking";
import Testimonials from "@/components/chauffeur/Testimonials";
import About from "@/components/chauffeur/About";
import Footer from "@/components/chauffeur/Footer";
import BackToPortfolio from "@/components/BackToPortfolio";

export const metadata = { title: "Prestige Chauffeur | Luxury Car Service" };

export default function ChauffeurPage() {
  return (
    <main>
      <BackToPortfolio />
      <Navigation />
      <Hero />
      <Fleet />
      <Features />
      <Services />
      <Booking />
      <Testimonials />
      <About />
      <Footer />
    </main>
  );
}
