import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import DemoSites from "@/components/portfolio/DemoSites";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Cursor from "@/components/portfolio/Cursor";
import ScrollProgress from "@/components/portfolio/ScrollProgress";

export const metadata = {
  title: "Muhammad Haider Mustafa — Software Engineer",
  description:
    "Portfolio of Muhammad Haider Mustafa — Software Engineer specialising in full-stack development, AI, cybersecurity, and modern web experiences.",
};

export default function PortfolioPage() {
  return (
    <div className="portfolio-root">
      <Cursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <DemoSites />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}
