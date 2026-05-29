import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Rewards.css';

gsap.registerPlugin(ScrollTrigger);

export default function Rewards() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const items = [
    { n: '01', t: 'Trusted Community', d: 'Verified members, no bots, and a reputation built on delivered results.' },
    { n: '02', t: 'Fast Engagement', d: 'Raid squads ready 24/7 — fast response, measurable engagement signals.' },
    { n: '03', t: 'NFT Ecosystem Knowledge', d: 'Deep operator experience across mints, allocations and post-launch strategy.' },
    { n: '04', t: 'Strong Community Network', d: 'Connected to top alpha groups, founders, and tier-1 Web3 communities.' },
    { n: '05', t: 'Dedicated Team', d: 'A core team that lives in Web3 — operators, raiders and community builders.' },
    { n: '06', t: 'Real Opportunities', d: 'No fluff. We surface drops, allocations and plays our team would take ourselves.' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    // Calculate exact horizontal scroll bounds for the carousel
    const getScrollAmount = () => {
      const offset = window.innerWidth >= 1024 ? 180 : 60;
      return wrapper.scrollWidth - window.innerWidth + offset;
    };

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollAmount() + (window.innerWidth >= 1024 ? 600 : 350)}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Scroll cards horizontally across the pinned viewport
    mainTimeline.to(wrapper, {
      x: () => -getScrollAmount(),
      ease: "none",
      duration: 1.8
    }, 0);

    // Staggered focus scaling and glow highlighting for centered horizontal cards
    const whyCards = gsap.utils.toArray(".why-card");
    whyCards.forEach((card, idx) => {
      const number = card.querySelector(".why-card-num");

      const triggerStart = (idx / whyCards.length) * 1.8;
      const triggerCenter = ((idx + 0.5) / whyCards.length) * 1.8;
      const triggerEnd = ((idx + 0.95) / whyCards.length) * 1.8;

      // Initial card opacity/scaling
      gsap.set(card, { opacity: idx === 0 ? 1 : 0.35, scale: idx === 0 ? 1.05 : 0.9 });

      mainTimeline.to(card, {
        opacity: 1,
        scale: 1.05,
        borderColor: "rgba(255, 255, 255, 0.4)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      }, triggerStart)
        .to(number, {
          color: "#ff5cc8",
          duration: 0.3
        }, triggerStart)
        .to(card, {
          opacity: 1,
          scale: 1.05,
          duration: 0.1
        }, triggerCenter);

      if (idx < whyCards.length - 1) {
        mainTimeline.to(card, {
          opacity: 0.35,
          scale: 0.9,
          borderColor: "rgba(255, 255, 255, 0.08)",
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.in"
        }, triggerEnd)
          .to(number, {
            color: "#ffffff",
            duration: 0.3
          }, triggerEnd);
      }
    });

    return () => {
      mainTimeline.scrollTrigger?.kill();
      mainTimeline.kill();
    };
  }, []);

  return (
    <section
      id="rewards"
      ref={containerRef}
      className="rewards-why-combined relative z-10 min-h-screen flex items-center justify-center bg-[#FF91AF] overflow-hidden border-b border-white/[0.03]"
    >
      {/* ============================================================== */}
      {/* THE EDGE WE OFFER (HORIZONTAL CAROUSEL LAYOUT)                 */}
      {/* ============================================================== */}
      <div
        className="why-horizontal-wrapper absolute inset-0 w-full h-full lg:flex flex-col justify-start pt-16 lg:pt-20"
      >
        {/* Background elegant glows matching the light pink template */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />

        {/* Header Container */}
        <div className="max-w-[1800px] mx-auto px-5 sm:px-8 lg:px-16 w-full mb-8 relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 select-none">
          <div>
            <h2 className="section-title text-4xl sm:text-5xl md:text-6xl text-black">The <span className="text-black/80">Edge</span> We Offer</h2>
            <p className="text-black/70 text-base mt-2 max-w-xl">Six reasons projects and members choose us over alternatives.</p>
          </div>
        </div>

        {/* Cards Wrapper Frame */}
        <div className="w-full relative z-10 overflow-x-hidden select-none">
          <div
            ref={wrapperRef}
            className="why-cards-wrapper flex gap-8 lg:gap-12 px-5 sm:px-8 lg:px-[30vw] items-stretch w-max py-8"
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                className="why-card w-[480px] aspect-[4/5] sm:aspect-square shrink-0 p-10 flex flex-col justify-between rounded-3xl relative overflow-hidden bg-black/[0.9] border border-white/[0.08]"
                style={{ willChange: 'transform, opacity, border-color, box-shadow' }}
              >
                {/* Soft card aura */}
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

                <div>
                  <div className="why-card-num font-display font-black text-5xl text-white tracking-tight mb-8">
                    {item.n}
                  </div>
                  <h3 className="why-card-title font-display font-black text-2xl lg:text-[2.2rem] text-white tracking-tight uppercase mb-4 leading-none">{item.t}</h3>
                  <p className="text-[#a4a8b5] text-base leading-relaxed">{item.d}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-display tracking-widest text-white/40">
                  <span>OPERATIONAL PROTOCOL</span>
                  <span className="text-[#ff5cc8]">SECURE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
