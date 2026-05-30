import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

const Icon = {
  Discord: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.957 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  X: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
};

const DISCORD_URL = 'https://discord.gg/SdP2sAD8zT';

export default function CTA() {
  const sectionRef = useRef(null);
  const intro1Ref = useRef(null);
  const intro2Ref = useRef(null);
  const joinRef = useRef(null);
  const blueoutRef = useRef(null);
  const finalScreenRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const intro1 = intro1Ref.current;
    const intro2 = intro2Ref.current;
    const join = joinRef.current;
    const blueout = blueoutRef.current;
    const finalScreen = finalScreenRef.current;
    if (!section || !intro1 || !intro2 || !join || !blueout || !finalScreen) return;

    const isMobile = window.innerWidth < 1024;
    const targetScale = isMobile ? 8 : 18;

    gsap.set(intro1, { scale: 0.3, opacity: 0 });
    gsap.set(intro2, { scale: 0.3, opacity: 0 });
    gsap.set(join, { scale: 0.25, opacity: 0, transformOrigin: 'center center' });
    gsap.set(blueout, { opacity: 0 });
    gsap.set(finalScreen, { opacity: 0, scale: 0.85 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=4500',
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Stage 1: intro lines zoom IN to natural size
    tl.to(intro1, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)
      .to(intro2, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.15)
      .to({}, { duration: 0.4 })
      // Stage 2: intro lines shrink + fade out
      .to([intro1, intro2], { scale: 0.4, opacity: 0, duration: 0.6, ease: 'power2.in' }, '+=0')
      // Stage 3: JOIN FUTURE LEADERS zooms IN to natural size
      .to(join, { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' }, '<0.15')
      .to({}, { duration: 0.3 })
      // Stage 4: JOIN keeps zooming until a single character fills the screen.
      // We shift transformOrigin off-center so that one letter dominates as we scale.
      .to(join, {
        scale: targetScale,
        xPercent: -30,    // pushes the letters so one dominates
        ease: 'power2.in',
        duration: 1.6
      })
      // Stage 5: pink letterform fills viewport → cross-fade into blue
      .to(blueout, { opacity: 1, duration: 0.5, ease: 'none' }, '<0.7')
      .to(join, { opacity: 0, duration: 0.2 }, '<0.3')
      // Stage 6: final screen — Explore Community on blue
      .to(finalScreen, { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' }, '+=0.1');

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const handleJoin = () => {
    window.open(DISCORD_URL, '_blank', 'noopener,noreferrer');
  };

  const handleFollowX = () => {
    window.open('https://x.com/0Futureleaders', '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Subtle starfield glow on intro */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,92,200,0.08),transparent_60%)]" />

      {/* Stage 1: intro lines */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none">
        <h2
          ref={intro1Ref}
          className="cta-crisp font-display font-black uppercase text-white text-center leading-[1.15] lg:leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(48px, 9vw, 160px)' }}
        >
          So We Build A Community
        </h2>
        <h2
          ref={intro2Ref}
          className="cta-crisp font-display font-black uppercase text-white text-center leading-[1.15] lg:leading-[0.9] tracking-tight mt-8 lg:mt-3"
          style={{ fontSize: 'clamp(48px, 9vw, 160px)' }}
        >
          That <span className="text-[#ff5cc8]">Help Everyone</span>
        </h2>
      </div>

      {/* Stage 2/3/4: JOIN FUTURE LEADERS — scales from natural size all the way until a letter fills screen */}
      <h2
        ref={joinRef}
        className="cta-crisp absolute inset-0 m-auto h-fit font-display font-black uppercase text-center leading-[1.1] lg:leading-[0.85] tracking-tight text-white px-6 pointer-events-none"
        style={{ fontSize: 'clamp(56px, 11vw, 200px)' }}
      >
        Join <span className="text-[#ff5cc8]">Future Leaders</span>
      </h2>

      {/* Stage 5: Discord-blue wash that takes over once the pink letter fills the viewport */}
      <div
        ref={blueoutRef}
        className="absolute inset-0 bg-[#5865F2] pointer-events-none"
        aria-hidden
      />

      {/* Stage 6: final blue screen with Explore Community CTA */}
      <div
        ref={finalScreenRef}
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#5865F2] z-20 px-6"
      >
        <h2
          className="cta-crisp font-display font-black uppercase text-center leading-[1.1] lg:leading-[0.85] tracking-tight text-white mb-12"
          style={{ fontSize: 'clamp(48px, 8vw, 140px)' }}
        >
          Explore<br/>Community
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 pointer-events-auto">
          <button
            onClick={handleJoin}
            className="cta-btn-slide"
          >
            <div className="cta-btn-slide-wrapper">
              <div className="cta-btn-slide-row cta-btn-slide-row--default">
                <Icon.Discord />
                <span>Join Our Community</span>
              </div>
              <div className="cta-btn-slide-row cta-btn-slide-row--hover">
                <Icon.Discord />
                <span>Join Our Community</span>
              </div>
            </div>
          </button>

          <button
            onClick={handleFollowX}
            className="cta-btn-slide"
          >
            <div className="cta-btn-slide-wrapper">
              <div className="cta-btn-slide-row cta-btn-slide-row--default">
                <Icon.X />
                <span>Follow Us On X</span>
              </div>
              <div className="cta-btn-slide-row cta-btn-slide-row--hover">
                <Icon.X />
                <span>Follow Us On X</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
