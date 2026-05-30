import Navbar from './components/Navbar/Navbar.jsx';
import Loader from './components/Loader/Loader.jsx';
import Hero from './components/Hero/Hero.jsx';
import Services from './components/Services/Services.jsx';
import Rewards from './components/Rewards/Rewards.jsx';
import Team from './components/Team/Team.jsx';
import CTA from './components/CTA/CTA.jsx';
import LiquidFooter from './components/LiquidFooter/LiquidFooter.jsx';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Keep Lenis fully stopped while the loader is on screen. The loader sets
    // overflow:hidden, but that only blocks NATIVE scrolling — Lenis scrolls
    // programmatically and would otherwise advance the Hero's pinned timeline
    // behind the loader, so the Hero would start mid-animation.
    lenis.stop();

    // Sync Lenis with GSAP Ticker. Keep a named reference so cleanup removes the
    // SAME callback — passing a fresh arrow to remove() leaves the ticker (and a
    // second Lenis instance under Fast Refresh) running, which duplicates triggers.
    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);

    gsap.ticker.lagSmoothing(0);

    // Refresh triggers slightly after initialization for exact layout calculations
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    // Once the loader releases scroll: reset Lenis's own scroll position to the
    // very top (window.scrollTo alone does NOT update Lenis's internal state),
    // then start it. This guarantees the Hero always begins from its first frame.
    const onLoaderDone = () => {
      clearTimeout(fallbackStart);
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.start();
      ScrollTrigger.refresh();
    };
    window.addEventListener('fl-loader-done', onLoaderDone);

    // Safety net: if 'fl-loader-done' is ever missed (e.g. dev Fast Refresh
    // re-runs this effect without the Loader re-firing the event), start Lenis
    // anyway just after the loader's normal lifetime so scrolling isn't stuck.
    const fallbackStart = setTimeout(() => lenis.start(), 3000);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
      clearTimeout(refreshTimer);
      clearTimeout(fallbackStart);
      window.removeEventListener('fl-loader-done', onLoaderDone);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Loader />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Rewards />
        <Team />
        <CTA />
      </main>
      <LiquidFooter />
    </>
  );
}
