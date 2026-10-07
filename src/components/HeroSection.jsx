import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScanGridButton from './ScanGridButton';
import PurpleWireframeRoom from './PurpleWireframeRoom';

const HERO_SUBHEAD_TEXT =
  'Future Leaders is a Web3 growth network with 500+ KOLs, creators and industry professionals across global markets, helping projects grow through KOL marketing, community management, social campaigns, Discord moderation, collaborations, technical support and strategic growth.';

const HERO_WORDS = HERO_SUBHEAD_TEXT.split(' ');

export default function HeroSection({ onExplore, isLoaded }) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subheadRef = useRef(null);
  const scrambler1Ref = useRef(null);
  const scrambler2Ref = useRef(null);

  const triggerGravityDrop = () => {
    if (!subheadRef.current) return;
    const charElements = subheadRef.current.querySelectorAll('.gravity-char');
    if (!charElements.length) return;
    gsap.killTweensOf(charElements);
    gsap.fromTo(
      charElements,
      {
        y: (i) => -75 - ((i * 11) % 45),
        opacity: 0,
        rotation: (i) => ((i % 5) - 2) * 6,
        scale: 0.85,
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.88,
        stagger: {
          each: 0.005,
          from: 'start',
        },
        ease: 'bounce.out',
        clearProps: 'transform,opacity',
      }
    );
  };

  const triggerScramble = () => {
    if (scrambler1Ref.current) scrambler1Ref.current.scramble();
    if (scrambler2Ref.current) scrambler2Ref.current.scramble();
  };

  useEffect(() => {
    if (line1Ref.current && typeof window.initScrambleText === 'function') {
      scrambler1Ref.current = window.initScrambleText(line1Ref.current, {
        duration: 850,
        stepTime: 32,
        hover: false,
      });
    }

    if (line2Ref.current && typeof window.initScrambleText === 'function') {
      scrambler2Ref.current = window.initScrambleText(line2Ref.current, {
        duration: 850,
        stepTime: 32,
        hover: false,
      });
    }

    const subhead = subheadRef.current;
    if (subhead) {
      subhead.addEventListener('mouseenter', triggerGravityDrop);
      subhead.addEventListener('click', triggerGravityDrop);
    }

    // Initial timeout fallback in case isLoaded was already true or loader bypassed
    const timer = setTimeout(() => {
      triggerScramble();
      triggerGravityDrop();
    }, 450);

    return () => {
      clearTimeout(timer);
      if (subhead) {
        subhead.removeEventListener('mouseenter', triggerGravityDrop);
        subhead.removeEventListener('click', triggerGravityDrop);
      }
    };
  }, []);

  // When loader finishes, re-trigger both glitch scramble and 1/1 letter gravity fall
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        triggerScramble();
        triggerGravityDrop();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <section id="hero-section" className="page-section section-hero">
      {/* Full-bleed 3D Wireframe Room background */}
      <div className="bg" aria-hidden="true">
        <PurpleWireframeRoom />
      </div>

      {/* Hero Content */}
      <main className="hero">
        <h1 className="headline anim" id="hero-headline" onClick={triggerScramble} title="Click to trigger glitch scramble">
          <span
            className="hl-line"
            ref={line1Ref}
            data-scramble="Empowering Web3 Projects"
            dangerouslySetInnerHTML={{ __html: 'Empowering Web3 Projects' }}
          />
          <span
            className="hl-line"
            ref={line2Ref}
            data-scramble="to Build, Grow &amp; Scale"
            dangerouslySetInnerHTML={{ __html: 'to Build, Grow & Scale' }}
          />
        </h1>

        <p className="subhead anim" ref={subheadRef} style={{ '--d': '0.28s' }}>
          {HERO_WORDS.map((word, wIdx) => (
            <span
              key={wIdx}
              className="hero-word-wrap"
              style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            >
              {word.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="gravity-char"
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </span>
              ))}
              {wIdx < HERO_WORDS.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </p>

        <div className="hero-cta-wrap anim" style={{ '--d': '0.4s' }}>
          <ScanGridButton
            id="hero-cta"
            label="Explore Solutions"
            onClick={(e) => {
              if (e && e.preventDefault) e.preventDefault();
              onExplore();
            }}
          />
        </div>
      </main>
    </section>
  );
}
