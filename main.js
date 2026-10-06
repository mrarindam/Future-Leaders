/**
 * Future Leaders — Main Application Controller
 * Includes: GSAP Momentum Section Scroll, Wire Terrain WebGL Init,
 * Staggered 3D Card Entrance & Cursor Spotlight
 */

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.hash || window.location.hash === '#hero-section') {
    window.scrollTo(0, 0);
  }
  initWireTerrainSection();
  initPredictiveArcSection();
  initGSAPSectionScroll();
  initCardSpotlight();
  initMobileMenu();
  initNavLinks();
  initWhySection();
  initTeamSection();
  initContactSection();
  initVectorWordmarkSection();
});

/**
 * Initialize Originkit Vector Wordmark in Section 5 (Contact)
 */
function initVectorWordmarkSection() {
  const host = document.getElementById('vector-wordmark-host');
  const canvas = document.getElementById('vector-wordmark-canvas');

  if (!host || !canvas || typeof window.initVectorWordmark !== 'function') {
    return;
  }

  window.initVectorWordmark(host, canvas, {
    text: "FUTURE LEADERS",
    font: {
      variant: "Extra Bold",
      fontSize: "360px",
      textAlign: "center",
      fontFamily: "Bebas Neue",
      fontWeight: 800,
      lineHeight: "1em",
      letterSpacing: "0.04em",
    },
    background: "#0E0404",
    textColor: "#FFFFFF",
    shade: "#8E8E98",
    accent: "rgba(255, 60, 0, 0.5)",
    reach: 340,
    handles: {
      size: 120,
      labels: true,
      spread: 27,
    },
  });
}

/**
 * Initialize Section 5: Contact Page with Originkit Pixel Trail
 */
function initContactSection() {
  const rootElement = document.getElementById('contact-section');
  if (rootElement && typeof window.initPixelTrail === 'function') {
    window.initPixelTrail(rootElement, {
      background: "#0E0404",
      columns: 24,
      pixel: {
        color: "#FFFFFF",
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

  initContactHeadlineScramble();
  initSubtitleGravity();
  initLiquidCarveSection();
  initContactCardsObserver();
}

/**
 * Initialize Originkit Liquid Carve Buttons on Contact Cards
 */
function initLiquidCarveSection() {
  if (typeof window.initAllLiquidCarveButtons === 'function') {
    window.initAllLiquidCarveButtons();
  }
}

let contactScrambler = null;
let hasScrambledOnView = false;

/**
 * Initialize Originkit Scramble Text for Contact Headline
 * Decodes on section entry and hover
 */
function initContactHeadlineScramble() {
  const headlineEl = document.getElementById('contact-headline');
  if (!headlineEl || typeof window.initScrambleText !== 'function') return;

  contactScrambler = window.initScrambleText(headlineEl, {
    duration: 850,
    stepTime: 36,
    hover: true,
  });

  window.scrambleContactHeadline = () => {
    if (contactScrambler) {
      contactScrambler.scramble();
    }
  };

  // Trigger once smoothly when entering contact section via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
              if (!hasScrambledOnView) {
                hasScrambledOnView = true;
                if (contactScrambler) {
                  contactScrambler.scramble();
                }
                if (typeof window.triggerSubtitleGravity === 'function') {
                  window.triggerSubtitleGravity();
                }
                if (typeof window.animateContactCardsEntrance === 'function') {
                  window.animateContactCardsEntrance();
                }
              }
            } else if (!entry.isIntersecting) {
              hasScrambledOnView = false;
            }
          });
        },
        { threshold: [0.15] }
      );
      observer.observe(contactSection);
    }
  }
}

/**
 * Initialize Subtitle Gravity Physics Drop
 * Words free-fall from above under physical gravity with elastic bounce on the floor
 */
