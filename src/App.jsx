import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader/Loader.jsx';
import Background from './Background.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import MarqueeStrip from './components/MarqueeStrip/MarqueeStrip.jsx';
import About from './components/About/About.jsx';
import Services from './components/Services/Services.jsx';
import WhyUs from './components/WhyUs/WhyUs.jsx';
import Team from './components/Team/Team.jsx';
import FAQ from './components/FAQ/FAQ.jsx';
import CTA from './components/CTA/CTA.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProjectModal from './components/ProjectModal/ProjectModal.jsx';
import Contact from './components/Contact/Contact.jsx';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.jsx';
import { PerformanceProvider } from './context/PerformanceContext.jsx';

/* ============ REVEAL HOOK ============ */
function useRevealObserver(pathname) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((e) => e.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

/* ============ HOME PAGE ============ */
function HomePage() {
  return (
    <>
      <main className="relative z-10">
        <Hero />
        <MarqueeStrip />
        <About />
        <Services />
        <Contact />
        <WhyUs />
        <Team />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}

/* ============ MAIN ASSEMBLER APP ============ */
export default function App() {
  const location = useLocation();
  useRevealObserver(location.pathname);

  // On route change: scroll to top, unless we're targeting an in-page section.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Scroll to a section when arriving with a hash (e.g. navigating /privacy-policy -> /#services).
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const scrollToSection = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    // First pass once the route's DOM is committed, then a corrective pass after
    // late layout (images) settles so we land on the exact section.
    const raf = requestAnimationFrame(scrollToSection);
    const t = setTimeout(scrollToSection, 450);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [location.pathname, location.hash]);

  return (
    <PerformanceProvider>
      <Loader />
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
      <ProjectModal />
    </PerformanceProvider>
  );
}
