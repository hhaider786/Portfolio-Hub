import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import DemoSites from "@/components/portfolio/DemoSites";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";

export const metadata = {
  title: "Muhammad Haider Mustafa — Software Engineer",
  description: "Portfolio of Muhammad Haider Mustafa — Software Engineer specialising in full-stack development, AI, cybersecurity, and modern web experiences.",
};

export default function PortfolioPage() {
  return (
    <div className="portfolio-root">
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