function initSubtitleGravity() {
  const subhead = document.getElementById('contact-subhead');
  if (!subhead || typeof gsap === 'undefined') return;

  const originalText = subhead.textContent.trim();
  subhead.setAttribute('data-original-text', originalText);

  // Wrap every word in a .gravity-word container
  const words = originalText.split(/\s+/);
  subhead.innerHTML = words
    .map((word) => `<span class="gravity-word">${word}</span>`)
    .join(' ');

  const wordElements = subhead.querySelectorAll('.gravity-word');

  function triggerGravityDrop() {
    gsap.killTweensOf(wordElements);

    // Gravity drop: words fall from above under physical gravity with bounce
    gsap.fromTo(
      wordElements,
      {
        y: (i) => -65 - ((i * 11) % 35), // varied natural drop heights
        opacity: 0,
        rotation: (i) => ((i % 5) - 2) * 3, // slight tumble as they fall
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
          from: "start",
        },
        ease: "bounce.out", // Realistic physical gravity bounce!
        clearProps: "transform,opacity",
      }
    );
  }

  window.triggerSubtitleGravity = triggerGravityDrop;

  // Trigger once on loading if directly navigated to contact section
  if (window.location.hash === '#contact-section') {
    setTimeout(() => {
      triggerGravityDrop();
      if (typeof window.animateContactCardsEntrance === 'function') {
        window.animateContactCardsEntrance();
      }
    }, 350);
  }
}

/**
 * Animate Contact Cards (Discord, X, Telegram) with Left-to-Right Ease-in-and-out Wave
 * Each container enters one by one from left to right with smooth ease-in-and-out curve.
 */
let hasAnimatedCardsOnView = false;

function animateContactCardsEntrance() {
  if (typeof gsap === 'undefined') return;

  const cards = document.querySelectorAll('.contact-card');
  if (!cards.length) return;

  gsap.killTweensOf(cards);

  const isMobile = window.innerWidth <= 899;

  // Staggered wave: Card 1 (Discord) -> Card 2 (X) -> Card 3 (Telegram)
  // Left-to-right ease-in and ease-out entrance
  gsap.fromTo(
    cards,
    {
      opacity: 0,
      x: isMobile ? -80 : -140, // Clearly shifted to the left
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
        each: 0.22, // One by one from left to right
        from: 'start', // Discord -> X -> Telegram
      },
      ease: 'power2.inOut', // Smooth ease-in and ease-out
      clearProps: 'filter',
    }
  );
}

window.animateContactCardsEntrance = animateContactCardsEntrance;

/**
 * Direct IntersectionObserver on Contact Cards Grid
 * Ensures the one-by-one left-to-right animation triggers smoothly on reload and scroll (Mobile + PC)
 */
function initContactCardsObserver() {
  const cardsGrid = document.querySelector('.contact-cards-grid');
  if (!cardsGrid) return;

  if ('IntersectionObserver' in window) {
    const cardsObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasAnimatedCardsOnView) {
              hasAnimatedCardsOnView = true;
              animateContactCardsEntrance();
            }
          } else {
            // Reset when leaving viewport so it re-triggers when scrolled back
            hasAnimatedCardsOnView = false;
          }
        });
      },
      { threshold: 0.08 }
    );
    cardsObs.observe(cardsGrid);
  }

  // Trigger on page reload / load if cards grid is already visible in viewport
  setTimeout(() => {
    const rect = cardsGrid.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      hasAnimatedCardsOnView = true;
      animateContactCardsEntrance();
    }
  }, 220);
}

/**
 * Initialize WebGL Predictive Arc in Section 3 (Why Choose Future Leaders - Originkit)
 */
