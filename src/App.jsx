import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import TilesLoader from './components/TilesLoader';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhySection from './components/WhySection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

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
  const whySlideControlsRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const isAtFooterRef = useRef(false);
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

  const isDesktopPC = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 1024 && !window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  };

  const navigateToSection = (index) => {
    const sectionIds = [
      'hero-section',
      'services-section',
      'why-section',
      'team-section',
      'contact-section',
    ];

    if (index < 0 || index >= sectionIds.length) return;
    const targetEl = document.getElementById(sectionIds[index]);
    if (!targetEl) return;

    setActiveSection(index);

    if (isDesktopPC()) {
      isAnimatingRef.current = true;
      isAtFooterRef.current = false;

      gsap.to(window, {
        scrollTo: { y: targetEl, autoKill: false },
        duration: 1.15,
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 150);
        },
      });
    } else {
      const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  const registerWhySlideControls = (controls) => {
    whySlideControlsRef.current = controls;
  };

  useEffect(() => {
    const sectionIds = [
      'hero-section',
      'services-section',
      'why-section',
      'team-section',
      'contact-section',
    ];

    const handleScroll = () => {
      if (isLoadingRef.current) return;
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let wheelTimeout = null;
    const handleWheel = (e) => {
      if (isLoadingRef.current) {
        e.preventDefault();
        return;
      }
      if (!isDesktopPC()) return;

      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 18) return;
      e.preventDefault();

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        const curIdx = activeSectionRef.current;

        // In Why Section: Step horizontal slides first
        if (curIdx === 2 && whySlideControlsRef.current) {
          const curSlide = whySlideControlsRef.current.getCurrentSlide();
          const total = whySlideControlsRef.current.totalSlides;
          if (e.deltaY > 0) {
            if (curSlide < total - 1) {
              whySlideControlsRef.current.goToSlide(curSlide + 1);
              return;
            } else {
              navigateToSection(3);
              return;
            }
          } else if (e.deltaY < 0) {
            if (curSlide > 0) {
              whySlideControlsRef.current.goToSlide(curSlide - 1);
              return;
            } else {
              navigateToSection(1);
              return;
            }
          }
        }

        const footer = document.getElementById('footer-section');

        // Scroll down to footer from contact
        if (e.deltaY > 0 && curIdx === 4 && footer && !isAtFooterRef.current) {
          isAnimatingRef.current = true;
          gsap.to(window, {
            scrollTo: { y: footer, autoKill: false },
            duration: 0.9,
            ease: 'power3.inOut',
            onComplete: () => {
              isAtFooterRef.current = true;
              setTimeout(() => {
                isAnimatingRef.current = false;
              }, 100);
            },
          });
          return;
        }

        // Scroll up from footer back to contact
        if (e.deltaY < 0 && isAtFooterRef.current) {
          isAtFooterRef.current = false;
          navigateToSection(4);
          return;
        }

        // Standard vertical transitions
        if (e.deltaY > 0 && curIdx < 4) {
          if (curIdx === 1 && whySlideControlsRef.current) {
            whySlideControlsRef.current.goToSlide(0);
          }
          navigateToSection(curIdx + 1);
        } else if (e.deltaY < 0 && curIdx > 0) {
          if (curIdx === 3 && whySlideControlsRef.current) {
            whySlideControlsRef.current.goToSlide(3);
          }
          navigateToSection(curIdx - 1);
        }
      }, 25);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    const handleKeyDown = (e) => {
      if (isLoadingRef.current) {
        e.preventDefault();
        return;
      }
      if (!isDesktopPC()) return;
      const curIdx = activeSectionRef.current;

      if (curIdx === 2 && whySlideControlsRef.current) {
        const curSlide = whySlideControlsRef.current.getCurrentSlide();
        if (e.key === 'ArrowRight' && curSlide < 3) {
          e.preventDefault();
          whySlideControlsRef.current.goToSlide(curSlide + 1);
          return;
        }
        if (e.key === 'ArrowLeft' && curSlide > 0) {
          e.preventDefault();
          whySlideControlsRef.current.goToSlide(curSlide - 1);
          return;
        }
      }

      if (['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.shiftKey) {
        if (curIdx < 4) {
          e.preventDefault();
          navigateToSection(curIdx + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) {
        if (curIdx > 0) {
          e.preventDefault();
          navigateToSection(curIdx - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target);
            if (idx !== -1) {
              setActiveSection(idx);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading && (
        <TilesLoader
          minTime={2.0}
          onComplete={() => {
            setIsLoading(false);
            setActiveSection(0);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
        />
      )}

      <Header
        activeSection={activeSection}
        onNavigate={navigateToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      {/* Multi-section Scroll Container matching .page-container */}
      <div className="page-container">
        <HeroSection onExplore={() => navigateToSection(1)} isLoaded={!isLoading} />
        <ServicesSection />
        <WhySection
          onSlideChangeRegister={registerWhySlideControls}
          onNavigateToSection={navigateToSection}
        />
        <TeamSection />
        <ContactSection />
        <FooterSection />
      </div>
    </>
  );
}
