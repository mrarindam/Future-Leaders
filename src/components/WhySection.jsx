import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const WHY_SLIDES = [
  {
    index: 0,
    num: '01',
    spec: 'SPEC: GROWTH_ENGINE',
    title: 'Web3-Native Network',
    desc: 'A strong network of 500+ KOLs, creators, and Web3 professionals across different markets and regions.',
    chips: ['500+ Creators', 'Private Network', 'Tier-1 Alpha'],
    img: '/assets/why/web3-network.jpg',
    hsClass: 'hs-card-1',
    hsIcon: 'fa-bolt',
    hsLabel: 'Network Tier-1',
    hsStat: '500+ Verified KOLs ↗',
    tel1: 'CAM.01 // ISO 200',
    tel2: 'NETWORK // SECURED',
    ctaText: 'Explore Network',
  },
  {
    index: 1,
    num: '02',
    spec: 'SPEC: WORLDWIDE_SCALE',
    title: 'Global Reach',
    desc: 'Connect with audiences, creators, and communities from different countries and Web3 ecosystems.',
    chips: ['Multi-Region', 'Localized Campaigns', 'Global Partners'],
    img: '/assets/why/global-reach.jpg',
    hsClass: 'hs-card-2',
    hsIcon: 'fa-globe',
    hsLabel: 'Coverage',
    hsStat: '40+ Countries ↗',
    tel1: 'LAT: 28.61° N // LONG: 77.20° E',
    tel2: 'SYS: GLOBAL_SYNC',
    ctaText: 'View Ecosystems',
  },
  {
    index: 2,
    num: '03',
    spec: 'SPEC: RETENTION_SYSTEM',
    title: 'Community-First Approach',
    desc: 'An active Web3 community built around real people, engagement, collaboration, and long-term relationships.',
    chips: ['Organic Retention', 'True Advocates', 'Safe Spaces'],
    img: '/assets/why/community-approach.jpg',
    hsClass: 'hs-card-3',
    hsIcon: 'fa-users',
    hsLabel: 'Real Engagement',
    hsStat: '100% Organic ↗',
    tel1: 'COMMUNITY // ACTIVE_SYNC',
    tel2: 'RETENTION // 94.2%',
    ctaText: 'Join Community',
  },
  {
    index: 3,
    num: '04',
    spec: 'SPEC: FULL_STACK_EXEC',
    title: 'All-in-One Growth Support',
    desc: 'From marketing and management to partnerships and tech solutions, everything you need in one place.',
    chips: ['End-to-End', 'Custom Solutions', 'Proven Results'],
    img: '/assets/why/all-in-one.jpg',
    hsClass: 'hs-card-4',
    hsIcon: 'fa-rocket',
    hsLabel: 'Full Stack',
    hsStat: 'All-in-One ↗',
    tel1: 'SYS // READY',
    tel2: 'VELOCITY // MAX',
    ctaText: 'Explore Solutions',
  },
];

const WHY_SUBHEAD_WORDS = [
  'We', 'are', 'more', 'than', 'a', 'Web3', 'agency', '-', 'we', 'are', 'a', 'growth',
  'network', 'connecting', 'projects', 'with', 'the', 'right', 'people,', 'communities',
  'and', 'resources', 'to', 'grow', 'and', 'scale.'
];