function initPredictiveArcSection() {
  const rootElement = document.getElementById('why-section');
  const canvasElement = document.getElementById('predictive-arc-canvas');

  if (!rootElement || !canvasElement || typeof window.initPredictiveArc !== 'function') {
    return;
  }

  // Configure with Originkit Predictive Arc presets
  window.initPredictiveArc(rootElement, canvasElement, {
    background: "#030303",
    baseColor: "#FF0000",
    accentColor: "#FF9898",
    highlight: "#FF0000",
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

/**
 * Initialize WebGL Wire Terrain in Section 2 (Originkit)
 */
function initWireTerrainSection() {
  const rootElement = document.getElementById('services-section');
  const canvasElement = document.getElementById('wire-terrain-canvas');

  if (!rootElement || !canvasElement || typeof window.initWireTerrain !== 'function') {
    return;
  }

  // Configure with the Originkit synthwave parameters
  window.initWireTerrain(rootElement, canvasElement, {
    background: "#000000",
    lineColor: "#B12B00",
    accent: "#FF3C00",
    density: 120,
    speed: 100,
    relief: 100,
    sunSize: 100,
    cameraHeight: 94,
    hover: 200,
  });
}

/**
 * Animate Service Cards with a Staggered 3D Wave & Glow
 */
function animateServicesEntrance() {
  if (typeof gsap === 'undefined') return;

  const cards = document.querySelectorAll('.service-card');
  const headerItems = document.querySelectorAll('.services-header > *');

  if (!cards.length) return;

  // Header fade down
  gsap.killTweensOf(headerItems);
  gsap.fromTo(
    headerItems,
    { opacity: 0, y: 22, filter: 'blur(5px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.08, ease: 'power3.out' }
  );

  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    gsap.fromTo(
      cards,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', clearProps: 'all' }
    );
    return;
  }

  // Cards 3D Wave Entrance (Desktop)
  gsap.killTweensOf(cards);
  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 55,
      scale: 0.9,
      rotateX: 20,
      filter: 'blur(8px)',
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      duration: 0.85,
      stagger: {
        each: 0.09,
        from: 'start',
      },
      ease: 'back.out(1.25)',
      clearProps: 'filter',
    }
  );
}

/**
 * Interactive 3D Cursor Tracking Spotlight for Service Cards
 */
function initCardSpotlight() {
  // Only enable 3D tilt on devices with a real mouse/trackpad pointer
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Dynamic 3D tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}

/**
 * GSAP Momentum One-Scroll Controller
 * Smoothly snaps and glides between Page 1 (Landing) and Page 2 (Services)
 * with momentum upon a single scroll gesture (wheel, touch, or keys).
 */
function initGSAPSectionScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollToPlugin === 'undefined') {
    console.warn("GSAP or ScrollToPlugin not loaded, falling back to CSS scroll snap.");
    return;
  }

  gsap.registerPlugin(ScrollToPlugin);

  const sections = Array.from(document.querySelectorAll('.page-section'));
  if (sections.length < 2) return;

  let currentSectionIndex = 0;
  let isAnimating = false;
  let isAtFooter = false;
  let wheelTimeout = null;

  function updateActiveNav(index) {
    const desktopLinks = document.querySelectorAll('.nav-pill .nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    desktopLinks.forEach((link) => {
      const targetSec = parseInt(link.getAttribute('data-section'), 10);
      if (targetSec === index) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach((link) => {
      const targetSec = parseInt(link.getAttribute('data-section'), 10);
      if (targetSec === index) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isAnimating) return;

    isAnimating = true;
    isAtFooter = false;
    currentSectionIndex = index;
    updateActiveNav(index);

    const targetSection = sections[index];

    // Trigger cards 3D wave if entering Services section
    if (index === 1) {
      animateServicesEntrance();
    }

    // Trigger Scramble Text, Gravity drop & Left-to-Right Cards entrance if entering Contact section
    if (index === 4) {
      if (typeof window.scrambleContactHeadline === 'function') {
        window.scrambleContactHeadline();
      }
      if (typeof window.triggerSubtitleGravity === 'function') {
        window.triggerSubtitleGravity();
      }
      if (typeof window.animateContactCardsEntrance === 'function') {
        window.animateContactCardsEntrance();
      }
    }

    gsap.to(window, {
      scrollTo: { y: targetSection, autoKill: false },
      duration: 1.15,
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          isAnimating = false;
        }, 150);
      },
    });
  }

  // Helper to distinguish desktop PC / laptops from phone / tablet touch devices
  const isDesktopPC = () => {
    return window.innerWidth > 1024 && !window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  };

  // 1. Mouse Wheel One-Scroll Listener with Momentum (Desktop PC / Laptop only)
  window.addEventListener(
    'wheel',
    (e) => {
      // Fluid natural scrolling for mobile & tablet (<= 1024px or touch).
      // Only desktop PC / laptops with mouse/trackpad use one-scroll momentum.
      if (!isDesktopPC()) return;

      if (isAnimating) {
        e.preventDefault();
        return;
      }

      // Ignore micro noise
      if (Math.abs(e.deltaY) < 18) return;

      e.preventDefault();

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        // Section 2: Why Choose Future Leaders - Horizontal steps first
        if (currentSectionIndex === 2 && typeof window.getCurrentWhySlide === 'function') {
          const curSlide = window.getCurrentWhySlide();
          if (e.deltaY > 0) {
            if (curSlide < 3) {
              window.goToWhySlide(curSlide + 1);
              return;
            } else {
              scrollToSection(3);
              return;
            }
          } else if (e.deltaY < 0) {
            if (curSlide > 0) {
              window.goToWhySlide(curSlide - 1);
              return;
            } else {
              scrollToSection(1);
              return;
            }
          }
        }

        const footer = document.getElementById('footer-section');

        // Transition down to footer from Contact section
        if (e.deltaY > 0 && currentSectionIndex === sections.length - 1 && footer && !isAtFooter) {
          isAnimating = true;
          gsap.to(window, {
            scrollTo: { y: footer, autoKill: false },
            duration: 0.9,
            ease: "power3.inOut",
            onComplete: () => {
              isAtFooter = true;
              setTimeout(() => { isAnimating = false; }, 100);
            },
          });
          return;
        }

        // Transition up from footer back to Contact section
        if (e.deltaY < 0 && isAtFooter) {
          isAtFooter = false;
          scrollToSection(sections.length - 1);
          return;
        }

        // Standard vertical section transitions
        if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
          if (currentSectionIndex === 1 && typeof window.goToWhySlide === 'function') {
            window.goToWhySlide(0, true);
          }
          scrollToSection(currentSectionIndex + 1);
        } else if (e.deltaY < 0 && currentSectionIndex > 0) {
          if (currentSectionIndex === 3 && typeof window.goToWhySlide === 'function') {
            window.goToWhySlide(3, true);
          }
          scrollToSection(currentSectionIndex - 1);
        }
      }, 25);
    },
    { passive: false }
  );

  // Note: Touch swipe snap listener was removed so phones and tablets have 100% natural, fluid native scrolling.

  // Header scroll detection for frosted glass on mobile
  window.addEventListener(
    'scroll',
    () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    },
    { passive: true }
  );

  // 3. Keyboard Arrow & Page Navigation (Desktop PC only)
  window.addEventListener('keydown', (e) => {
    if (!isDesktopPC()) return;

    // If inside Section 2 (Why section), allow ArrowRight / ArrowLeft to switch slides
    if (currentSectionIndex === 2 && typeof window.getCurrentWhySlide === 'function') {
      const curSlide = window.getCurrentWhySlide();
      if (e.key === 'ArrowRight') {
        if (curSlide < 3) {
          e.preventDefault();
          window.goToWhySlide(curSlide + 1);
          return;
        }
      } else if (e.key === 'ArrowLeft') {
        if (curSlide > 0) {
          e.preventDefault();
          window.goToWhySlide(curSlide - 1);
          return;
        }
      }
    }

    if (['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.shiftKey) {
      if (currentSectionIndex === 2 && typeof window.getCurrentWhySlide === 'function') {
        const curSlide = window.getCurrentWhySlide();
        if (curSlide < 3) {
          e.preventDefault();
          window.goToWhySlide(curSlide + 1);
          return;
        }
      }
      const footer = document.getElementById('footer-section');
      if (currentSectionIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentSectionIndex + 1);
      } else if (currentSectionIndex === sections.length - 1 && footer && !isAtFooter) {
        e.preventDefault();
        isAnimating = true;
        gsap.to(window, {
          scrollTo: { y: footer, autoKill: false },
          duration: 0.9,
          ease: "power3.inOut",
          onComplete: () => {
            isAtFooter = true;
            setTimeout(() => { isAnimating = false; }, 100);
          },
        });
      }
    } else if (['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) {
      if (currentSectionIndex === 2 && typeof window.getCurrentWhySlide === 'function') {
        const curSlide = window.getCurrentWhySlide();
        if (curSlide > 0) {
          e.preventDefault();
          window.goToWhySlide(curSlide - 1);
          return;
        }
      }
      if (isAtFooter) {
        e.preventDefault();
        isAtFooter = false;
        scrollToSection(sections.length - 1);
      } else if (currentSectionIndex > 0) {
        e.preventDefault();
        scrollToSection(currentSectionIndex - 1);
      }
    }
  });

  // 4. CTA and Scroll-hint Button Clicks
  const scrollTriggers = document.querySelectorAll('a[href="#services-section"]');
  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (isDesktopPC()) {
        scrollToSection(1);
      } else {
        const target = document.getElementById('services-section');
        if (target) {
          const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      }
    });
  });

  const heroLogo = document.querySelector('a.logo-btn');
  if (heroLogo) {
    heroLogo.addEventListener('click', (e) => {
      e.preventDefault();
      if (isDesktopPC()) {
        scrollToSection(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // 5. IntersectionObserver to update active state and trigger animation if scrolled directly
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sections.indexOf(entry.target);
          if (idx !== -1) {
            currentSectionIndex = idx;
            updateActiveNav(idx);
            if (idx === 1 && !isAnimating) {
              animateServicesEntrance();
            }
            if (idx === 4) {
              if (typeof window.scrambleContactHeadline === 'function') {
                window.scrambleContactHeadline();
              }
              if (typeof window.triggerSubtitleGravity === 'function') {
                window.triggerSubtitleGravity();
              }
              if (typeof window.animateContactCardsEntrance === 'function') {
                window.animateContactCardsEntrance();
              }
            }
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/**
 * Mobile Navigation Menu & Overlay Controller
 */
function initMobileMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  if (!burgerBtn || !mobileMenu || !mobileOverlay) return;

  function openMenu() {
    burgerBtn.setAttribute('aria-expanded', 'true');
    burgerBtn.classList.add('open');
    mobileMenu.removeAttribute('hidden');
    void mobileMenu.offsetHeight;
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');

    setTimeout(() => {
      if (burgerBtn.getAttribute('aria-expanded') === 'false') {
        mobileMenu.setAttribute('hidden', '');
      }
    }, 380);
  }

  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileOverlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && burgerBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}

/**
 * Nav Links Interaction & Active Indicator
 */
function initNavLinks() {
  const desktopLinks = document.querySelectorAll('.nav-pill .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const isDesktopPC = () => {
    return window.innerWidth > 1024 && !window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  };

  function bindClicks(links) {
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetSec = link.getAttribute('data-section');
        if (targetSec !== null) {
          e.preventDefault();
          const secIdx = parseInt(targetSec, 10);
          const sections = document.querySelectorAll('.page-section');
          if (sections[secIdx]) {
            const isTargetServices = secIdx === 1;
            if (isTargetServices) {
              animateServicesEntrance();
            }
            if (secIdx === 4) {
              if (typeof window.scrambleContactHeadline === 'function') {
                window.scrambleContactHeadline();
              }
              if (typeof window.triggerSubtitleGravity === 'function') {
                window.triggerSubtitleGravity();
              }
              if (typeof window.animateContactCardsEntrance === 'function') {
                window.animateContactCardsEntrance();
              }
            }

            if (isDesktopPC() && typeof gsap !== 'undefined') {
              gsap.to(window, {
                scrollTo: { y: sections[secIdx], autoKill: false },
                duration: 1.15,
                ease: "power3.inOut"
              });
            } else {
              // Smooth native scroll to section on mobile/tablet
              const targetTop = sections[secIdx].getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
              });
            }
          }
        }
      });
    });
  }

  bindClicks(desktopLinks);
  bindClicks(mobileLinks);
}

