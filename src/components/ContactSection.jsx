import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CONTACT_SUBHEAD_WORDS = [
  'Partner', 'with', 'us', 'to', 'take', 'your', 'project', 'to', 'the', 'next', 'level.',
  'Our', 'team', 'provides', 'battle-tested', 'Web3', 'growth', 'execution', 'from',
  'tier-1', 'KOL', 'activations', 'and', 'strategic', 'listing', 'advisory', 'to',
  'high-conviction', 'Discord', 'and', 'Telegram', 'community', 'incubation.',
  "Let's", 'build', 'sustainable', 'momentum', 'and', 'long-term', 'liquidity',
  'for', 'your', 'protocol.'
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const cardsGridRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Pixel Trail
    if (sectionRef.current && typeof window.initPixelTrail === 'function') {
      window.initPixelTrail(sectionRef.current, {
        background: '#0E0404',
        columns: 24,
        pixel: {
          color: '#FFFFFF',
          gap: 0,
          radius: 0,
        },
        trail: {
          hold: 0.3,
          fade: 0.45,
          reach: 0,
        },
      });
    }

    // 2. Initialize Liquid Carve buttons
    if (typeof window.initAllLiquidCarveButtons === 'function') {
      window.initAllLiquidCarveButtons();
    }

    // 3. Initialize Scramble Text
    let contactScrambler = null;
    if (headlineRef.current && typeof window.initScrambleText === 'function') {
      contactScrambler = window.initScrambleText(headlineRef.current, {
        duration: 850,
        stepTime: 36,
        hover: true,
      });
    }

    // 4. Initialize Subtitle Gravity
    const wordElements = subheadRef.current
      ? subheadRef.current.querySelectorAll('.gravity-word')
      : [];

    const triggerGravityDrop = () => {
      if (!wordElements.length) return;
      gsap.killTweensOf(wordElements);
      gsap.fromTo(
        wordElements,
        {
          y: (i) => -65 - ((i * 11) % 35),
          opacity: 0,
          rotation: (i) => ((i % 5) - 2) * 3,
          scale: 0.94,
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.85,
          stagger: {
            each: 0.012,
            from: 'start',
          },
          ease: 'bounce.out',
          clearProps: 'transform,opacity',
        }
      );
    };

    // 5. Left-to-right Wave Entrance for Cards
    const animateCardsEntrance = () => {
      if (!cardsGridRef.current) return;
      const cards = cardsGridRef.current.querySelectorAll('.contact-card');
      if (!cards.length) return;

      gsap.killTweensOf(cards);
      const isMobile = window.innerWidth <= 899;

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          x: isMobile ? -80 : -140,
          scale: 0.94,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.95,
          stagger: {
            each: 0.22,
            from: 'start',
          },
          ease: 'power2.inOut',
          clearProps: 'filter',
        }
      );
    };

    // Observer for section entry
    let hasAnimated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            if (!hasAnimated) {
              hasAnimated = true;
              if (contactScrambler) contactScrambler.scramble();
              triggerGravityDrop();
              animateCardsEntrance();
            }
          } else if (!entry.isIntersecting) {
            hasAnimated = false;
          }
        });
      },
      { threshold: [0.15] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Trigger on load if already in viewport
    setTimeout(() => {
      if (cardsGridRef.current) {
        const rect = cardsGridRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          hasAnimated = true;
          if (contactScrambler) contactScrambler.scramble();
          triggerGravityDrop();
          animateCardsEntrance();
        }
      }
    }, 250);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="contact-section"
      ref={sectionRef}
      className="page-section section-contact"
      aria-label="Contact and Community"
    >
      {/* Pixel Trail Grid Container (Originkit) */}
      <div id="pixel-trail-root" className="pixel-trail-bg" aria-hidden="true"></div>

      {/* Ambient Lighting Glows */}
      <div className="contact-glow glow-top" aria-hidden="true"></div>
      <div className="contact-glow glow-bottom" aria-hidden="true"></div>

      {/* Content Container */}
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <h2
            className="contact-headline"
            id="contact-headline"
            ref={headlineRef}
            data-scramble="Ready to Scale Your Web3 Project?"
            dangerouslySetInnerHTML={{ __html: 'Ready to Scale Your Web3 Project?' }}
          />
          <p className="contact-subhead" id="contact-subhead" ref={subheadRef}>
            {CONTACT_SUBHEAD_WORDS.map((w, idx) => (
              <React.Fragment key={idx}>
                <span className="gravity-word">{w}</span>
                {idx < CONTACT_SUBHEAD_WORDS.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Big Floating Community / Contact Channel Cards */}
        <div className="contact-cards-grid" ref={cardsGridRef}>
          {/* Card 1: Discord */}
          <a
            href="https://discord.gg/futureleaders"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card card-discord"
            style={{ '--tilt': '-2.8deg' }}
          >
            <div className="contact-card-glass"></div>
            <div className="contact-logo-wrap">
              <div className="contact-logo-icon discord-icon">
                <i className="fa-brands fa-discord"></i>
              </div>
            </div>

            <div className="contact-card-body">
              <h3 className="contact-card-title">Discord Community</h3>
              <p className="contact-card-text">
                Live builder voice stages, daily alpha discussions, developer hangouts, and ecosystem collaborations.
              </p>
            </div>

            <div className="contact-card-footer">
              <div
                className="liquid-carve-btn"
                data-label="Join Discord"
                data-blob="#5865F2"
                data-fill="rgba(255, 255, 255, 0.08)"
              ></div>
            </div>
          </a>

          {/* Card 2: X / Twitter */}
          <a
            href="https://x.com/FutureLeaders"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card card-x"
            style={{ '--tilt': '0deg' }}
          >
            <div className="contact-card-glass"></div>
            <div className="contact-logo-wrap">
              <div className="contact-logo-icon x-icon">
                <i className="fa-brands fa-x-twitter"></i>
              </div>
            </div>

            <div className="contact-card-body">
              <h3 className="contact-card-title">Official X (Twitter)</h3>
              <p className="contact-card-text">
                500+ KOL amplification network, real-time campaign announcements, alpha threads, and global audience reach.
              </p>
            </div>

            <div className="contact-card-footer">
              <div
                className="liquid-carve-btn"
                data-label="Follow on X"
                data-blob="#FF3C00"
                data-fill="rgba(255, 255, 255, 0.08)"
              ></div>
            </div>
          </a>

          {/* Card 3: Telegram */}
          <a
            href="https://t.me/FutureLeaders"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card card-telegram"
            style={{ '--tilt': '2.8deg' }}
          >
            <div className="contact-card-glass"></div>
            <div className="contact-logo-wrap">
              <div className="contact-logo-icon telegram-icon">
                <i className="fa-brands fa-telegram"></i>
              </div>
            </div>

            <div className="contact-card-body">
              <h3 className="contact-card-title">Telegram Advisory</h3>
              <p className="contact-card-text">
                Direct founder line for private deal flows, exchange listing advisories, custom marketing &amp; 24/7 priority support.
              </p>
            </div>

            <div className="contact-card-footer">
              <div
                className="liquid-carve-btn"
                data-label="Message Telegram"
                data-blob="#229ED9"
                data-fill="rgba(255, 255, 255, 0.08)"
              ></div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
