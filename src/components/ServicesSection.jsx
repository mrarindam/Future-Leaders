import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SERVICES = [
  {
    num: '01',
    icon: 'fa-bullhorn',
    title: 'KOL Marketing',
    tag: '500+ KOL Network',
    desc: 'Connect with our private network of 500+ KOLs across different regions, countries, and Web3 niches to reach the right audience.',
    deliverables: [
      'Tier-1 Web3 Influencers',
      'Targeted token & community campaigns',
      'Full campaign analytics & ROI',
    ],
  },
  {
    num: '02',
    icon: 'fa-users',
    title: 'Community Management',
    tag: 'Organic Growth',
    desc: 'Build and grow an active Web3 community with experienced community managers focused on engagement, growth, and long-term support.',
    deliverables: [
      '24/7 active community incubation',
      'Engagement & retention mechanics',
      'Ambassador programs & events',
    ],
  },
  {
    num: '03',
    icon: 'fa-discord',
    isBrand: true,
    title: 'Discord Management',
    tag: 'Server Security',
    desc: 'Complete Discord management, including setup, moderation, engagement, and day-to-day community support.',
    deliverables: [
      'Custom role & channel architecture',
      'Anti-raid bot & verification setup',
      'Builder voice stages & AMA hosting',
    ],
  },
  {
    num: '04',
    icon: 'fa-chart-line',
    title: 'Social & Growth Marketing',
    tag: 'Viral Traction',
    desc: 'Drive visibility through posts, likes, comments, reposts, paid campaigns, engagement, and targeted growth strategies.',
    deliverables: [
      'Strategic X (Twitter) viral raids',
      'High-impact meme & alpha threads',
      'Data-driven impression scaling',
    ],
  },
  {
    num: '05',
    icon: 'fa-handshake',
    title: 'Collaboration Management',
    tag: 'Tier-1 Partnerships',
    desc: 'Connect with relevant projects, communities, creators, and partners through our network of experienced collaboration managers.',
    deliverables: [
      'Cross-community partnership deals',
      'Exclusive whitelists & giveaways',
      'Co-marketing ecosystem integration',
    ],
  },
  {
    num: '06',
    icon: 'fa-code',
    title: 'Technical Services',
    tag: 'Web3 Infrastructure',
    desc: 'Access Web3 developers and technical support for bots, smart contracts, integrations, and other project requirements.',
    deliverables: [
      'Custom Discord & Telegram bots',
      'Smart contract development & audits',
      'DApp & Web3 API integrations',
    ],
  },
];

