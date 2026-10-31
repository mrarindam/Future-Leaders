import React, { useState, useEffect, useRef } from 'react';

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

export default function WhySection({ onNavigateToSection }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const goToSlide = (index) => {
    const nextIdx = (index + WHY_SLIDES.length) % WHY_SLIDES.length;
    setCurrentSlide(nextIdx);
  };

  // Automatic slide transition (Autoplay every 3.8s)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % WHY_SLIDES.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused]);

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
      if (diffX > 0) {
        goToSlide(currentSlide + 1);
      } else if (diffX < 0) {
        goToSlide(currentSlide - 1);
      }
    }
  };

  const renderNavControls = (isMobile = false) => (
    <div className={`why-nav-controls ${isMobile ? 'why-nav-controls--mobile' : 'why-nav-controls--desktop'}`}>
      <button
        type="button"
        className="why-arrow-btn prev"
        id={isMobile ? 'why-prev-btn-mob' : 'why-prev-btn'}
        aria-label="Previous pillar"
        onClick={() => goToSlide(currentSlide - 1)}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <div className="why-counter" id={isMobile ? 'why-counter-mob' : 'why-counter'}>
        <span className="why-cur-num">0{currentSlide + 1}</span>
        <span className="why-sep">/</span>
        <span className="why-total-num">04</span>
      </div>
      <button
        type="button"
        className="why-arrow-btn next"
        id={isMobile ? 'why-next-btn-mob' : 'why-next-btn'}
        aria-label="Next pillar"
        onClick={() => goToSlide(currentSlide + 1)}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );

  return (
    <section
      id="why-section"
      className="page-section section-why"
      aria-label="Why Choose Future Leaders"
      ref={sectionRef}
    >
      {/* Modern Subtle Technical Grid Overlay Background */}
      <div className="why-grid-bg" aria-hidden="true">
        <div className="why-diag-stripes"></div>
      </div>

      {/* Top Header Bar */}
      <div className="why-header-bar">
        <div className="why-header-left">
          <h2 className="why-headline" id="why-headline">
            Why Choose Future Leaders?
          </h2>
        </div>
        <div className="why-header-right desktop-only-controls">
          {renderNavControls(false)}
        </div>
      </div>

      {/* Slider Wrapper */}
      <div
        className="why-slider-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => {
          setIsPaused(true);
          handleTouchStart(e);
        }}
        onTouchEnd={(e) => {
          handleTouchEnd(e);
          setTimeout(() => setIsPaused(false), 3000);
        }}
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
                  <img src={slide.img} alt={slide.title} className="why-card-img" />
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

      {/* Mobile & Tablet Bottom Controls */}
      <div className="why-mobile-bottom-controls" aria-label="Slide navigation">
        {renderNavControls(true)}
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