/**
 * ============================================================================
 * Page 3: Why Choose Future Leaders (Shopify Supply Industrial Showcase)
 * ============================================================================
 */
let currentWhySlide = 0;
const TOTAL_WHY_SLIDES = 4;

function initWhySection() {
  const track = document.getElementById('why-track');
  const slides = document.querySelectorAll('.why-slide');
  const curNum = document.getElementById('why-cur-num');
  const progressBar = document.getElementById('why-progress-bar');
  const dots = document.querySelectorAll('.why-dot');
  const prevBtn = document.getElementById('why-prev-btn');
  const nextBtn = document.getElementById('why-next-btn');

  if (!track || !slides.length) return;

  function updateControls() {
    if (prevBtn) {
      prevBtn.style.opacity = currentWhySlide === 0 ? '0.35' : '1';
      prevBtn.style.pointerEvents = currentWhySlide === 0 ? 'none' : 'auto';
    }
    if (nextBtn) {
      nextBtn.style.opacity = currentWhySlide === TOTAL_WHY_SLIDES - 1 ? '0.35' : '1';
      nextBtn.style.pointerEvents = currentWhySlide === TOTAL_WHY_SLIDES - 1 ? 'none' : 'auto';
    }
  }

  function goToWhySlide(index, immediate = false) {
    if (index < 0) index = 0;
    if (index >= TOTAL_WHY_SLIDES) index = TOTAL_WHY_SLIDES - 1;

    currentWhySlide = index;

    // Slide track horizontally
    if (immediate) {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${currentWhySlide * 100}%)`;
      void track.offsetWidth;
      track.style.transition = '';
    } else {
      track.style.transform = `translateX(-${currentWhySlide * 100}%)`;
    }

    // Active slide styling
    slides.forEach((slide, idx) => {
      if (idx === currentWhySlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update counter (e.g. 01, 02, 03, 04)
    if (curNum) {
      curNum.textContent = String(currentWhySlide + 1).padStart(2, '0');
    }

    // Update progress bar width
    if (progressBar) {
      const pct = ((currentWhySlide + 1) / TOTAL_WHY_SLIDES) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Update pagination dots
    dots.forEach((dot, idx) => {
      if (idx === currentWhySlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    updateControls();
  }

  window.goToWhySlide = goToWhySlide;
  window.getCurrentWhySlide = () => currentWhySlide;

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentWhySlide > 0) {
        goToWhySlide(currentWhySlide - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentWhySlide < TOTAL_WHY_SLIDES - 1) {
        goToWhySlide(currentWhySlide + 1);
      }
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(slideIdx)) {
        goToWhySlide(slideIdx);
      }
    });
  });

  // Mobile horizontal swipe detection on the slider track
  let touchStartX = 0;
  let touchStartY = 0;
  track.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  track.addEventListener(
    'touchend',
    (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // If horizontal swipe is dominant
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX > 0 && currentWhySlide < TOTAL_WHY_SLIDES - 1) {
          goToWhySlide(currentWhySlide + 1);
        } else if (diffX < 0 && currentWhySlide > 0) {
          goToWhySlide(currentWhySlide - 1);
        }
      }
    },
    { passive: true }
  );

  updateControls();
}

/**
 * ============================================================================
 * Page 4: Kollektiva Creative Team Controller
 * ============================================================================
 */
const TEAM_MEMBERS = [
  {
    name: "Sakuna",
    role: "Design Chief",
    telegram: "https://t.me/Sakuna",
    discord: "https://discord.gg/futureleaders",
    twitter: "https://x.com/Sakuna",
    image: "assets/team/sakuna-full.webp",
    avatar: "assets/team/sakuna-avatar.webp",
    bio: "Sakuna sets the visual direction and strategic vision of every project. He turns rough concepts into clear, confident design languages that feel effortless yet leave a lasting impression."
  },
  {
    name: "Toji",
    role: "Community Lead",
    telegram: "https://t.me/Toji",
    discord: "https://discord.gg/futureleaders",
    twitter: "https://x.com/Toji",
    image: "assets/team/toji-full.webp",
    avatar: "assets/team/toji-avatar.webp",
    bio: "Toji shapes community operations and growth mechanics. He builds active environments where members turn into brand advocates and long-term project supporters."
  },
  {
    name: "Viking",
    role: "Growth Lead",
    telegram: "https://t.me/Viking",
    discord: "https://discord.gg/futureleaders",
    twitter: "https://x.com/Viking",
    image: "assets/team/viking-full.png",
    avatar: "assets/team/viking-avatar.png",
    bio: "Viking commands marketing momentum and creator partnerships across global Web3 markets, connecting projects directly with Tier-1 KOLs and engaged audiences."
  },
  {
    name: "Anas",
    role: "Operations Lead",
    telegram: "https://t.me/Anas",
    discord: "https://discord.gg/futureleaders",
    twitter: "https://x.com/Anas",
    image: "assets/team/anas-full.webp",
    avatar: "assets/team/anas-avatar.jpg",
    bio: "Anas architects high-retention Discord infrastructures and moderation systems, safeguarding ecosystems and ensuring 24/7 seamless engagement."
  },
  {
    name: "Arindam",
    role: "Technical Lead",
    telegram: "https://t.me/Arindam",
    discord: "https://discord.gg/futureleaders",
    twitter: "https://x.com/Arindam",
    image: "assets/team/arindam-full.webp",
    avatar: "assets/team/arindam-avatar.webp",
    bio: "Arindam spearheads technical architecture, automation bots, smart contracts, and custom Web3 tool development to scale project performance."
  }
];

function initTeamSection() {
  const bgSlides = document.querySelectorAll('.team-bg-slide');
  const avatarBtns = document.querySelectorAll('.team-avatar-btn');
  const bioDesc = document.getElementById('team-bio-desc');
  const metaName = document.getElementById('team-meta-name');
  const metaRole = document.getElementById('team-meta-role');
  const tgLink = document.getElementById('team-contact-tg');
  const dcLink = document.getElementById('team-contact-dc');
  const twLink = document.getElementById('team-contact-tw');

  if (!avatarBtns.length || !TEAM_MEMBERS.length) return;

  let activeIndex = 0;

  function setActiveMember(newIndex) {
    if (newIndex === activeIndex || newIndex < 0 || newIndex >= TEAM_MEMBERS.length) return;

    activeIndex = newIndex;
    const member = TEAM_MEMBERS[activeIndex];

    // 1. Crossfade background: 700ms opacity transition
    bgSlides.forEach((slide, idx) => {
      if (idx === activeIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // 2. Active dot & avatar state
    avatarBtns.forEach((btn, idx) => {
      if (idx === activeIndex) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // 3. Bio Description: remount fade-in (500ms opacity 0->1, translateY 4px->0)
    if (bioDesc) {
      bioDesc.textContent = member.bio;
      bioDesc.classList.remove('fade-in');
      void bioDesc.offsetWidth; // Force CSS reflow
      bioDesc.classList.add('fade-in');
    }

    // 4. Member Name: remount fade-in (500ms)
    if (metaName) {
      metaName.textContent = member.name;
      metaName.classList.remove('fade-in');
      void metaName.offsetWidth; // Force CSS reflow
      metaName.classList.add('fade-in');
    }

    // 5. Member Role: update text without fade animation
    if (metaRole) {
      metaRole.textContent = member.role;
    }

    // 6. Member Social Contacts (Telegram, Discord, Twitter)
    if (tgLink && member.telegram) {
      tgLink.href = member.telegram;
    }
    if (dcLink && member.discord) {
      dcLink.href = member.discord;
    }
    if (twLink && member.twitter) {
      twLink.href = member.twitter;
    }
  }

  avatarBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveMember(idx);
    });
  });
}