const SUBHEAD_WORDS = [
  'From', 'KOL', 'marketing', 'and', 'community', 'growth', 'to', 'partnerships,',
  'moderation,', 'and', 'technical', 'support,', 'we', 'provide', 'the', 'resources',
  'Web3', 'projects', 'need', 'to', 'grow', 'and', 'scale.'
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const arenaRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);

  // Orbital state
  const [angle, setAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [flippedId, setFlippedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [mobileFlipped, setMobileFlipped] = useState(false);
  const [arenaDimensions, setArenaDimensions] = useState({ width: 1100, height: 580 });
  const touchStartXRef = useRef(null);

  // 1. Initialize Wire Terrain
  useEffect(() => {
    let terrainInstance = null;
    if (sectionRef.current && canvasRef.current && typeof window.initWireTerrain === 'function') {
      terrainInstance = window.initWireTerrain(sectionRef.current, canvasRef.current, {
        background: '#000000',
        lineColor: '#B12B00',
        accent: '#FF3C00',
        density: 120,
        speed: 100,
        relief: 100,
        sunSize: 100,
        cameraHeight: 94,
        hover: 200,
      });
    }

    return () => {
      if (terrainInstance && typeof terrainInstance.destroy === 'function') {
        terrainInstance.destroy();
      }
    };
  }, []);

  // 2. Initialize Scramble / Glitch Text on Headline & Subtitle Gravity Drop
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

  // 2. Responsive Arena Dimensions Tracker
  useEffect(() => {
    const updateDimensions = () => {
      if (arenaRef.current) {
        const rect = arenaRef.current.getBoundingClientRect();
        setArenaDimensions({
          width: rect.width || window.innerWidth,
          height: rect.height || 580,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const ro = new ResizeObserver(updateDimensions);
    if (arenaRef.current) ro.observe(arenaRef.current);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      ro.disconnect();
    };
  }, []);

  // 3. Smooth Continuous Orbital Revolution
  useEffect(() => {
    let rafId = null;
    let lastTime = performance.now();

    const tick = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Orbit gently if not paused, no card hovered and no card clicked
      if (!isPaused && flippedId === null && hoveredId === null && !mobileFlipped) {
        setAngle((prev) => (prev + delta * 6.5) % 360);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused, flippedId, hoveredId, mobileFlipped]);

  // Auto-advance mobile active service gently if not paused or flipped
  useEffect(() => {
    if (arenaDimensions.width > 768) return;
    if (isPaused || mobileFlipped) return;

    const interval = setInterval(() => {
      setActiveMobileIdx((prev) => (prev + 1) % SERVICES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [arenaDimensions.width, isPaused, mobileFlipped]);

  const handleCardClick = (srvNum, e) => {
    e.stopPropagation();
    setFlippedId((prev) => (prev === srvNum ? null : srvNum));
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || !e.changedTouches || !e.changedTouches[0]) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (diff > 45) {
      setActiveMobileIdx((prev) => (prev + 1) % SERVICES.length);
      setMobileFlipped(false);
    } else if (diff < -45) {
      setActiveMobileIdx((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
      setMobileFlipped(false);
    }
  };

  // Compute Orbital Radius dynamically based on container size
  const isMobile = arenaDimensions.width <= 768;
  const isTablet = arenaDimensions.width > 768 && arenaDimensions.width <= 1024;
  
  const rx = isMobile
    ? Math.min(arenaDimensions.width * 0.36, 135)
    : isTablet
    ? Math.min(arenaDimensions.width * 0.34, 280)
    : Math.min(arenaDimensions.width * 0.45, 620);

  const ry = isMobile
    ? 68
    : isTablet
    ? Math.min(arenaDimensions.height * 0.30, 160)
    : Math.min(arenaDimensions.height * 0.35, 225);

  const activeSrv = SERVICES[activeMobileIdx] || SERVICES[0];

  return (
    <section id="services-section" className="page-section section-services" ref={sectionRef}>
      {/* Wire Terrain WebGL Canvas Background */}
      <div id="wire-terrain-root" className="wire-terrain-bg" aria-hidden="true">
        <canvas id="wire-terrain-canvas" ref={canvasRef}></canvas>
      </div>
      <div className="services-vignette" aria-hidden="true"></div>

      {/* Services Content Container (Wide Full-Width Quantum Layout) */}
      <div className="services-container quantum-mode">
        <div className="services-header anim">
          <span className="services-badge">OUR SOLUTIONS</span>
          <h2
            className="services-headline"
            id="services-headline"
            ref={headlineRef}
            data-scramble="Solutions Built for Web3 Growth"
            dangerouslySetInnerHTML={{ __html: 'Solutions Built for Web3 Growth' }}
          />
          <p className="services-subhead" ref={subheadRef}>
            {SUBHEAD_WORDS.map((w, idx) => (
              <React.Fragment key={idx}>
                <span className="gravity-word">{w}</span>
                {idx < SUBHEAD_WORDS.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Quantum Orbital Arena */}
        <div
          className={`quantum-arena ${isMobile ? 'mobile-mode' : ''}`}
          ref={arenaRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (flippedId === null && hoveredId === null && !mobileFlipped) setIsPaused(false);
          }}
          onClick={() => {
            if (flippedId !== null) setFlippedId(null);
          }}
        >
          {isMobile ? (
            /* ==========================================================
               MOBILE DEDICATED VIEW (Fits screen cleanly, nucleus unblocked)
               ========================================================== */
            <>
              {/* 1. Mobile Quantum Nucleus & Orbital Satellite Stage */}
              <div className="quantum-mobile-orbit-stage">
                {/* Orbital Ellipse Trajectory Lines */}
                <svg className="quantum-orbit-svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="mobOrbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF3C00" stopOpacity="0.55" />
                      <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FF3C00" stopOpacity="0.55" />
                    </linearGradient>
                  </defs>
                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx={rx}
                    ry={ry}
                    fill="none"
                    stroke="url(#mobOrbitGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    className="quantum-orbit-track"
                  />
                  <ellipse
                    cx="50%"
                    cy="50%"
                    rx={rx * 0.65}
                    ry={ry * 0.65}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    className="quantum-inner-track"
                  />
                </svg>

                {/* Center Quantum Nucleus (Future Leaders Core) */}
                <div className="quantum-nucleus-core mobile-core" aria-hidden="true">
                  <div className="quantum-ring ring-outer"></div>
                  <div className="quantum-ring ring-middle"></div>
                  <div className="quantum-ring ring-inner"></div>
                  <div className="quantum-core-sphere">
                    <img
                      src="/assets/logo.webp"
                      alt="Future Leaders Core"
                      className="quantum-core-logo"
                    />
                    <div className="quantum-core-aura"></div>
                  </div>
                </div>

                {/* 6 Revolving Satellite Nodes */}
                {SERVICES.map((srv, idx) => {
                  const stepDeg = 360 / SERVICES.length;
                  const currentDeg = (angle + idx * stepDeg) % 360;
                  const rad = (currentDeg * Math.PI) / 180;
                  const x = Math.cos(rad) * rx;
                  const y = Math.sin(rad) * ry;
                  const isActive = activeMobileIdx === idx;

                  return (
                    <button
                      key={srv.num}
                      type="button"
                      className={`quantum-satellite-node ${isActive ? 'is-active-satellite' : ''}`}
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isActive ? 1.18 : 0.92})`,
                        zIndex: isActive ? 45 : 20,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMobileIdx(idx);
                        setMobileFlipped(false);
                      }}
                      aria-label={`Select ${srv.title}`}
                    >
                      <span className="satellite-icon">
                        <i className={`${srv.isBrand ? 'fa-brands' : 'fa-solid'} ${srv.icon}`}></i>
                      </span>
                      <span className="satellite-num-badge">{srv.num}</span>
                    </button>
                  );
                })}
              </div>

              {/* 2. Active Focused Service Card with Tap-To-Flip */}
              <div
                className="quantum-mobile-card-container"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`quantum-card-flip ${mobileFlipped ? 'flipped' : ''}`}
                  onClick={() => setMobileFlipped((prev) => !prev)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${activeSrv.title} - tap to flip`}
                >
                  {/* FRONT FACE */}
                  <div className="quantum-card-face quantum-card-front">
                    <div className="quantum-card-top">
                      <span className="quantum-service-icon">
                        <i className={`${activeSrv.isBrand ? 'fa-brands' : 'fa-solid'} ${activeSrv.icon}`}></i>
                      </span>
                      <div className="quantum-card-meta-top">
                        <span className="quantum-card-tag">{activeSrv.tag}</span>
                        <span className="quantum-service-num">{activeSrv.num}</span>
                      </div>
                    </div>

                    <div className="quantum-card-center">
                      <h3 className="quantum-service-title">{activeSrv.title}</h3>
                      <p className="quantum-card-snippet">{activeSrv.desc}</p>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="quantum-card-face quantum-card-back">
                    <div className="quantum-back-header">
                      <span className="quantum-back-icon">
                        <i className={`${activeSrv.isBrand ? 'fa-brands' : 'fa-solid'} ${activeSrv.icon}`}></i>
                      </span>
                      <div className="quantum-back-title-wrap">
                        <span className="quantum-back-num">SERVICE // {activeSrv.num}</span>
                        <h4 className="quantum-back-title">{activeSrv.title}</h4>
                      </div>
                    </div>

                    <div className="quantum-back-deliverables-wrap">
                      <span className="quantum-deliv-heading">KEY DELIVERABLES:</span>
                      <ul className="quantum-back-deliverables">
                        {activeSrv.deliverables.map((item, dIdx) => (
                          <li key={dIdx}>
                            <span className="quantum-bullet-dot"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Mobile Navigation Controls */}
              <div className="quantum-mobile-nav">
                <button
                  type="button"
                  className="quantum-nav-arrow prev-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMobileIdx((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
                    setMobileFlipped(false);
                  }}
                  aria-label="Previous Service"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>

                <div className="quantum-mobile-pills">
                  {SERVICES.map((srv, idx) => (
                    <button
                      key={srv.num}
                      type="button"
                      className={`quantum-pill-btn ${activeMobileIdx === idx ? 'is-active-pill' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMobileIdx(idx);
                        setMobileFlipped(false);
                      }}
                    >
                      {srv.num}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="quantum-nav-arrow next-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMobileIdx((prev) => (prev + 1) % SERVICES.length);
                    setMobileFlipped(false);
                  }}
                  aria-label="Next Service"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </>
          ) : (
            /* ==========================================================
               DESKTOP & TABLET VIEW (Spacious Revolving 3D Orbit)
               ========================================================== */
            <>
              {/* Orbital Ellipse Trajectory Lines */}
              <svg className="quantum-orbit-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF3C00" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FF3C00" stopOpacity="0.45" />
                  </linearGradient>
                </defs>
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx={rx}
                  ry={ry}
                  fill="none"
                  stroke="url(#orbitGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                  className="quantum-orbit-track"
                />
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx={rx * 0.65}
                  ry={ry * 0.65}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                  className="quantum-inner-track"
                />
              </svg>

              {/* Center Quantum Nucleus (Future Leaders Core - Clean Circular Medallion) */}
              <div className="quantum-nucleus-core" aria-hidden="true">
                <div className="quantum-ring ring-outer"></div>
                <div className="quantum-ring ring-middle"></div>
                <div className="quantum-ring ring-inner"></div>
                <div className="quantum-core-sphere">
                  <img
                    src="/assets/logo.webp"
                    alt="Future Leaders Core"
                    className="quantum-core-logo"
                  />
                  <div className="quantum-core-aura"></div>
                </div>
              </div>

              {/* 6 Revolving Quantum Service Flip Cards */}
              {SERVICES.map((srv, idx) => {
                const stepDeg = 360 / SERVICES.length;
                const currentDeg = (angle + idx * stepDeg) % 360;
                const rad = (currentDeg * Math.PI) / 180;

                // 3D Orbital Coordinates
                const x = Math.cos(rad) * rx;
                const y = Math.sin(rad) * ry;

                // Spatial depth calculation: foreground cards appear larger & higher zIndex
                const sinVal = Math.sin(rad); // -1 (top/back) to +1 (bottom/front)
                const baseScale = isTablet
                  ? 0.85 + 0.15 * ((sinVal + 1) / 2)
                  : 0.9 + 0.2 * ((sinVal + 1) / 2);

                const isFlipped = flippedId === srv.num || hoveredId === srv.num;
                const zIndex = isFlipped ? 80 : Math.round(15 + sinVal * 12);
                const opacity = hoveredId !== null && hoveredId !== srv.num && flippedId !== null && flippedId !== srv.num
                  ? 0.4
                  : 0.85 + 0.15 * ((sinVal + 1) / 2);

                return (
                  <div
                    key={srv.num}
                    className={`quantum-node ${isFlipped ? 'is-active-flipped' : ''}`}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isFlipped ? (isTablet ? 1.08 : 1.12) : baseScale})`,
                      zIndex,
                      opacity,
                    }}
                    onMouseEnter={() => setHoveredId(srv.num)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div
                      className={`quantum-card-flip ${isFlipped ? 'flipped' : ''}`}
                      onClick={(e) => handleCardClick(srv.num, e)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${srv.title} - hover to reveal details`}
                    >
                      {/* FRONT FACE: Quantum Satellite Node */}
                      <div className="quantum-card-face quantum-card-front">
                        <div className="quantum-card-top">
                          <span className="quantum-service-icon">
                            <i className={`${srv.isBrand ? 'fa-brands' : 'fa-solid'} ${srv.icon}`}></i>
                          </span>
                          <div className="quantum-card-meta-top">
                            <span className="quantum-card-tag">{srv.tag}</span>
                            <span className="quantum-service-num">{srv.num}</span>
                          </div>
                        </div>

                        <div className="quantum-card-center">
                          <h3 className="quantum-service-title">{srv.title}</h3>
                          <p className="quantum-card-snippet">{srv.desc}</p>
                        </div>
                      </div>

                      {/* BACK FACE: Detailed Capabilities Panel */}
                      <div className="quantum-card-face quantum-card-back">
                        <div className="quantum-back-header">
                          <span className="quantum-back-icon">
                            <i className={`${srv.isBrand ? 'fa-brands' : 'fa-solid'} ${srv.icon}`}></i>
                          </span>
                          <div className="quantum-back-title-wrap">
                            <span className="quantum-back-num">SERVICE // {srv.num}</span>
                            <h4 className="quantum-back-title">{srv.title}</h4>
                          </div>
                        </div>

                        <p className="quantum-back-desc">{srv.desc}</p>

                        <div className="quantum-back-deliverables-wrap">
                          <span className="quantum-deliv-heading">KEY DELIVERABLES:</span>
                          <ul className="quantum-back-deliverables">
                            {srv.deliverables.map((item, dIdx) => (
                              <li key={dIdx}>
                                <span className="quantum-bullet-dot"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

