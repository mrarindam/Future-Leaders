import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

import win1 from '../../images/Community Win/1.png';
import win2 from '../../images/Community Win/2.png';
import win3 from '../../images/Community Win/3.png';
import win4 from '../../images/Community Win/4.png';
import win5 from '../../images/Community Win/5.png';
import win6 from '../../images/Community Win/6.png';
import win7 from '../../images/Community Win/7.png';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [win1, win2, win3, win4, win5, win6, win7];
const ROTATIONS = [-7, 5, -4, 8, -9, 4, -6];

export default function Testimonials() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!container || !track || !cards.length) return;

    const isDesktop = () => window.innerWidth >= 1024;

    let pinTrigger;

    const layout = () => {
      if (!isDesktop()) {
        cards.forEach((card) => {
          gsap.set(card, { clearProps: 'all' });
        });
        gsap.set(track, { clearProps: 'all', width: '100%' });
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // 3 cards visible at a time
      const sideGutter = 80;
      const cardGap = 40;
      const cardW = Math.floor((vw - sideGutter * 2 - cardGap * 2) / 3);
      const cardH = Math.floor(cardW * 0.62); // 16:10-ish to keep cards bigger but fit vertically

      const stepX = cardW + cardGap;

      // Vertical diagonal: spread top edges across the available height
      const topMin = 60;                                // padding from section top
      const topMax = vh - cardH - 60;                   // padding from section bottom
      const safeRange = Math.max(0, topMax - topMin);

      cards.forEach((card, idx) => {
        const t = cards.length === 1 ? 0 : idx / (cards.length - 1);
        const top = topMin + safeRange * t;
        const left = sideGutter + stepX * idx;

        gsap.set(card, {
          position: 'absolute',
          left,
          top,
          width: cardW,
          height: cardH,
          rotate: ROTATIONS[idx % ROTATIONS.length],
          transformOrigin: 'center center',
        });
      });

      const trackWidth = sideGutter * 2 + stepX * (cards.length - 1) + cardW;
      gsap.set(track, { width: trackWidth, height: vh });
    };

    layout();

    if (isDesktop()) {
      const distance = () => Math.max(0, trackRef.current.offsetWidth - window.innerWidth);

      pinTrigger = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
        }
      });
    }

    const onResize = () => {
      layout();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (pinTrigger) pinTrigger.scrollTrigger?.kill();
    };
  }, []);

  // Transition from "The Operators" → "Community Wins"
  // Team slides left + fades, this section zooms in from scaled-down state
  useEffect(() => {

    const teamEl = document.getElementById('team');
    const section = containerRef.current;
    const track = trackRef.current;
    if (!teamEl || !section || !track) return;

    const transitionST = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'top top',
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        // Promote to a 3D layer only while the transition animates.
        gsap.set(teamEl, {
          force3D: true,
          xPercent: -100 * p,
          opacity: 1 - p,
        });
        gsap.set(track, {
          transformOrigin: 'center center',
          force3D: true,
          scale: 0.6 + 0.4 * p,
          opacity: 0.2 + 0.8 * p,
        });
      },
      onToggle: (self) => {
        // Drop the GPU promotion when out of range so the full-screen Team
        // section isn't left permanently composited (the reverse-scroll lag).
        if (!self.isActive) {
          gsap.set(teamEl, { clearProps: 'transform,opacity' });
          gsap.set(track, { clearProps: 'scale,opacity' });
        }
      }
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      transitionST.kill();
      clearTimeout(refreshTimer);
      gsap.set(teamEl, { clearProps: 'all' });
      gsap.set(track, { clearProps: 'scale,opacity' });
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative wins-horizontal-section lg:h-screen bg-[#8100D1] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />

      {/* Centered heading at the top with spacious breathing room */}
      <div className="absolute top-12 lg:top-16 left-0 right-0 z-30 pointer-events-none text-center px-5">
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-none">
          Community Wins
        </h2>
      </div>

      {/* Track — absolute-positioned diagonal cards on desktop */}
      <div
        ref={trackRef}
        className="wins-cards-wrapper relative z-10 lg:absolute lg:top-0 lg:left-0 lg:h-full select-none flex flex-col gap-6 px-5 py-12 lg:p-0 lg:gap-0 lg:flex-none"
      >
        {IMAGES.map((src, idx) => (
          <div
            key={idx}
            ref={el => cardRefs.current[idx] = el}
            className="win-card group rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)]"
            style={{ willChange: 'transform' }}
          >
            <img
              src={src}
              alt={`Community win ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
