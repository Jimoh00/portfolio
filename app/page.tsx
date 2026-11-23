import AboutSection from "@/sections/AboutSection";
import CapabilitiesSection from "@/sections/CapabilitiesSection";
import ContactSection from "@/sections/ContactSection";
import HomeSection from "@/sections/HomeSection";
import MarketLensCaseStudy from "@/sections/MarketLensCaseStudy";
import Projects from "@/sections/Projects";
import SiteFooter from "@/sections/SiteFooter";
import Navbar from "@/components/Navbar";
import PortfolioInteractions from "@/components/PortfolioInteractions";

export default function Home() {
  return (
    <>
      <a
        className="fixed left-3 top-3 z-[110] -translate-y-[160%] bg-neon px-4 py-3 font-bold text-background focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <Navbar />
      <PortfolioInteractions />
      <main id="main">
        <HomeSection />
        <Projects />
        <MarketLensCaseStudy />
        <AboutSection />
        <CapabilitiesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