export default function WhySection({ onSlideChangeRegister, onNavigateToSection }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const goToSlide = (index) => {
    const nextIdx = Math.max(0, Math.min(WHY_SLIDES.length - 1, index));
    setCurrentSlide(nextIdx);
  };

  useEffect(() => {
    if (typeof onSlideChangeRegister === 'function') {
      onSlideChangeRegister({
        getCurrentSlide: () => currentSlide,
        goToSlide,
        totalSlides: WHY_SLIDES.length,
      });
    }
  }, [currentSlide, onSlideChangeRegister]);

  // Initialize Scramble / Glitch Text on Headline & Subtitle Gravity Drop
  useEffect(() => {
    let scrambler = null;
    if (headlineRef.current && typeof window.initScrambleText === 'function') {
      scrambler = window.initScrambleText(headlineRef.current, {
        duration: 850,
        stepTime: 36,
        hover: true,
      });
    }

    // Initialize Subtitle Gravity Words
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

    let hasScrambled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            if (!hasScrambled) {
              hasScrambled = true;
              if (scrambler) scrambler.scramble();
              triggerGravityDrop();
            }
          } else if (!entry.isIntersecting) {
            hasScrambled = false;
          }
        });
      },
      { threshold: [0.15] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Trigger on load if already in viewport
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          hasScrambled = true;
          if (scrambler) scrambler.scramble();
          triggerGravityDrop();
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Initialize WebGL Predictive Arc
  useEffect(() => {
    let arcInstance = null;
    if (sectionRef.current && canvasRef.current && typeof window.initPredictiveArc === 'function') {
      arcInstance = window.initPredictiveArc(sectionRef.current, canvasRef.current, {
        background: '#030303',
        baseColor: '#FF0000',
        accentColor: '#FF9898',
        highlight: '#FF0000',
        density: 78,
        dotSize: 102,
        speed: 100,
        arch: {
          peak: 100,
          falloff: 600,
          thickness: 206,
          archHeight: 0,
        },
        pointer: {
          radius: 236,
          enabled: true,
          strength: 34,
        },
      });
    }

    return () => {
      if (arcInstance && typeof arcInstance.destroy === 'function') {
        arcInstance.destroy();
      }
    };
  }, []);

  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = touchStartRef.current.x - endX;
    const diffY = touchStartRef.current.y - endY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0 && currentSlide < WHY_SLIDES.length - 1) {
        goToSlide(currentSlide + 1);
      } else if (diffX < 0 && currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    }
  };

  return (
    <section
      id="why-section"
      className="page-section section-why"
      aria-label="Why Choose Future Leaders"
      ref={sectionRef}
    >
      {/* Predictive Arc WebGL Canvas Background (Originkit) */}
      <div id="predictive-arc-root" className="predictive-arc-bg" aria-hidden="true">
        <canvas id="predictive-arc-canvas" ref={canvasRef}></canvas>
      </div>

      {/* Technical Grid & Viewfinder Overlay Background */}
      <div className="why-grid-bg" aria-hidden="true">
        <div className="why-diag-stripes"></div>
        <div className="why-crosshair ch-tl">+</div>
        <div className="why-crosshair ch-tr">+</div>
        <div className="why-crosshair ch-bl">+</div>
        <div className="why-crosshair ch-br">+</div>
        <div className="why-coord-tag">SYS.FL // SPEC_2026 // GRID_4X</div>
      </div>

      {/* Top Header Bar */}
      <div className="why-header-bar">
        <div className="why-header-left">
          <span className="why-badge">
            <span className="why-badge-dot"></span>
            WHY CHOOSE US
          </span>
          <h2
            className="why-headline"
            id="why-headline"
            ref={headlineRef}
            data-scramble="Why Choose Future Leaders?"
            dangerouslySetInnerHTML={{ __html: 'Why Choose Future Leaders?' }}
          />
        </div>
        <div className="why-header-right">
          <p className="why-subhead" ref={subheadRef}>
            {WHY_SUBHEAD_WORDS.map((w, idx) => (
              <React.Fragment key={idx}>
                <span className="gravity-word">{w}</span>
                {idx < WHY_SUBHEAD_WORDS.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </p>
          {/* Horizontal Navigation Controls */}
          <div className="why-nav-controls">
            <button
              type="button"
              className="why-arrow-btn prev"
              id="why-prev-btn"
              aria-label="Previous pillar"
              disabled={currentSlide === 0}
              onClick={() => goToSlide(currentSlide - 1)}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="why-counter" id="why-counter">
              <span className="why-cur-num" id="why-cur-num">0{currentSlide + 1}</span>
              <span className="why-sep">/</span>
              <span className="why-total-num">04</span>
            </div>
            <button
              type="button"
              className="why-arrow-btn next"
              id="why-next-btn"
              aria-label="Next pillar"
              disabled={currentSlide === WHY_SLIDES.length - 1}
              onClick={() => goToSlide(currentSlide + 1)}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Slider Wrapper */}
      <div
        className="why-slider-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="why-track"
          id="why-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {WHY_SLIDES.map((slide) => (
            <div
              key={slide.index}
              className={`why-slide ${currentSlide === slide.index ? 'active' : ''}`}
              data-slide={slide.index}
            >
              <div className="why-card">
                {/* Visual Viewfinder Frame */}
                <div className="why-viewfinder">
                  <span className="vf-corner vf-tl"></span>
                  <span className="vf-corner vf-tr"></span>
                  <span className="vf-corner vf-bl"></span>
                  <span className="vf-corner vf-br"></span>
                  <img src={slide.img} alt={slide.title} className="why-card-img" />

                  {/* Interactive Tag Badge */}
                  <div className={`why-hotspot ${slide.hsClass}`}>
                    <span className="why-hotspot-pin"></span>
                    <div className="why-hotspot-card">
                      <span className="why-hotspot-icon">
                        <i className={`fa-solid ${slide.hsIcon}`}></i>
                      </span>
                      <div className="why-hotspot-info">
                        <span className="why-hotspot-label">{slide.hsLabel}</span>
                        <span className="why-hotspot-stat">{slide.hsStat}</span>
                      </div>
                    </div>
                  </div>

                  <div className="why-frame-telemetry">
                    <span>{slide.tel1}</span>
                    <span>{slide.tel2}</span>
                  </div>
                </div>

                {/* Information Panel */}
                <div className="why-card-info">
                  <div className="why-card-meta">
                    <span className="why-spec-code">{slide.spec}</span>
                    <span className="why-pillar-num">{slide.num}</span>
                  </div>
                  <h3 className="why-card-title">{slide.title}</h3>
                  <p className="why-card-desc">{slide.desc}</p>
                  <div className="why-card-specs">
                    {slide.chips.map((chip, i) => (
                      <div key={i} className="why-spec-chip">{chip}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress & Pagination */}
      <div className="why-progress-wrap">
        <div className="why-progress-track">
          <div
            className="why-progress-bar"
            id="why-progress-bar"
            style={{ width: `${((currentSlide + 1) / WHY_SLIDES.length) * 100}%` }}
          ></div>
        </div>
        <div className="why-pagination-dots" id="why-pagination-dots">
          {WHY_SLIDES.map((slide) => (
            <button
              key={slide.index}
              type="button"
              className={`why-dot ${currentSlide === slide.index ? 'active' : ''}`}
              data-index={slide.index}
              aria-label={`Go to slide ${slide.index + 1}`}
              onClick={() => goToSlide(slide.index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
