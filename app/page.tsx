import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import DemoSites from "@/components/portfolio/DemoSites";
import Process from "@/components/portfolio/Process";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Cursor from "@/components/portfolio/Cursor";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

export default function PortfolioPage() {
  return (
    <SmoothScroll>
      <div className="portfolio-root">
        <Cursor />
        <ScrollProgress />
        <Nav />
        <main id="main">
          <Hero />
          <DemoSites />
          <Process />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
