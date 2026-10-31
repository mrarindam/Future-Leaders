import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Masthead from './components/originkit/masthead';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import HeroSection from './components/HeroSection';
import NetworksMarquee from './components/NetworksMarquee';
import ServicesSection from './components/ServicesSection';
import WhySection from './components/WhySection';
import TeamSection from './components/TeamSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.replace(/\/$/, '');
      const h = window.location.hash;
      return p === '/privacy' || h === '#privacy' || h === '#/privacy' ? 'privacy' : 'home';
    }
    return 'home';
  });
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fl_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const p = window.location.pathname.replace(/\/$/, '');
      const h = window.location.hash;
      if (p === '/privacy' || h === '#privacy' || h === '#/privacy') {
        setCurrentView('privacy');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToPrivacy = () => {
    setCurrentView('privacy');
    window.history.pushState(null, '', '/privacy');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('fl_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const activeSectionRef = useRef(0);
  const isLoadingRef = useRef(true);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const navigateToSection = (index) => {
    const sectionIds = [
      'hero-section',
      'services-section',
      'why-section',
      'team-section',
      'faq-section',
      'contact-section',
    ];

    if (index < 0 || index >= sectionIds.length) return;
    const targetEl = document.getElementById(sectionIds[index]);
    if (!targetEl) return;

    setActiveSection(index);
    const headerHeight = 82;
    const topPos = index === 0 ? 0 : targetEl.offsetTop - headerHeight;
    window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
  };

  useEffect(() => {
    const sectionIds = [
      'hero-section',
      'services-section',
      'why-section',
      'team-section',
      'faq-section',
      'contact-section',
    ];

    let ticking = false;
    const handleScroll = () => {
      if (isLoadingRef.current) return;
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Check if near bottom of page -> activate Contact
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom < 100) {
        setActiveSection((prev) => (prev !== 5 ? 5 : prev));
        return;
      }

      // Check sections from bottom to top using offsetTop to avoid forced reflow
      const scrollPos = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sectionIds[i]);
        if (sec) {
          const secTop = sec.offsetTop;
          if (scrollPos >= secTop) {
            setActiveSection((prev) => (prev !== i ? i : prev));
            break;
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {isLoading && currentView === 'home' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            width: '100vw',
            height: '100vh',
            background: '#000000',
            overflow: 'hidden',
          }}
        >
          <Masthead
            text="FUTURE LEADERS"
            background="#000000"
            textColor="#FFFFFF"
            minTime={2.6}
            onComplete={() => {
              setIsLoading(false);
              setActiveSection(0);
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          />
        </div>
      )}

      {currentView === 'privacy' ? (
        <PrivacyPolicyPage
          onBackToHome={navigateToHome}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      ) : (
        <>
          <Header
            activeSection={activeSection}
            onNavigate={navigateToSection}
            isMobileMenuOpen={isMobileMenuOpen}
            onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            activeSection={activeSection}
            onNavigate={navigateToSection}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {/* Multi-section Scroll Container matching .page-container */}
          <div className="page-container">
            <HeroSection
              onExplore={() => navigateToSection(1)}
              onNavigate={navigateToSection}
              isLoaded={!isLoading}
              theme={theme}
            />
            <NetworksMarquee />
            <ServicesSection />
            <WhySection onNavigateToSection={navigateToSection} />
            <TeamSection />
            <FaqSection
              theme={theme}
              onNavigateToContact={() => navigateToSection(5)}
            />
            <ContactSection theme={theme} />
            <FooterSection
              onNavigate={navigateToSection}
              onOpenPrivacy={navigateToPrivacy}
              theme={theme}
            />
          </div>
        </>
      )}
    </>
  );
}
