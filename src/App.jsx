import { useEffect } from 'react';
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
import { PerformanceProvider } from './context/PerformanceContext.jsx';

/* ============ REVEAL HOOK ============ */
function useRevealObserver() {
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
  }, []);
}

/* ============ MAIN ASSEMBLER APP ============ */
export default function App() {
  useRevealObserver();

  return (
    <PerformanceProvider>
      <Loader />
      <Background />
      <Navbar />
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
      <Footer />
      <ProjectModal />
    </PerformanceProvider>
  );
}

